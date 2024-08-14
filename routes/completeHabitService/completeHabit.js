import express from "express";
import completeHabitService from "./completeHabitService.js";

const router = express.Router();
router.post("/:habitId", completeHabitService);
router.delete("/:habitId/:id", completeHabitService);

export default router;
