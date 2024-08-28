import express from "express";
import {
  getCompleteHabits,
  createCompleteHabit,
} from "../Services/completeHabitService.js";

const router = express.Router();

router.get("/:studyId", getCompleteHabits);
router.post("/:studyId/:habitId", createCompleteHabit);
//삭제 기능 제거
export default router;
