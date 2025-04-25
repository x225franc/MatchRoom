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
      INSERT INTO reservation (user_id, rooms_id, bargainedPrice, status, createdAt, decisionAt)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
		const values = [
			userId,
			roomId,
			bargainedPrice,
			status || "pending",
			new Date(),
			null,
		];
		const { rows } = await pool.query(query, values);

		// Récupérer l'ID de la dernière insertion
		const reservationIdQuery = "SELECT LAST_INSERT_ID() as id";
		const { rows: idResult } = await pool.query(reservationIdQuery);
		const reservationId = idResult[0].id;

		// Récupérer les informations de la réservation créée
		const selectQuery = "SELECT * FROM reservation WHERE id = ?";
		const { rows: reservationResult } = await pool.query(selectQuery, [
			reservationId,
		]);
		return reservationResult[0];
	},

	/**
	 * Finds a reservation by its primary key ID.
	 * @param {number} id - The ID of the reservation to find.
	 * @returns {Promise<object|undefined>} The reservation object if found, otherwise undefined.
	 */
	findById: async (id) => {
		// Join with users and rooms might be useful here depending on needs
		const query = "SELECT * FROM reservation WHERE id = ?";
		const { rows } = await pool.query(query, [id]);
		return rows[0];
	},

	/**
	 * Finds all reservations made by a specific user.
	 * @param {number} userId - The ID of the user whose reservations to find.
	 * @returns {Promise<object[]>} An array of reservation objects.
	 */
	findByUserId: async (userId) => {
		const query =
			"SELECT * FROM reservation WHERE user_id = ? ORDER BY createdAt DESC";
		const { rows } = await pool.query(query, [userId]);
		return rows;
	},

	/**
	 * Finds all reservations for a specific room.
	 * @param {number} roomId - The ID of the room whose reservations to find.
	 * @returns {Promise<object[]>} An array of reservation objects.
	 */
	findByRoomId: async (roomId) => {
		const query =
			"SELECT * FROM reservation WHERE rooms_id = ? ORDER BY createdAt DESC";
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
      SET status = ?, decisionAt = ?
      WHERE id = ?
    `;
		const values = [status, new Date(), id];
		await pool.query(query, values);

		// Récupérer les informations mises à jour
		const selectQuery = "SELECT * FROM reservation WHERE id = ?";
		const { rows } = await pool.query(selectQuery, [id]);
		if (rows.length === 0)
			throw new Error("Reservation not found or update failed");
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
      SET bargainedPrice = ?
      WHERE id = ?
    `;
		const values = [bargainedPrice, id];
		await pool.query(query, values);

		// Récupérer les informations mises à jour
		const selectQuery = "SELECT * FROM reservation WHERE id = ?";
		const { rows } = await pool.query(selectQuery, [id]);
		if (rows.length === 0)
			throw new Error("Reservation not found or update failed");
		return rows[0];
	},

	/**
	 * Deletes a reservation by its ID.
	 * @param {number} id - The ID of the reservation to delete.
	 * @returns {Promise<object>} The deleted reservation object (or just its ID).
	 * @throws {Error} If the reservation is not found.
	 */
	delete: async (id) => {
		// Récupérer les informations avant suppression
		const selectQuery = "SELECT * FROM reservation WHERE id = ?";
		const { rows: reservationResult } = await pool.query(selectQuery, [id]);
		if (reservationResult.length === 0)
			throw new Error("Reservation not found");

		// Supprimer la réservation
		const query = "DELETE FROM reservation WHERE id = ?";
		await pool.query(query, [id]);

		return reservationResult[0];
	},

	/**
	 * Finds all active reservations for rooms managed by a specific hôtelier.
	 * @param {number} userId - The ID of the hôtelier.
	 * @returns {Promise<object[]>} An array of reservation objects.
	 */
	findActiveByUserId: async (userId) => {
		const query = `
			SELECT r.*, rm.price, rm.start_date, rm.end_date, u.name as user_name, u.email as user_email
			FROM reservation r
			JOIN rooms rm ON r.rooms_id = rm.id
			JOIN users u ON r.user_id = u.id
			WHERE rm.user_id = ? AND r.status IN ('pending', 'confirmed')
			ORDER BY r.createdAt DESC
		`;
		const { rows } = await pool.query(query, [userId]);
		return rows;
	},

	/**
	 * Counts pending reservations for a specific hôtelier.
	 * @param {number} userId - The ID of the hôtelier.
	 * @returns {Promise<number>} The count of pending reservations.
	 */
	countPendingByHotelierId: async (userId) => {
		const query = `
			SELECT COUNT(*) as count
			FROM reservation r
			JOIN rooms rm ON r.rooms_id = rm.id
			WHERE rm.user_id = ? AND r.status = 'pending'
		`;
		const { rows } = await pool.query(query, [userId]);
		return rows[0].count;
	}
};

export default Reservation;
