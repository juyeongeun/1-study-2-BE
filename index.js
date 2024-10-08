import { PrismaClient } from "@prisma/client";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import studyRoutes from "./routes/study.js";
import completeHabitRoutes from "./routes/completeHabit.js";
import habitRoutes from "./routes/habit.js";
import reactionRoutes from "./routes/reaction.js";
import focusRoutes from "./routes/focus.js";
import "./Services/habitCronJobs.js";
process.env.TZ = "Asia/Seoul";

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
    console.error("Database connection failed:", error);
    res.status(500).json({ message: "Database connection failed", error });
  } finally {
    await prisma.$disconnect();
  }
});

app.use("/api/studies", studyRoutes);
app.use("/api/completeHabits", completeHabitRoutes);
app.use("/api/habits", habitRoutes);
app.use("/api/reactions", reactionRoutes);
app.use("/api/focus", focusRoutes);

//test url
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
