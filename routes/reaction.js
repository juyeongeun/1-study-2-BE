import express from "express";
import { createReaction, getReactions } from "../Services/reactionService.js";

const router = express.Router();

router.get("/:studyId", getReactions);
router.post("/:studyId", createReaction);

export default router;
