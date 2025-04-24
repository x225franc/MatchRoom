import jwt from 'jsonwebtoken';
import speakeasy from 'speakeasy';
import dotenv from 'dotenv';
dotenv.config();
const generateJWT = (userId, roles) => {
  return jwt.sign({ id: userId, roles }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

// const verify2FA = (secret, token) => {
//   return speakeasy.totp.verify({
//     secret,
//     encoding: 'base32',
//     token,
//   });
// };

export { generateJWT, /*verify2FA*/ };