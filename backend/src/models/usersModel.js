import pool from "../config/db.js";

const User = {
	create: async ({
		email,
		password,
		name,
		role ,
		status = "active",
		description,
		siret,
		tags,
		rate,
	}) => {
		// Construire la requête dynamiquement en fonction des champs présents
		let fields = ["email", "password", "name", "role", "status", "created_at"];
		let placeholders = ["?", "?", "?", "?", "?", "?"];
		let values = [email, password, name, role, status, new Date()];

		// Ajouter les champs spécifiques à l'hôtelier s'ils sont fournis
		if (description) {
			fields.push("description");
			placeholders.push("?");
			values.push(description);
		}
		if (siret) {
			fields.push("siret");
			placeholders.push("?");
			values.push(siret);
		}
		if (tags) {
			fields.push("tags");
			placeholders.push("?");
			values.push(Array.isArray(tags) ? JSON.stringify(tags) : tags);
		}
		if (rate !== undefined && rate !== null) {
			// Convertir en nombre et s'assurer que la valeur est dans la plage acceptable
			let numRate = Number(rate);

			// Pour DECIMAL(3,2), limiter entre -9.99 et 9.99
			// En supposant que le taux doit être positif, on limite entre 0 et 9.99
			numRate = Math.max(0, Math.min(9.99, numRate));

			// Arrondir à 2 décimales pour s'assurer de la précision
			numRate = parseFloat(numRate.toFixed(2));

			fields.push("rate");
			placeholders.push("?");
			values.push(numRate);
		}

		const query = `
    INSERT INTO users (${fields.join(", ")})
      VALUES (${placeholders.join(", ")})
    `;
		const { rows } = await pool.query(query, values);

		// En MySQL, nous devons récupérer l'ID inséré séparément
		const userIdQuery = "SELECT LAST_INSERT_ID() as id";
		const { rows: idResult } = await pool.query(userIdQuery);
		const userId = idResult[0].id;

		// Récupérer les informations de l'utilisateur créé
		const selectQuery =
			"SELECT id, email, name, role, status, description, siret, tags, rate FROM users WHERE id = ?";
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
