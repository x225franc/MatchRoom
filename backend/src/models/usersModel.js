import pool from "../config/db.js";

const User = {
	create: async ({ email, password, name }) => {
		const query = `
    INSERT INTO users (email, password, name, role, created_at)
      VALUES (?, ?, ?, ?, ?)
    `;
		const { rows } = await pool.query(query, [
			email,
			password,
			name,
			"member",
			new Date(),
		]);
		// En MySQL, nous devons récupérer l'ID inséré séparément
		const userIdQuery = "SELECT LAST_INSERT_ID() as id";
		const { rows: idResult } = await pool.query(userIdQuery);
		const userId = idResult[0].id;

		// Récupérer les informations de l'utilisateur créé
		const selectQuery = "SELECT id, email, name, role FROM users WHERE id = ?";
		const { rows: userResult } = await pool.query(selectQuery, [userId]);
		return userResult[0];
	},

	updatePassword: async (id, password) => {
		const query = ` 
      UPDATE users
      SET password = ?
      WHERE id = ?
    `;
		await pool.query(query, [password, id]);

		// Récupérer les informations mises à jour
		const selectQuery =
			"SELECT id, email, name, adress, compAdress, postCode, city FROM users WHERE id = ?";
		const { rows } = await pool.query(selectQuery, [id]);
		return rows[0];
	},

	updateInfoUser: async (id, fields) => {
		const allowedFields = [
			"email",
			"name",
			"adress",
			"compAdress",
			"postCode",
			"city",
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
      UPDATE users
      SET ${setClause}
      WHERE id = ?
    `;

		await pool.query(query, values);

		// Récupérer les informations mises à jour
		const selectQuery =
			"SELECT id, email, name, adress, compAdress, postCode, city FROM users WHERE id = ?";
		const { rows } = await pool.query(selectQuery, [id]);
		return rows[0];
	},

	updateInfoHotel: async (id, fields) => {
		const allowedFields = [
			"email",
			"name",
			"adress",
			"compAdress",
			"postCode",
			"city",
			"description",
			"siret",
			"tags",
			"rate",
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
      UPDATE users
      SET ${setClause}
      WHERE id = ?
    `;

		await pool.query(query, values);

		// Récupérer les informations mises à jour
		const selectQuery =
			"SELECT id, email, name, adress, compAdress, postCode, city FROM users WHERE id = ?";
		const { rows } = await pool.query(selectQuery, [id]);
		return rows[0];
	},

	findById: async (id) => {
		const { rows } = await pool.query("SELECT * FROM users WHERE id = ?", [id]);
		return rows[0];
	},

	findByEmail: async (email) => {
		const { rows } = await pool.query("SELECT * FROM users WHERE email = ?", [
			email,
		]);
		return rows[0];
	},

	findAll: async () => {
		const { rows } = await pool.query("SELECT * FROM users");
		return rows;
	},

	update2FASecret: async (id, secret) => {
		await pool.query(
			"UPDATE users SET two_factor_secret = ?, two_factor_enabled = TRUE WHERE id = ?",
			[secret, id]
		);
	},

	updateSession: async (id, sessionToken, expiresAt) => {
		await pool.query(
			"UPDATE users SET session_token = ?, session_expires_at = ? WHERE id = ?",
			[sessionToken, expiresAt, id]
		);
	},

	clearSession: async (id) => {
		await pool.query(
			"UPDATE users SET session_token = NULL, session_expires_at = NULL WHERE id = ?",
			[id]
		);
	},
};

export default User;
