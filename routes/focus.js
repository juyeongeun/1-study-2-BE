import express from "express";
import { setPoint } from "../Services/focusService.js";

const router = express.Router();

router.post("/:studyId", setPoint);

export default router;
