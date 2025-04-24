import pool from "../config/db.js";

const Message = {
	/**
	 * Creates a new message.
	 * @param {object} messageData - The message data.
	 * @param {number} messageData.userId - The ID of the user who receives the message.
	 * @param {number} messageData.senderId - The ID of the user who sends the message.
	 * @param {number} messageData.reservationId - The ID of the related reservation.
	 * @param {string} messageData.content - The content of the message.
	 * @returns {Promise<object>} The created message object.
	 */
	create: async ({ userId, senderId, reservationId, content }) => {
		const query = `
      INSERT INTO messages (user_id, sender_id, reservation_id, content, createdAt)
      VALUES (?, ?, ?, ?, ?)
    `;
		const values = [userId, senderId, reservationId, content, new Date()];
		const { rows } = await pool.query(query, values);

		// Récupérer l'ID du dernier message inséré
		const messageIdQuery = "SELECT LAST_INSERT_ID() as id";
		const { rows: idResult } = await pool.query(messageIdQuery);
		const messageId = idResult[0].id;

		// Récupérer les informations complètes du message
		const selectQuery = `
      SELECT m.*, u.name as sender_name
      FROM messages m
      JOIN users u ON m.sender_id = u.id
      WHERE m.id = ?
    `;
		const { rows: messageResult } = await pool.query(selectQuery, [messageId]);
		return messageResult[0];
	},

	/**
	 * Finds a message by its ID.
	 * @param {number} id - The ID of the message to find.
	 * @returns {Promise<object|undefined>} The message object if found, otherwise undefined.
	 */
	findById: async (id) => {
		const query = `
      SELECT m.*, u.name as sender_name
      FROM messages m
      JOIN users u ON m.sender_id = u.id
      WHERE m.id = ?
    `;
		const { rows } = await pool.query(query, [id]);
		return rows[0];
	},

	/**
	 * Finds all messages for a specific reservation.
	 * @param {number} reservationId - The ID of the reservation whose messages to find.
	 * @returns {Promise<object[]>} An array of message objects.
	 */
	findByReservationId: async (reservationId) => {
		const query = `
      SELECT m.*, u.name as sender_name
      FROM messages m
      JOIN users u ON m.sender_id = u.id
      WHERE m.reservation_id = ?
      ORDER BY m.createdAt ASC
    `;
		const { rows } = await pool.query(query, [reservationId]);
		return rows;
	},

	/**
	 * Finds all messages for a specific user.
	 * @param {number} userId - The ID of the user whose messages to find.
	 * @returns {Promise<object[]>} An array of message objects.
	 */
	findByUserId: async (userId) => {
		const query = `
      SELECT m.*, u.name as sender_name, r.rooms_id as room_id
      FROM messages m
      JOIN users u ON m.sender_id = u.id
      JOIN reservation r ON m.reservation_id = r.id
      WHERE m.user_id = ?
      ORDER BY m.createdAt DESC
    `;
		const { rows } = await pool.query(query, [userId]);
		return rows;
	},

	/**
	 * Deletes a message by its ID.
	 * @param {number} id - The ID of the message to delete.
	 * @param {number} userId - The ID of the user attempting to delete.
	 * @returns {Promise<object>} The deleted message object.
	 * @throws {Error} If the message is not found or user is not authorized.
	 */
	delete: async (id, userId) => {
		// Récupérer les informations avant suppression
		const selectQuery = `
      SELECT *
      FROM messages
      WHERE id = ? AND (user_id = ? OR sender_id = ?)
    `;
		const { rows: messageResult } = await pool.query(selectQuery, [
			id,
			userId,
			userId,
		]);
		if (messageResult.length === 0)
			throw new Error("Message not found or user not authorized to delete");

		// Supprimer le message
		const query = "DELETE FROM messages WHERE id = ?";
		await pool.query(query, [id]);

		return messageResult[0];
	},
};

export default Message;
