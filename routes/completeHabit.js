import express from "express";
import {
  getCompleteHabits,
  createCompleteHabit,
} from "../Services/completeHabitService.js";

const router = express.Router();

router.get("/:studyId", getCompleteHabits);
router.post("/:studyId/:habitId", createCompleteHabit);

export default router;
