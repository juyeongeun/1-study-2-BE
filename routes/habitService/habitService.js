import express from "express";
import { PrismaClient } from "@prisma/client";
import asyncHandler from "../../Common/asyncHandler.js";

const router = express.Router();
const prisma = new PrismaClient();

router.post(
  "/:studyId",
  asyncHandler(async (req, res) => {
    const { habitName, date } = req.body;
    const { studyId } = req.params;
    const habit = await prisma.habit.create({
      data: {
        habitName,
        studyId: parseInt(studyId),
        date: new Date(date),
      },
    });
    res.status(201).json(habit);
  })
);

router.put(
  "/:studyId/:id",
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { habitName, date } = req.body;
    const habit = await prisma.habit.updateMany({
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

router.get(
  "/:studyId",
  asyncHandler(async (req, res) => {
    const { studyId } = req.params;
    const habits = await prisma.habit.findMany({
      where: {
        studyId: parseInt(studyId),
        isActive: true,
      },
    });
    res.status(200).json(habits);
  })
);

router.delete(
  "/:studyId/:id",
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const today = new Date();
    await prisma.habit.update({
      where: {
        id: parseInt(id),
      },
      data: {
        isActive: false,
        endDate: today,
      },
    });
    res.status(204).send();
  })
);

export default router;
