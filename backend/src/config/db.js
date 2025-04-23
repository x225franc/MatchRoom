import { Pool } from 'pg'; // Import Pool from pg package
import dotenv from 'dotenv'; 
dotenv.config(); 

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }, // Cần cho Neon Tech
});

export default pool; 