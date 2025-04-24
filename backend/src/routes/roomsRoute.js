import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import checkRole from "../middleware/checkRoleMiddleware.js"; // Import middleware mới
import {
  createRoom,
  getRoomById,
  getRoomsByUserId,
  getAllRooms,
  updateRoom,
  deleteRoom,
} from "../controllers/roomsController.js";

import dotenv from "dotenv";
dotenv.config();

const router = express.Router();

router.post(
  "/create",
  authMiddleware,
  checkRole(["admin", "hotel"]),
  createRoom
);
router.get("/get/:id", authMiddleware, getRoomById);
router.get(
  "/get/user/:userId",
  authMiddleware,
  checkRole("hotel"),
  getRoomsByUserId
);
router.get("/get/all", authMiddleware, checkRole("admin"), getAllRooms);
router.put(
  "/update/:id",
  authMiddleware,
  checkRole(["admin", "hotel"]),
  updateRoom
);
router.delete(
  "/delete/:id",
  authMiddleware,
  checkRole(["admin", "hotel"]),
  deleteRoom
);
export default router;
