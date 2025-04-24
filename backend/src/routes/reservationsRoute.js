import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import checkRole from "../middleware/checkRoleMiddleware.js";
import {
  createReservation,
  getReservationById,
  getMyReservations,
  getReservationsForMyRoom,
  updateReservationStatus,
  deleteReservation,
} from "../controllers/reservationsController.js";

const router = express.Router();

// POST /reservations - Create a new reservation (any logged-in user)
router.post("/", authMiddleware, createReservation);

// GET /reservations/mine - Get reservations made by the logged-in user
router.get("/mine", authMiddleware, getMyReservations);

// GET /reservations/room/:roomId - Get reservations for a specific room (hotel owner or admin)
// Note: checkRole isn't strictly needed here as controller handles authorization,
// but can be an extra layer if desired. Controller logic is more specific.
router.get("/room/:roomId", authMiddleware, /* checkRole(['hotel', 'admin']), */ getReservationsForMyRoom);

// GET /reservations/:id - Get a specific reservation by ID (user, owner, or admin - handled in controller)
router.get("/:id", authMiddleware, getReservationById);

// PUT /reservations/:id/status - Update reservation status (user, owner, or admin - handled in controller)
router.put("/:id/status", authMiddleware, updateReservationStatus);

// DELETE /reservations/:id - Delete a reservation (user, owner, or admin - handled in controller)
router.delete("/:id", authMiddleware, deleteReservation);


export default router;