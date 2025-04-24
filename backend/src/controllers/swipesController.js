import Swipe from "../models/swipesModel.js";
import Room from "../models/roomsModel.js"; // To check if room exists
import dotenv from "dotenv";
dotenv.config();

// Record a swipe action
const recordSwipe = async (req, res) => {
  const userId = req.user?.id;
  const { roomId, action } = req.body; // e.g., action: 'like' or 'dislike'

  if (!userId) {
    return res.status(401).json({ message: "Utilisateur non authentifié" });
  }
  if (!roomId || !action) {
    return res.status(400).json({ message: "L'ID de la chambre et l'action sont requis" });
  }
  // Optional: Validate action value
  const validActions = ['like', 'dislike'];
  if (!validActions.includes(action.toLowerCase())) {
      return res.status(400).json({ message: `Action invalide. Doit être '${validActions.join("' ou '")}'` });
  }

  try {
    // 1. Check if room exists
    const roomExists = await Room.findById(roomId);
    if (!roomExists) {
        return res.status(404).json({ message: "Chambre non trouvée" });
    }

    // 2. Check if user owns the room (cannot swipe own room)
    if (roomExists.user_id === userId) {
        return res.status(403).json({ message: "Vous ne pouvez pas swiper votre propre chambre" });
    }

    // 3. Check if user already swiped this room
    const existingSwipe = await Swipe.findByUserAndRoom(userId, roomId);
    if (existingSwipe) {
      // Decide how to handle: update action? return conflict? ignore?
      // For now, let's return a conflict indicating it's already swiped.
      return res.status(409).json({ message: "Vous avez déjà swipé cette chambre", existingAction: existingSwipe.action });
    }

    // 4. Create the swipe record
    const swipe = await Swipe.create({
      userId,
      roomId,
      action: action.toLowerCase(), // Store consistently
    });
    res.status(201).json({ message: "Swipe enregistré", swipe });

    // Optional: Check for match here if action is 'like'

  } catch (err) {
    console.error("Error recording swipe:", err);
    res.status(500).json({
      message: "Erreur lors de l'enregistrement du swipe",
      error: err.message,
    });
  }
};

// Get all swipes for the logged-in user
const getUserSwipes = async (req, res) => {
  const userId = req.user?.id;

  if (!userId) {
    return res.status(401).json({ message: "Utilisateur non authentifié" });
  }

  try {
    const swipes = await Swipe.findByUserId(userId);
    // Return empty array if no swipes, not an error
    res.status(200).json(swipes);
  } catch (err) {
    console.error("Error fetching user swipes:", err);
    res.status(500).json({
      message: "Erreur lors de la récupération des swipes de l'utilisateur",
      error: err.message,
    });
  }
};

// Delete a swipe (Optional, use with caution)
const deleteSwipe = async (req, res) => {
    const { id } = req.params;
    const userId = req.user?.id;

    if (!userId) {
        return res.status(401).json({ message: "Utilisateur non authentifié" });
    }

    try {
        const deletedSwipe = await Swipe.delete(id, userId);
        res.status(200).json({ message: "Swipe supprimé", swipe: deletedSwipe });
    } catch (err) {
        console.error("Error deleting swipe:", err);
        // Handle specific error from model
        if (err.message.includes("not found or user not authorized")) {
            return res.status(404).json({ message: "Swipe non trouvé ou non autorisé à supprimer" });
        }
        res.status(500).json({
            message: "Erreur lors de la suppression du swipe",
            error: err.message,
        });
    }
};


export {
  recordSwipe,
  getUserSwipes,
  deleteSwipe, // Export if you decide to keep the delete route
};