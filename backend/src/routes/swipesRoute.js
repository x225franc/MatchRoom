import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
// Import controller functions
import {
  recordSwipe,
  getUserSwipes,
  deleteSwipe, // Only import if using the delete functionality
} from "../controllers/swipesController.js";

const router = express.Router();

// POST /swipes - Record a user's swipe action (like/dislike)
router.post("/", authMiddleware, recordSwipe);

// GET /swipes/mine - Get all swipes made by the logged-in user
router.get("/mine", authMiddleware, getUserSwipes);

// DELETE /swipes/:id - Delete a specific swipe (Optional)
// Consider if this endpoint is truly needed for your application logic
router.delete("/:id", authMiddleware, deleteSwipe);


export default router;