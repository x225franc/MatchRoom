import mysql from "mysql2/promise"; // Utilisation de mysql2 avec les promesses
import dotenv from "dotenv";
dotenv.config();

// Configuration pour MySQL
const pool = mysql.createPool({
	host: process.env.HOST,
	user: process.env.USER,
	password: process.env.PASSWORD,
	database: process.env.DB,
	waitForConnections: true,
	connectionLimit: 10,
	queueLimit: 0,
});

// Fonction pour exécuter des requêtes SQL
const query = async (sql, params) => {
	try {
		const [rows] = await pool.execute(sql, params);
		return { rows };
	} catch (error) {
		console.error("Erreur de base de données:", error);
		throw error;
	}
};

export default { query };
