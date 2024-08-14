import express from "express";
import { PrismaClient } from "@prisma/client";
import asyncHandler from "../../Common/asyncHandler.js";

const router = express.Router();
const prisma = new PrismaClient();

router.post(
  "/:studyId",
  asyncHandler(async (req, res) => {
    const { habitName } = req.body;
    const { studyId } = req.params;
    const habit = await prisma.habit.create({
      data: {
        habitName,
        studyId: parseInt(studyId),
      },
    });
  })
);

router.get(
  "/:studyId",
  asyncHandler(async (req, res) => {
    const { studyId } = req.params;
    const habits = await prisma.habit.findMany({
      where: {
        studyId: parseInt(studyId),
      },
    });
    res.status(200).json(habits);
  })
);

router.patch(
  "/:studyId/:id",
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { habitName } = req.body;
    const habit = await prisma.habit.update({
      where: {
        id: parseInt(id),
      },
      data: {
        habitName,
      },
    });
    res.status(200).json(habit);
  })
);

router.delete(
  "/:studyId/:id",
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    await prisma.habit.delete({
      where: {
        id: parseInt(id),
      },
    });
  })
);

export default router;
