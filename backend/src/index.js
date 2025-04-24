import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoute.js";
import roomsRoutes from "./routes/roomsRoute.js";
import reservationsRoutes from "./routes/reservationsRoute.js";
import swipesRoutes from "./routes/swipesRoute.js";
import messagesRoutes from "./routes/messagesRoute.js"; // Import messages routes
import dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/rooms", roomsRoutes);
app.use("/reservations", reservationsRoutes);
app.use("/swipes", swipesRoutes);
app.use("/messages", messagesRoutes); // Gắn messages routes với tiền tố /messages

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Serveur démarré sur le port ${PORT}`));
