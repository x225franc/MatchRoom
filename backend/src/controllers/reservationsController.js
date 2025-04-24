import Reservation from "../models/reservationsModel.js";
import Room from "../models/roomsModel.js"; // Might need to check room owner
import dotenv from "dotenv";
dotenv.config();

// Create a new reservation
const createReservation = async (req, res) => {
  // userId should come from authMiddleware
  const userId = req.user?.id;
  const { roomId, bargainedPrice } = req.body;
  const status = 'pending'; // Initial status

  if (!userId) {
    return res.status(401).json({ message: "Utilisateur non authentifié" });
  }
  if (!roomId) {
    return res.status(400).json({ message: "L'ID de la chambre est requis" });
  }

  try {
    // Optional: Check if room exists and is available?
    const roomExists = await Room.findById(roomId);
    if (!roomExists) {
        return res.status(404).json({ message: "Chambre non trouvée" });
    }
    // Optional: Check if user is trying to reserve their own room?

    const reservation = await Reservation.create({
      userId,
      roomId,
      bargainedPrice, // Can be null
      status,
    });
    res.status(201).json({ message: "Réservation créée", reservation });
  } catch (err) {
    console.error("Error creating reservation:", err);
    res.status(500).json({
      message: "Erreur lors de la création de la réservation",
      error: err.message,
    });
  }
};

// Get a reservation by its ID
const getReservationById = async (req, res) => {
  const { id } = req.params;
  const requestingUserId = req.user?.id;
  const requestingUserRole = req.user?.role;

  try {
    const reservation = await Reservation.findById(id);
    if (!reservation) {
      return res.status(404).json({ message: "Réservation non trouvée" });
    }

    // Authorization Check: Allow user who made it, the hotel owner, or admin
    const room = await Room.findById(reservation.rooms_id);
    const isOwner = room && room.user_id === requestingUserId;
    const isUserWhoReserved = reservation.user_id === requestingUserId;

    if (isUserWhoReserved || isOwner || requestingUserRole === 'admin') {
        res.status(200).json(reservation);
    } else {
        return res.status(403).json({ message: "Accès non autorisé à cette réservation" });
    }

  } catch (err) {
    console.error("Error fetching reservation by ID:", err);
    res.status(500).json({
      message: "Erreur lors de la récupération de la réservation",
      error: err.message,
    });
  }
};

// Get all reservations for the logged-in user
const getMyReservations = async (req, res) => {
  const userId = req.user?.id;

  if (!userId) {
    return res.status(401).json({ message: "Utilisateur non authentifié" });
  }

  try {
    const reservations = await Reservation.findByUserId(userId);
    // No need for 404 if empty, just return empty array
    res.status(200).json(reservations);
  } catch (err) {
    console.error("Error fetching user reservations:", err);
    res.status(500).json({
      message: "Erreur lors de la récupération des réservations de l'utilisateur",
      error: err.message,
    });
  }
};

// Get all reservations for a specific room (for hotel owner or admin)
const getReservationsForMyRoom = async (req, res) => {
    const { roomId } = req.params;
    const requestingUserId = req.user?.id;
    const requestingUserRole = req.user?.role;

    if (!requestingUserId) {
        return res.status(401).json({ message: "Utilisateur non authentifié" });
    }

    try {
        const room = await Room.findById(roomId);
        if (!room) {
            return res.status(404).json({ message: "Chambre non trouvée" });
        }

        // Authorization: Only room owner or admin
        if (room.user_id !== requestingUserId && requestingUserRole !== 'admin') {
            return res.status(403).json({ message: "Accès non autorisé aux réservations de cette chambre" });
        }

        const reservations = await Reservation.findByRoomId(roomId);
        res.status(200).json(reservations);
    } catch (err) {
        console.error("Error fetching room reservations:", err);
        res.status(500).json({
            message: "Erreur lors de la récupération des réservations de la chambre",
            error: err.message,
        });
    }
};


// Update reservation status (accept, reject, cancel)
const updateReservationStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const requestingUserId = req.user?.id;
  const requestingUserRole = req.user?.role;

  if (!status) {
    return res.status(400).json({ message: "Le nouveau statut est requis" });
  }
  // Add more validation for allowed statuses if needed
  const allowedStatusUpdates = ['accepted', 'rejected', 'cancelled']; // Example
  if (!allowedStatusUpdates.includes(status)) {
      return res.status(400).json({ message: `Statut invalide. Doit être l'un de: ${allowedStatusUpdates.join(', ')}` });
  }

  try {
    const reservation = await Reservation.findById(id);
    if (!reservation) {
      return res.status(404).json({ message: "Réservation non trouvée" });
    }

    const room = await Room.findById(reservation.rooms_id);
    const isOwner = room && room.user_id === requestingUserId;
    const isUserWhoReserved = reservation.user_id === requestingUserId;

    // Authorization Logic:
    // - Hotel owner can accept/reject.
    // - User who reserved can cancel (maybe only if status is 'pending'?).
    // - Admin can do anything.
    let authorized = false;
    if (requestingUserRole === 'admin') {
        authorized = true;
    } else if (isOwner && (status === 'accepted' || status === 'rejected')) {
        authorized = true;
    } else if (isUserWhoReserved && status === 'cancelled' /* && reservation.status === 'pending' */) {
        // Add condition `&& reservation.status === 'pending'` if cancellation is restricted
        authorized = true;
    }

    if (!authorized) {
        return res.status(403).json({ message: "Action non autorisée pour cette réservation ou ce statut" });
    }

    const updatedReservation = await Reservation.updateStatus(id, status);
    res.status(200).json({ message: "Statut de la réservation mis à jour", reservation: updatedReservation });
  } catch (err) {
    console.error("Error updating reservation status:", err);
    res.status(500).json({
      message: "Erreur lors de la mise à jour du statut de la réservation",
      error: err.message,
    });
  }
};

// Delete a reservation
const deleteReservation = async (req, res) => {
  const { id } = req.params;
  const requestingUserId = req.user?.id;
  const requestingUserRole = req.user?.role;

  try {
    const reservation = await Reservation.findById(id);
    if (!reservation) {
      return res.status(404).json({ message: "Réservation non trouvée" });
    }

    // Authorization: User who made it, hotel owner, or admin
    const room = await Room.findById(reservation.rooms_id);
    const isOwner = room && room.user_id === requestingUserId;
    const isUserWhoReserved = reservation.user_id === requestingUserId;

    if (isUserWhoReserved || isOwner || requestingUserRole === 'admin') {
        const deletedReservation = await Reservation.delete(id);
        res.status(200).json({ message: "Réservation supprimée", reservation: deletedReservation });
    } else {
        return res.status(403).json({ message: "Accès non autorisé pour supprimer cette réservation" });
    }

  } catch (err) {
    console.error("Error deleting reservation:", err);
    // Handle specific error like "Reservation not found" from model potentially
    if (err.message === "Reservation not found") {
        return res.status(404).json({ message: "Réservation non trouvée" });
    }
    res.status(500).json({
      message: "Erreur lors de la suppression de la réservation",
      error: err.message,
    });
  }
};

export {
  createReservation,
  getReservationById,
  getMyReservations,
  getReservationsForMyRoom,
  updateReservationStatus,
  deleteReservation,
};