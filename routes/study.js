import express from "express";
import {
  createStudy,
  getStudies,
  getStudyById,
  updateStudy,
  deleteStudy,
} from "../Services/studyService.js";

const router = express.Router();

router.post("/", createStudy);
router.get("/", getStudies);
router.get("/:id", getStudyById);
router.put("/:id", updateStudy);
router.delete("/:id", deleteStudy);

export default router;
