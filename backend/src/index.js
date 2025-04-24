import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoute.js";
import roomsRoutes from "./routes/roomsRoute.js";
import reservationsRoutes from "./routes/reservationsRoute.js"; // Import reservations routes
import dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/rooms", roomsRoutes);
app.use("/reservations", reservationsRoutes); // Gắn reservations routes với tiền tố /reservations

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Serveur démarré sur le port ${PORT}`));
