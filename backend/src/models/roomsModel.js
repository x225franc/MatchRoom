import pool from "../config/db.js";

const Room = {
	create: async ({
		userId,
		start_date,
		end_date,
		status,
		quantity,
		photos,
		price,
		capacity,
	}) => {
		const query = `
        INSERT INTO rooms (user_id, start_date, end_date, status, quantity, photos, price, capacity)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `;
		const { rows } = await pool.query(query, [
			userId,
			start_date,
			end_date,
			status,
			quantity,
			photos,
			price,
			capacity,
		]);

		// Récupérer l'ID de la dernière insertion
		const roomIdQuery = "SELECT LAST_INSERT_ID() as id";
		const { rows: idResult } = await pool.query(roomIdQuery);
		const roomId = idResult[0].id;

		// Récupérer les informations complètes
		const selectQuery = "SELECT * FROM rooms WHERE id = ?";
		const { rows: roomResult } = await pool.query(selectQuery, [roomId]);
		return roomResult[0];
	},

	findById: async (id) => {
		const { rows } = await pool.query("SELECT * FROM rooms WHERE id = ?", [id]);
		return rows[0];
	},

	findByUserId: async (userId) => {
		const query =
			"SELECT * FROM rooms WHERE user_id = ? ORDER BY start_date DESC";
		const { rows } = await pool.query(query, [userId]);
		return rows;
	},

	findAll: async () => {
		const query = "SELECT * FROM rooms ORDER BY start_date DESC";
		const { rows } = await pool.query(query);
		return rows;
	},

	update: async (room) => {
		const { id, ...fields } = room;
		const allowedFields = [
			"start_date",
			"end_date",
			"status",
			"quantity",
			"photos",
			"price",
			"capacity",
		];
		const keys = Object.keys(fields).filter(
			(key) =>
				allowedFields.includes(key) &&
				fields[key] !== undefined &&
				fields[key] !== null
		);

		if (keys.length === 0) throw new Error("Aucune donnée à mettre à jour");

		const setClause = keys.map((key) => `${key} = ?`).join(", ");
		const values = keys.map((key) => fields[key]);
		values.push(id);

		const query = `
        UPDATE rooms
        SET ${setClause}
        WHERE id = ?
        `;

		await pool.query(query, values);

		// Récupérer les informations mises à jour
		const selectQuery = "SELECT * FROM rooms WHERE id = ?";
		const { rows } = await pool.query(selectQuery, [id]);
		return rows[0];
	},

	delete: async (id) => {
		const query = `
        DELETE FROM rooms
        WHERE id = ?
        `;
		const { rows } = await pool.query(query, [id]);

		return { id };
	},
};

export default Room;
