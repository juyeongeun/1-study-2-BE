import express from "express";
import { PrismaClient } from "@prisma/client";
import asyncHandler from "../../Common/asyncHandler.js";

const router = express.Router();
const prisma = new PrismaClient();

router.post(
  "/:habitId",
  asyncHandler(async (req, res) => {
    const { habitId, studyId } = req.params;
    const completeHabit = await prisma.completeHabit.create({
      data: {
        habitId: habitId,
        studyId: studyId,
      },
    });
    res.status(201).json(completeHabit);
  })
);

router.delete(
  "/:habitId/:id",
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const habit = await prisma.completeHabit.delete({
      where: {
        id: parseInt(id),
      },
    });
  })
);

export default router;
