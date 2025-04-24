import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  sendMessage,
  getMessagesForReservation,
  deleteMessage, // Import if using delete route
} from "../controllers/messagesController.js";

const router = express.Router();

// POST /messages - Send a message within a reservation context
router.post("/", authMiddleware, sendMessage);

// GET /messages/reservation/:reservationId - Get all messages for a specific reservation
router.get("/reservation/:reservationId", authMiddleware, getMessagesForReservation);

// DELETE /messages/:id - Delete a specific message (Optional)
router.delete("/:id", authMiddleware, deleteMessage);


export default router;