import express from 'express'
import compression from "compression";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { connectToDatabase } from "./db.js";
import authRouter from "./routes/authRoutes.js"

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors({
  origin: '*',
  exposedHeaders: ["Authorization", "RefreshToken"],
  credentials: true,
}));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

app.use(compression());

app.use("/api/auth", authRouter);

app.get("/", (req, res) => {
  res.json({ success: true, message: "Backend Running 🚀" });
});

connectToDatabase();

app.listen(process.env.PORT, "0.0.0.0", () => {
  console.log(`Server running on ${process.env.PORT} 🚀`);
});






