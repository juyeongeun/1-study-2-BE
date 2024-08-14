import express from "express";
import habitService from "./habitService.js";

const router = express.Router();
router.post("/:studyId", habitService);
router.get("/:studyId", habitService);
router.patch("/:studyId/:id", habitService);
router.delete("/:studyId/:id", habitService);

export default router;
