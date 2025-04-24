import Room from "../models/roomsModel.js";
import dotenv from "dotenv";
dotenv.config();

const createRoom = async (req, res) => {
  const {
    userId,
    start_date,
    end_date,
    status,
    quantity,
    photos,
    price,
    capacity,
  } = req.body;

  if (
    !userId ||
    !start_date ||
    !end_date ||
    !status ||
    !quantity ||
    !photos ||
    !price ||
    !capacity
  ) {
    return res.status(400).json({ message: "Tous les champs sont requis" });
  }

  try {
    const room = await Room.create({
      userId,
      start_date,
      end_date,
      status,
      quantity,
      photos,
      price,
      capacity,
    });
    res.status(201).json({ message: "Chambre créée", room });
  } catch (err) {
    res.status(500).json({
      message: "Erreur lors de la création de la chambre",
      error: err.message,
    });
  }
};

const getRoomById = async (req, res) => {
  const { id } = req.params;

  try {
    const room = await Room.findById(id);
    if (!room) {
      return res.status(404).json({ message: "Chambre non trouvée" });
    }
    res.status(200).json(room);
  } catch (err) {
    res.status(500).json({
      message: "Erreur lors de la récupération de la chambre",
      error: err.message,
    });
  }
};

const getRoomsByUserId = async (req, res) => {
  const { userId } = req.params;

  try {
    const rooms = await Room.findByUserId(userId);
    if (!rooms || rooms.length === 0) {
      return res.status(404).json({ message: "Aucune chambre trouvée" });
    }
    res.status(200).json(rooms);
  } catch (err) {
    res.status(500).json({
      message: "Erreur lors de la récupération des chambres",
      error: err.message,
    });
  }
};

const getAllRooms = async (req, res) => {
  try {
    const rooms = await Room.findAll();
    if (!rooms || rooms.length === 0) {
      return res.status(404).json({ message: "Aucune chambre trouvée" });
    }
    res.status(200).json(rooms);
  } catch (err) {
    res.status(500).json({
      message: "Erreur lors de la récupération des chambres",
      error: err.message,
    });
  }
};

const updateRoom = async (req, res) => {
  const { id } = req.params;
  const { start_date, end_date, status, quantity, photos, price } = req.body;

  try {
    const room = await Room.update(id, {
      start_date,
      end_date,
      status,
      quantity,
      photos,
      price,
    });
    if (!room) {
      return res.status(404).json({ message: "Chambre non trouvée" });
    }
    res.status(200).json({ message: "Chambre mise à jour", room });
  } catch (err) {
    res.status(500).json({
      message: "Erreur lors de la mise à jour de la chambre",
      error: err.message,
    });
  }
};

const deleteRoom = async (req, res) => {
  const { id } = req.params;

  try {
    const room = await Room.delete(id);
    if (!room) {
      return res.status(404).json({ message: "Chambre non trouvée" });
    }
    res.status(200).json({ message: "Chambre supprimée", room });
  } catch (err) {
    res.status(500).json({
      message: "Erreur lors de la suppression de la chambre",
      error: err.message,
    });
  }
};

export {
  createRoom,
  getRoomById,
  getRoomsByUserId,
  getAllRooms,
  updateRoom,
  deleteRoom,
};
