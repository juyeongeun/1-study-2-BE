import express from "express";
import { PrismaClient } from "@prisma/client";
import asyncHandler from "../../Common/asyncHandler.js";

const router = express.Router();
const prisma = new PrismaClient();

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const { cursor, sortBy, sortOrder } = req.query;

    let orderBy = {};
    if (sortBy) {
      orderBy[sortBy] = sortOrder === "asc" ? "asc" : "desc";
    } else {
      orderBy = { createAt: "desc" };
    }

    const studies = await prisma.study.findMany({
      orderBy,
      skip: cursor ? 1 : 0,
      take: 6,
      cursor: cursor ? { id: parseInt(cursor) } : undefined,
    });

    res.status(200).json(studies);
  })
);

router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const study = await prisma.study.findUnique({
      where: { id: parseInt(id) },
    });
    if (!study) return res.status(404).json({ error: "study not found" });
    res.status(200).json(study);
  })
);

export default router;
