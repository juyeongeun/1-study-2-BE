import express from "express";
import { PrismaClient } from "@prisma/client";
import asyncHandler from "../../Common/asyncHandler.js";

const router = express.Router();
const prisma = new PrismaClient();

router.patch(
  "/:id",
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { name, studyName, content, background, password } = req.body;
    const study = await prisma.study.update({
      where: { id: parseInt(id) },
      data: { name, studyName, content, background, password },
    });
    if (!study) return res.status(404).json({ error: "study not found" });
    res.status(200).json(study);
  })
);

export default router;
