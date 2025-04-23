import pool from "../config/db.js";

const User = {
  create: async ({ email, password, name }) => {
    const query = `
    INSERT INTO users (email, password, name, roles, created_at)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING id, email, name, roles
    `;
    const { rows } = await pool.query(query, [
      email,
      password,
      name,
      ["member"],
      new Date(),
    ]);
    return rows[0];
  },

  findByEmail: async (email) => {
    const { rows } = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    return rows[0];
  },

  findById: async (id) => {
    const { rows } = await pool.query("SELECT * FROM users WHERE id = $1", [
      id,
    ]);
    return rows[0];
  },

  // update2FASecret: async (id, secret) => {
  //   await pool.query(
  //     "UPDATE users SET two_factor_secret = $1, two_factor_enabled = TRUE WHERE id = $2",
  //     [secret, id]
  //   );
  // },

  // updateSession: async (id, sessionToken, expiresAt) => {
  //   await pool.query(
  //     "UPDATE users SET session_token = $1, session_expires_at = $2 WHERE id = $3",
  //     [sessionToken, expiresAt, id]
  //   );
  // },

  // clearSession: async (id) => {
  //   await pool.query(
  //     "UPDATE users SET session_token = NULL, session_expires_at = NULL WHERE id = $1",
  //     [id]
  //   );
  // },
};

export default User;
