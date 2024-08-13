import express from "express";
import { PrismaClient } from "@prisma/client";
import asyncHandler from "../../Common/asyncHandler.js";

const router = express.Router();
const prisma = new PrismaClient();

router.post(
  "/",
  asyncHandler(async (req, res) => {
    const { name, studyName, content, background, password } = req.body;
    const study = await prisma.study.create({
      data: {
        name,
        studyName,
        content,
        background,
        password,
      },
    });
    res.status(201).json(study);
  })
);

export default router;
