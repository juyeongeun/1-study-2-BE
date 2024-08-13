import express from "express";
import createStudy from "./studyCRUD/createStudy.js";
import getStudy from "./studyCRUD/getStudy.js";
import updateStudy from "./studyCRUD/updateStudy.js";
import deleteStudy from "./studyCRUD/deleteStudy.js";

const router = express.Router();
router.post("/", createStudy);
router.get("/", getStudy);
router.get("/:id", getStudy);
router.patch("/:id", updateStudy);
router.delete("/:id", deleteStudy);

export default router;
