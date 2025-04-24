import pool from "../config/db.js";

const Message = {
  /**
   * Creates a new message within a reservation context.
   * @param {object} messageData - The message data.
   * @param {number} messageData.userId - The ID of the user associated with the reservation (often the recipient context).
   * @param {number} messageData.reservationId - The ID of the reservation this message belongs to.
   * @param {number} messageData.senderId - The ID of the user sending the message.
   * @param {string} messageData.content - The text content of the message.
   * @returns {Promise<object>} The created message object.
   */
  create: async ({ userId, reservationId, senderId, content }) => {
    const query = `
      INSERT INTO messages (user_id, reservation_id, sender_id, content, createdAt)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;
    `;
    const values = [userId, reservationId, senderId, content, new Date()];
    const { rows } = await pool.query(query, values);
    return rows[0];
  },

  /**
   * Finds all messages associated with a specific reservation, ordered by creation time.
   * Includes sender's name for display purposes.
   * @param {number} reservationId - The ID of the reservation.
   * @returns {Promise<object[]>} An array of message objects with sender names.
   */
  findByReservationId: async (reservationId) => {
    const query = `
      SELECT m.*, u.name as sender_name
      FROM messages m
      JOIN users u ON m.sender_id = u.id
      WHERE m.reservation_id = $1
      ORDER BY m.createdAt ASC;
    `;
    const { rows } = await pool.query(query, [reservationId]);
    return rows;
  },

  // Optional: Find by ID if needed for specific message operations (edit/delete - though less common for chat)
  /**
   * Finds a message by its primary key ID.
   * @param {number} id - The ID of the message to find.
   * @returns {Promise<object|undefined>} The message object if found, otherwise undefined.
   */
  findById: async (id) => {
    const query = "SELECT * FROM messages WHERE id = $1";
    const { rows } = await pool.query(query, [id]);
    return rows[0];
  },

  // Delete functionality might be needed for moderation or user actions.
  /**
   * Deletes a message by its ID. Requires authorization check in controller.
   * @param {number} id - The ID of the message to delete.
   * @returns {Promise<object>} The deleted message object.
   * @throws {Error} If the message is not found.
   */
  delete: async (id) => {
    const query = "DELETE FROM messages WHERE id = $1 RETURNING *;";
    const { rows } = await pool.query(query, [id]);
    if (rows.length === 0) throw new Error("Message not found");
    return rows[0];
  },
};

export default Message;