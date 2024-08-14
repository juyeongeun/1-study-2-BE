import express from "express";
import reactionService from "./reactionService.js";

const router = express.Router();

router.get("/:studyId", reactionService);
router.post("/:studyId", reactionService);

export default router;
