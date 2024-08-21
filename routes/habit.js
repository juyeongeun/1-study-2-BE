import express from "express";
import {
  createHabit,
  updateHabit,
  getHabits,
  deleteHabit,
} from "../Services/habitService.js";

const router = express.Router();

router.post("/:studyId", createHabit);
router.put("/:studyId/:id", updateHabit);
router.get("/:studyId", getHabits);
router.delete("/:studyId/:id", deleteHabit);

export default router;
