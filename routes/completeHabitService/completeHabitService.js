import express from "express";
import { PrismaClient } from "@prisma/client";
import asyncHandler from "../../Common/asyncHandler.js";

const router = express.Router();
const prisma = new PrismaClient();

router.get(
  "/:studyId",
  asyncHandler(async (req, res) => {
    const { studyId } = req.params;
    const habit = await prisma.completeHabit.findMany({
      where: { studyId: parseInt(studyId) },
    });
    res.status(200).json(habit);
  })
);

router.post(
  "/:studyId/:habitId",
  asyncHandler(async (req, res) => {
    const { habitId, studyId } = req.params;
    const completeHabit = await prisma.completeHabit.create({
      data: {
        habitId: parseInt(habitId),
        studyId: parseInt(studyId),
      },
    });
    res.status(201).json(completeHabit);
  })
);

router.delete(
  "/:studyId/:habitId/:id",
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const habit = await prisma.completeHabit.delete({
      where: {
        id: parseInt(id),
      },
    });
    res.status(204).send();
  })
);

export default router;
