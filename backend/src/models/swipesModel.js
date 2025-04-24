import pool from "../config/db.js";

const Swipe = {
  /**
   * Records a user's swipe action on a room.
   * @param {object} swipeData - The swipe data.
   * @param {number} swipeData.userId - The ID of the user swiping.
   * @param {number} swipeData.roomId - The ID of the room being swiped.
   * @param {string} swipeData.action - The action taken (e.g., 'like', 'dislike').
   * @returns {Promise<object>} The created swipe object.
   */
  create: async ({ userId, roomId, action }) => {
    const query = `
      INSERT INTO swipes (user_id, rooms_id, action, createdAt)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `;
    const values = [userId, roomId, action, new Date()];
    const { rows } = await pool.query(query, values);
    return rows[0];
  },

  /**
   * Finds a swipe record by user ID and room ID.
   * Useful to check if a user has already swiped on a room.
   * @param {number} userId - The ID of the user.
   * @param {number} roomId - The ID of the room.
   * @returns {Promise<object|undefined>} The swipe object if found, otherwise undefined.
   */
  findByUserAndRoom: async (userId, roomId) => {
    const query = "SELECT * FROM swipes WHERE user_id = $1 AND rooms_id = $2";
    const { rows } = await pool.query(query, [userId, roomId]);
    return rows[0];
  },

  /**
   * Finds all swipes made by a specific user.
   * @param {number} userId - The ID of the user whose swipes to find.
   * @returns {Promise<object[]>} An array of swipe objects.
   */
  findByUserId: async (userId) => {
    const query = `
      SELECT s.*, r.photos as room_photos, r.price as room_price -- Add other room details as needed
      FROM swipes s
      JOIN rooms r ON s.rooms_id = r.id
      WHERE s.user_id = $1
      ORDER BY s.createdAt DESC
    `;
    const { rows } = await pool.query(query, [userId]);
    return rows;
  },

  // Delete functionality might not be typical for swipes, but included for CRUD completeness if needed later.
  /**
   * Deletes a swipe by its ID. (Use with caution)
   * @param {number} id - The ID of the swipe to delete.
   * @param {number} userId - The ID of the user attempting to delete (for authorization).
   * @returns {Promise<object>} The deleted swipe object.
   * @throws {Error} If the swipe is not found or user is not authorized.
   */
  delete: async (id, userId) => {
    // Ensure only the user who made the swipe can delete it
    const query = "DELETE FROM swipes WHERE id = $1 AND user_id = $2 RETURNING *;";
    const { rows } = await pool.query(query, [id, userId]);
    if (rows.length === 0) throw new Error("Swipe not found or user not authorized to delete");
    return rows[0];
  },
};

export default Swipe;