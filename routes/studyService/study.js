import express from "express";
import studyService from "./studyService.js";

const router = express.Router();
router.post("/", studyService);
router.get("/", studyService);
router.get("/:id", studyService);
router.put("/:id", studyService);
router.delete("/:id", studyService);

export default router;
