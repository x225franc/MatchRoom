import express from "express";
import rateLimit from "express-rate-limit";
import authMiddleware from "../middleware/authMiddleware.js";
import checkRole from "../middleware/checkRoleMiddleware.js";
import {
  register,
  login,
  updatePassword,
  updateInfoHotel,
  updateInfoUser,
  findAllUsers,
  findUserByEmail,
  findUserById,
  setup2FA,
  verify2FA,
  logout,
} from "../controllers/authController.js";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();

// Giới hạn số lần thử đăng nhập
// const loginLimiter = rateLimit({
// 	windowMs: 15 * 60 * 1000, // 15 phút
// 	max: 5,
// 	message: "Trop de tentatives de connexion, réessayez dans 15 minutes",
// });

// Routes standard
router.post("/register", register);
router.post("/login", /* loginLimiter,*/ login);


// Routes protégées
router.put("/updatePassword", authMiddleware, updatePassword);
router.put("/updateInfoHotel", authMiddleware, updateInfoHotel);
router.put("/updateInfoUser", authMiddleware, updateInfoUser);

router.get("/findUserByEmail", authMiddleware, findUserByEmail);
router.get("/findUserById", authMiddleware, findUserById);
router.get("/findAllUsers", authMiddleware, checkRole("admin"), findAllUsers);

router.post("/2fa/setup", authMiddleware, setup2FA);
router.post("/2fa/verify", verify2FA);
router.post("/logout", authMiddleware, logout);

export default router;
