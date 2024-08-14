import { PrismaClient } from "@prisma/client";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import studyRoutes from "./routes/studyService/study.js";
import habitRoutes from "./routes/habitService/habit.js";
import reactionRoutes from "./routes/reactionService/reaction.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
});

app.get("/check-db", async (req, res) => {
  try {
    await prisma.$connect();
    res.status(200).json({ message: "Database connected successfully" });
  } catch (error) {
    console.error("Database connection failed:", error); // 오류 로그 출력
    res.status(500).json({ message: "Database connection failed", error });
  } finally {
    await prisma.$disconnect();
  }
});

app.use("/api/studies", studyRoutes);
app.use("/api/habits", habitRoutes);
app.use("/api/reactions", reactionRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
