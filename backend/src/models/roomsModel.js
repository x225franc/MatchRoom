import pool from "../config/db.js";

const Room = {
  /**
   * Creates a new room listing.
   * @param {object} roomData - The room data.
   * @param {number} roomData.userId - The ID of the user creating the room.
   * @param {string|Date} roomData.start - The start date of availability.
   * @param {string|Date} roomData.end - The end date of availability.
   * @param {string} roomData.status - The status of the room (e.g., 'available', 'booked').
   * @param {number} roomData.quantity - The number of rooms available.
   * @param {string[]} roomData.photos - An array of photo URLs.
   * @param {number|string} roomData.price - The price per night.
   * @returns {Promise<object>} The created room object.
   */
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
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        RETURNING *
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
    return rows[0];
  },

  /**
   * Finds a room by its primary key ID.
   * @param {number} id - The ID of the room to find.
   * @returns {Promise<object|undefined>} The room object if found, otherwise undefined.
   */
  findById: async (id) => {
    const query = "SELECT * FROM rooms WHERE id = $1";
    const { rows } = await pool.query(query, [id]);
    return rows[0];
  },

  /**
   * Finds all rooms listed by a specific user.
   * @param {number} userId - The ID of the user whose rooms to find.
   * @returns {Promise<object[]>} An array of room objects.
   */
  findByUserId: async (userId) => {
    const query = "SELECT * FROM rooms WHERE user_id = $1 ORDER BY start DESC";
    const { rows } = await pool.query(query, [userId]);
    return rows;
  },

  /**
   * Finds all rooms in the database, ONLY for admin users.
   * Consider adding pagination/filtering for large datasets.
   * @returns {Promise<object[]>} An array of all room objects.
   */
  findAll: async () => {
    const query = "SELECT * FROM rooms ORDER BY start DESC";
    const { rows } = await pool.query(query);
    return rows;
  },

  /**
   * Update room information.
   * @param {object} room - The room data to update.
   */
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

    const setClause = keys
      .map((key, index) => `${key} = $${index + 1}`)
      .join(", ");
    const values = keys.map((key) => fields[key]);
    values.push(id);

    const query = `
        UPDATE rooms
        SET ${setClause}
        WHERE id = $${keys.length + 1}
        RETURNING *
        `;

    const { rows } = await pool.query(query, values);
    return rows[0];
  },

  delete: async (id) => {
    const query = `
        DELETE FROM rooms
        WHERE id = $1
        RETURNING id
        `;
    const { rows } = await pool.query(query, [id]);
    if (rows.length === 0) throw new Error("Room not found");
    return rows[0];
  },
};

export default Room;
