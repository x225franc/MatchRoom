import Message from "../models/messagesModel.js";
import Reservation from "../models/reservationsModel.js";
import Room from "../models/roomsModel.js";
import dotenv from "dotenv";
dotenv.config();

// Helper function to check if user is part of the reservation
const isUserPartOfReservation = async (userId, reservationId) => {
    const reservation = await Reservation.findById(reservationId);
    if (!reservation) return false; // Reservation doesn't exist

    const room = await Room.findById(reservation.rooms_id);
    if (!room) return false; // Room doesn't exist (data integrity issue?)

    // User is part of the reservation if they booked it OR they own the room
    return reservation.user_id === userId || room.user_id === userId;
};


// Send a new message
const sendMessage = async (req, res) => {
  const senderId = req.user?.id; // Logged-in user is the sender
  const { reservationId, content } = req.body;

  if (!senderId) {
    return res.status(401).json({ message: "Utilisateur non authentifié" });
  }
  if (!reservationId || !content) {
    return res.status(400).json({ message: "L'ID de réservation et le contenu sont requis" });
  }

  try {
    // 1. Verify reservation exists and get participant IDs
    const reservation = await Reservation.findById(reservationId);
    if (!reservation) {
        return res.status(404).json({ message: "Réservation non trouvée" });
    }

    // 2. Authorization: Check if the sender is part of this reservation
    const authorized = await isUserPartOfReservation(senderId, reservationId);
    if (!authorized) {
        return res.status(403).json({ message: "Accès non autorisé à envoyer des messages pour cette réservation" });
    }

    // Determine the 'user_id' for the message record (often the other participant)
    // This depends on how you want to structure/query later.
    // Let's assume user_id in messages refers to the user who INITIATED the reservation.
    const userIdForMessage = reservation.user_id;

    // 3. Create the message
    const message = await Message.create({
      userId: userIdForMessage, // User who made the reservation
      reservationId,
      senderId, // The actual sender (logged-in user)
      content,
    });

    // Optional: Emit message via WebSockets here if implementing real-time chat

    res.status(201).json({ message: "Message envoyé", messageData: message });

  } catch (err) {
    console.error("Error sending message:", err);
    res.status(500).json({
      message: "Erreur lors de l'envoi du message",
      error: err.message,
    });
  }
};

// Get all messages for a specific reservation
const getMessagesForReservation = async (req, res) => {
  const requestingUserId = req.user?.id;
  const { reservationId } = req.params;

  if (!requestingUserId) {
    return res.status(401).json({ message: "Utilisateur non authentifié" });
  }
  if (!reservationId) {
      return res.status(400).json({ message: "L'ID de réservation est requis dans l'URL" });
  }

  try {
    // 1. Authorization: Check if the requesting user is part of this reservation
    const authorized = await isUserPartOfReservation(requestingUserId, reservationId);
     if (!authorized) {
        // Check if reservation exists at all before denying access
        const reservationExists = await Reservation.findById(reservationId);
        if (!reservationExists) {
             return res.status(404).json({ message: "Réservation non trouvée" });
        }
        return res.status(403).json({ message: "Accès non autorisé à voir les messages de cette réservation" });
    }

    // 2. Fetch messages
    const messages = await Message.findByReservationId(reservationId);
    // Return empty array if no messages, not an error
    res.status(200).json(messages);

  } catch (err) {
    console.error("Error fetching messages for reservation:", err);
    res.status(500).json({
      message: "Erreur lors de la récupération des messages",
      error: err.message,
    });
  }
};

// Optional: Delete a message (requires careful authorization)
const deleteMessage = async (req, res) => {
    const { id } = req.params; // Message ID
    const requestingUserId = req.user?.id;
    const requestingUserRole = req.user?.role; // Assuming role is available

    if (!requestingUserId) {
        return res.status(401).json({ message: "Utilisateur non authentifié" });
    }

    try {
        const message = await Message.findById(id);
        if (!message) {
            return res.status(404).json({ message: "Message non trouvé" });
        }

        // Authorization: Allow sender or admin to delete
        const isSender = message.sender_id === requestingUserId;
        const isAdmin = requestingUserRole === 'admin';

        if (!isSender && !isAdmin) {
            return res.status(403).json({ message: "Non autorisé à supprimer ce message" });
        }

        const deletedMessage = await Message.delete(id);
        res.status(200).json({ message: "Message supprimé", messageData: deletedMessage });

    } catch (err) {
        console.error("Error deleting message:", err);
        if (err.message === "Message not found") {
             return res.status(404).json({ message: "Message non trouvé" });
        }
        res.status(500).json({
            message: "Erreur lors de la suppression du message",
            error: err.message,
        });
    }
};


export {
  sendMessage,
  getMessagesForReservation,
  deleteMessage, // Export if using delete route
};