import request from 'supertest';
import express from 'express'; 
import pool from '../config/db.js'; 
import authRoutes from '../routes/authRoute.js'; 
import dotenv from 'dotenv';
dotenv.config(); // Load biến môi trường

// Tạo một instance Express riêng cho test để không start server thật
const app = express();
app.use(express.json()); // Middleware để parse JSON body
app.use('/auth', authRoutes); // Gắn auth routes vào app test

// Biến lưu trữ thông tin giữa các test
let testUserId;
let testUserEmail = `testuser_${Date.now()}@example.com`;
let testUserPassword = 'password123';
let authToken; // Token sau khi login thành công (không 2FA)
let userRequiring2FAId;
let userWith2FASecret; // Lưu secret để tạo token OTP hợp lệ

// --- Nhóm Test cho Auth Controller ---
describe('Auth Controller Tests', () => {

  // Dọn dẹp user test sau khi tất cả test hoàn thành
  afterAll(async () => {
    try {
      if (testUserId) {
        await pool.query('DELETE FROM users WHERE id = $1', [testUserId]);
      }
      if (userRequiring2FAId) {
         await pool.query('DELETE FROM users WHERE id = $1', [userRequiring2FAId]);
      }
    } catch (error) {
      console.error("Error cleaning up test users:", error);
    }
    await pool.end(); // Đóng connection pool sau khi test xong
  });

  // --- Test Đăng ký ---
  describe('POST /auth/register', () => {
    it('should register a new user successfully', async () => {
      const res = await request(app)
        .post('/auth/register')
        .send({
          email: testUserEmail,
          password: testUserPassword,
          name: 'Test User'
        });
      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty('message', 'Utilisateur enregistré');
      expect(res.body).toHaveProperty('userId');
      testUserId = res.body.userId; // Lưu ID để dùng sau và dọn dẹp
    });

    it('should return 400 if email already exists', async () => {
      const res = await request(app)
        .post('/auth/register')
        .send({
          email: testUserEmail, // Email đã dùng ở test trước
          password: 'anotherpassword',
          name: 'Another Test User'
        });
      expect(res.statusCode).toEqual(400);
      expect(res.body).toHaveProperty('message', 'Email déjà utilisé');
    });

    it('should return 400 if required fields are missing', async () => {
      const res = await request(app)
        .post('/auth/register')
        .send({
          email: 'missingpassword@example.com',
          name: 'Missing Password'
        });
      expect(res.statusCode).toEqual(400);
      // Cập nhật message này nếu bạn thay đổi trong controller
      expect(res.body).toHaveProperty('message', 'Mettre ton email et password');
    });
  });

  // --- Test Đăng nhập ---
  describe('POST /auth/login', () => {
    it('should login successfully for registered user without 2FA', async () => {
      // Cập nhật trạng thái user thành active (nếu cần, model có thể đã làm)
      await pool.query("UPDATE users SET status = 'active' WHERE id = $1", [testUserId]);

      const res = await request(app)
        .post('/auth/login')
        .send({
          email: testUserEmail,
          password: testUserPassword
        });
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('token');
      authToken = res.body.token; // Lưu token để test các route cần auth
    });

    it('should return 401 for invalid credentials (wrong password)', async () => {
      const res = await request(app)
        .post('/auth/login')
        .send({
          email: testUserEmail,
          password: 'wrongpassword'
        });
      expect(res.statusCode).toEqual(401);
      expect(res.body).toHaveProperty('message', 'Identifiants invalides');
    });

     it('should return 401 for non-existent user', async () => {
      const res = await request(app)
        .post('/auth/login')
        .send({
          email: 'nosuchuser@example.com',
          password: 'somepassword'
        });
      expect(res.statusCode).toEqual(401); // Hoặc 404 tùy logic controller, nhưng 401 phổ biến hơn
      expect(res.body).toHaveProperty('message', 'Identifiants invalides');
    });

    it('should return 403 if user status is not active', async () => {
       await pool.query("UPDATE users SET status = 'inactive' WHERE id = $1", [testUserId]);
       const res = await request(app)
        .post('/auth/login')
        .send({
          email: testUserEmail,
          password: testUserPassword
        });
       expect(res.statusCode).toEqual(403);
       expect(res.body).toHaveProperty('message', 'Compte non actif');
       // Đặt lại status để các test khác không bị ảnh hưởng
       await pool.query("UPDATE users SET status = 'active' WHERE id = $1", [testUserId]);
    });

    // Test login yêu cầu 2FA sẽ cần tạo user mới và bật 2FA trước
  });

  // --- Test Cấu hình 2FA ---
  describe('POST /auth/2fa/setup', () => {
     // Cần token hợp lệ từ lần login thành công trước đó
     it('should setup 2FA successfully for logged-in user', async () => {
        if (!authToken) {
          // Login lại nếu token chưa có (ví dụ khi chạy test này riêng lẻ)
          const loginRes = await request(app).post('/auth/login').send({ email: testUserEmail, password: testUserPassword });
          authToken = loginRes.body.token;
        }

        const res = await request(app)
          .post('/auth/2fa/setup')
          .set('Authorization', `Bearer ${authToken}`); // Gửi token

        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('qrCode');
        expect(res.body.qrCode).toContain('otpauth://totp/');
        // Lưu lại secret để có thể tạo mã OTP hợp lệ cho test verify
        const urlParams = new URLSearchParams(res.body.qrCode.split('?')[1]);
        userWith2FASecret = urlParams.get('secret');
        userRequiring2FAId = testUserId; // User này giờ yêu cầu 2FA
     });

     it('should return 401 if no token is provided', async () => {
        const res = await request(app)
          .post('/auth/2fa/setup');
        expect(res.statusCode).toEqual(401);
        expect(res.body).toHaveProperty('message', 'Aucun jeton fourni');
     });

     it('should return 400 if 2FA is already configured', async () => {
        // Gọi lại setup 2FA với cùng user/token
        const res = await request(app)
          .post('/auth/2fa/setup')
          .set('Authorization', `Bearer ${authToken}`);
        expect(res.statusCode).toEqual(400);
        expect(res.body).toHaveProperty('message', '2FA déjà configuré');
     });
  });

   // --- Test Xác thực 2FA ---
  describe('POST /auth/2fa/verify', () => {
    // Cần user đã bật 2FA (userRequiring2FAId và userWith2FASecret từ test trước)
    it('should verify 2FA successfully with correct token', async () => {
        if (!userRequiring2FAId || !userWith2FASecret) {
          throw new Error("Previous 2FA setup test must run successfully first.");
        }

        // Tạo mã OTP hợp lệ bằng thư viện speakeasy (cần cài đặt nếu chưa)
        // npm install speakeasy --save-dev (hoặc yarn add speakeasy --dev)
        const speakeasy = await import('speakeasy'); // Dynamic import vì đang dùng ES Modules
        const otpToken = speakeasy.default.totp({
            secret: userWith2FASecret,
            encoding: 'base32',
        });

        const res = await request(app)
          .post('/auth/2fa/verify')
          .send({
            userId: userRequiring2FAId,
            token: otpToken
          });

        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('token'); // Nhận token mới sau khi verify
        authToken = res.body.token; // Cập nhật token mới nhất
    });

    it('should return 401 for invalid 2FA token', async () => {
        const res = await request(app)
          .post('/auth/2fa/verify')
          .send({
            userId: userRequiring2FAId,
            token: '000000' // Mã không hợp lệ
          });
        expect(res.statusCode).toEqual(401);
        expect(res.body).toHaveProperty('message', 'Code 2FA invalide');
    });

     it('should return 400 if user does not have 2FA configured', async () => {
        // Tạo user mới không có 2FA
        const newUserEmail = `no2fa_${Date.now()}@example.com`;
        const regRes = await request(app).post('/auth/register').send({ email: newUserEmail, password: 'password', name: 'No 2FA User'});
        const newUserId = regRes.body.userId;

        const res = await request(app)
          .post('/auth/2fa/verify')
          .send({
            userId: newUserId,
            token: '123456'
          });
        expect(res.statusCode).toEqual(400);
        expect(res.body).toHaveProperty('message', '2FA non configuré');

        // Dọn dẹp user mới tạo
        await pool.query('DELETE FROM users WHERE id = $1', [newUserId]);
    });
  });

  // --- Test Đăng xuất ---
  describe('POST /auth/logout', () => {
    it('should logout successfully', async () => {
      if (!authToken) {
         // Login lại nếu cần
         const loginRes = await request(app).post('/auth/login').send({ email: testUserEmail, password: testUserPassword });
         authToken = loginRes.body.token;
      }
      const res = await request(app)
        .post('/auth/logout')
        .set('Authorization', `Bearer ${authToken}`);

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('message', 'Déconnexion réussie');

      // Kiểm tra xem token cũ có còn hợp lệ không (không nên)
      const checkRes = await request(app)
        .post('/auth/2fa/setup') // Dùng một route cần auth bất kỳ để kiểm tra
        .set('Authorization', `Bearer ${authToken}`);
      expect(checkRes.statusCode).toEqual(401); // Mong đợi lỗi session không hợp lệ
      expect(checkRes.body).toHaveProperty('message', 'Session invalide ou expirée');

      authToken = null; // Xóa token đã logout
    });

    it('should return 401 if no token is provided', async () => {
       const res = await request(app)
        .post('/auth/logout');
       expect(res.statusCode).toEqual(401);
       expect(res.body).toHaveProperty('message', 'Aucun jeton fourni');
    });
  });

});