import pool from "../config/db.js";

const User = {
  create: async ({ email, password, name }) => {
    const query = `
    INSERT INTO users (email, password, name, role, created_at)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING id, email, name, role
    `;
    const { rows } = await pool.query(query, [
      email,
      password,
      name,
      "member",
      new Date(),
    ]);
    return rows[0];
  },

  updateInfoUser: async (user) => {
    const { id, ...fields } = user;
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

    const setClause = keys
      .map((key, index) => `${key} = $${index + 1}`)
      .join(", ");
    const values = keys.map((key) => fields[key]);
    values.push(id);

    const query = `
      UPDATE users
      SET ${setClause}
      WHERE id = $${keys.length + 1}
      RETURNING id, email, name, adress, compAdress, postCode, city
    `;

    const { rows } = await pool.query(query, values);
    return rows[0];
  },

  updateInfoHotel: async (user) => {
    const { id, ...fields } = user;
    const allowedFields = [
      "email",
      "name",
      "adress",
      "compAdress",
      "postCode",
      "city",
      "description",
      "siret ",
      "tags ",
      "rate ",
    ];
    const keys = Object.keys(fields).filter(
      (key) =>
        allowedFields.includes(key) &&
        fields[key] !== undefined &&
        fields[key] !== null
    );

    if (keys.length === 0) throw new Error("Aucune donnée à mettre à jour");

    const setClause = keys
      .map((key, index) => `${key} = $${index + 1}`)
      .join(", ");
    const values = keys.map((key) => fields[key]);
    values.push(id);

    const query = `
      UPDATE users
      SET ${setClause}
      WHERE id = $${keys.length + 1}
      RETURNING id, email, name, adress, compAdress, postCode, city
    `;

    const { rows } = await pool.query(query, values);
    return rows[0];
  },

  findById: async (id) => {
    const { rows } = await pool.query("SELECT * FROM users WHERE id = $1", [
      id,
    ]);
    return rows[0];
  },

  findByEmail: async (email) => {
    const { rows } = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    return rows[0];
  },

  findAll: async () => {
    const { rows } = await pool.query("SELECT * FROM users");
    return rows;
  },

		const setClause = keys
			.map((key, index) => `${key} = $${index + 1}`)
			.join(", ");
		const values = keys.map((key) => fields[key]);
		values.push(id);

		const query = `
      UPDATE users
      SET ${setClause}
      WHERE id = $${keys.length + 1}
      RETURNING id, email, name, adress, compAdress, postCode, city
    `;

		const { rows } = await pool.query(query, values);
		return rows[0];
	},

	updateInfoHotel: async (user) => {
		const { id, ...fields } = user;
		const allowedFields = [
			"email",
			"name",
			"adress",
			"compAdress",
			"postCode",
			"city",
			"description",
			"siret ",
			"tags ",
			"rate ",
		];
		const keys = Object.keys(fields).filter(
			(key) =>
				allowedFields.includes(key) &&
				fields[key] !== undefined &&
				fields[key] !== null
		);

		if (keys.length === 0) throw new Error("Aucune donnée à mettre à jour");

		const setClause = keys
			.map((key, index) => `${key} = $${index + 1}`)
			.join(", ");
		const values = keys.map((key) => fields[key]);
		values.push(id);

		const query = `
      UPDATE users
      SET ${setClause}
      WHERE id = $${keys.length + 1}
      RETURNING id, email, name, adress, compAdress, postCode, city
    `;

		const { rows } = await pool.query(query, values);
		return rows[0];
	},

	findById: async (id) => {
		const { rows } = await pool.query("SELECT * FROM users WHERE id = $1", [
			id,
		]);
		return rows[0];
	},

	findByEmail: async (email) => {
		const { rows } = await pool.query("SELECT * FROM users WHERE email = $1", [
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
			"UPDATE users SET two_factor_secret = $1, two_factor_enabled = TRUE WHERE id = $2",
			[secret, id]
		);
	},

	updateSession: async (id, sessionToken, expiresAt) => {
		await pool.query(
			"UPDATE users SET session_token = $1, session_expires_at = $2 WHERE id = $3",
			[sessionToken, expiresAt, id]
		);
	},

	clearSession: async (id) => {
		await pool.query(
			"UPDATE users SET session_token = NULL, session_expires_at = NULL WHERE id = $1",
			[id]
		);
	},
};

export default User;
