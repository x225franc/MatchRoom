import pool from "../config/db.js";

const Reservation = {
  /**
   * Creates a new reservation.
   * @param {object} reservationData - The reservation data.
   * @param {number} reservationData.userId - The ID of the user making the reservation.
   * @param {number} reservationData.roomId - The ID of the room being reserved.
   * @param {number|string} [reservationData.bargainedPrice] - The negotiated price (optional).
   * @param {string} reservationData.status - The initial status (e.g., 'pending').
   * @returns {Promise<object>} The created reservation object.
   */
  create: async ({ userId, roomId, bargainedPrice, status }) => {
    const query = `
      INSERT INTO reservation (user_id, rooms_id, bargainedPrice, status, createdAt, decisionAt )
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *;
    `;
    const values = [userId, roomId, bargainedPrice, status || 'pending', new Date(), null];
    const { rows } = await pool.query(query, values);
    return rows[0];
  },

  /**
   * Finds a reservation by its primary key ID.
   * @param {number} id - The ID of the reservation to find.
   * @returns {Promise<object|undefined>} The reservation object if found, otherwise undefined.
   */
  findById: async (id) => {
    // Join with users and rooms might be useful here depending on needs
    const query = "SELECT * FROM reservation WHERE id = $1";
    const { rows } = await pool.query(query, [id]);
    return rows[0];
  },

  /**
   * Finds all reservations made by a specific user.
   * @param {number} userId - The ID of the user whose reservations to find.
   * @returns {Promise<object[]>} An array of reservation objects.
   */
  findByUserId: async (userId) => {
    const query = "SELECT * FROM reservation WHERE user_id = $1 ORDER BY createdAt DESC";
    const { rows } = await pool.query(query, [userId]);
    return rows;
  },

  /**
   * Finds all reservations for a specific room.
   * @param {number} roomId - The ID of the room whose reservations to find.
   * @returns {Promise<object[]>} An array of reservation objects.
   */
  findByRoomId: async (roomId) => {
    const query = "SELECT * FROM reservation WHERE rooms_id = $1 ORDER BY createdAt DESC";
    const { rows } = await pool.query(query, [roomId]);
    return rows;
  },

  /**
   * Updates the status and decision time of a reservation.
   * @param {number} id - The ID of the reservation to update.
   * @param {string} status - The new status (e.g., 'accepted', 'rejected', 'cancelled').
   * @returns {Promise<object>} The updated reservation object.
   * @throws {Error} If the reservation is not found.
   */
  updateStatus: async (id, status) => {
    const query = `
      UPDATE reservation
      SET status = $1, decisionAt = $2
      WHERE id = $3
      RETURNING *;
    `;
    const values = [status, new Date(), id];
    const { rows } = await pool.query(query, values);
    if (rows.length === 0) throw new Error("Reservation not found or update failed");
    return rows[0];
  },

   /**
   * Updates the bargained price of a reservation (if applicable).
   * @param {number} id - The ID of the reservation to update.
   * @param {number|string} bargainedPrice - The new bargained price.
   * @returns {Promise<object>} The updated reservation object.
   * @throws {Error} If the reservation is not found.
   */
  updateBargainedPrice: async (id, bargainedPrice) => {
    const query = `
      UPDATE reservation
      SET bargainedPrice = $1
      WHERE id = $2
      RETURNING *;
    `;
    const values = [bargainedPrice, id];
    const { rows } = await pool.query(query, values);
    if (rows.length === 0) throw new Error("Reservation not found or update failed");
    return rows[0];
  },


  /**
   * Deletes a reservation by its ID.
   * @param {number} id - The ID of the reservation to delete.
   * @returns {Promise<object>} The deleted reservation object (or just its ID).
   * @throws {Error} If the reservation is not found.
   */
  delete: async (id) => {
    const query = "DELETE FROM reservation WHERE id = $1 RETURNING *;"; // RETURNING * to confirm deletion
    const { rows } = await pool.query(query, [id]);
    if (rows.length === 0) throw new Error("Reservation not found");
    return rows[0];
  },
};

export default Reservation;