import jwt from "jsonwebtoken";
import pool from "../config/db.js";
import dotenv from "dotenv";
dotenv.config();
const authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Aucun jeton fourni" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { rows } = await pool.query(
      "SELECT * FROM users WHERE id = $1 AND session_token = $2 AND session_expires_at > $3",
      [decoded.id, token, new Date()]
    );
    if (!rows[0])
      return res.status(401).json({ message: "Session invalide ou expirée" });
    req.user = { id: decoded.id, role: decoded.role };
    console.log(decoded);
    
    req.userId = decoded.id;
    next();
  } catch (err) {
    res.status(401).json({ message: "Jeton invalide" });
  }
};

export default authMiddleware;
