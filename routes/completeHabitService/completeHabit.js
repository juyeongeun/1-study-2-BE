import express from "express";
import completeHabitService from "./completeHabitService.js";

const router = express.Router();
router.get("/:studyId", completeHabitService);
router.post("/:studyId/:habitId", completeHabitService);
router.delete("/:studyId/:habitId/:id", completeHabitService);

export default router;
