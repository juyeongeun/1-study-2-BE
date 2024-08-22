import { PrismaClient } from "@prisma/client";
import asyncHandler from "../Common/asyncHandler.js";

const prisma = new PrismaClient();

export const getCompleteHabits = asyncHandler(async (req, res) => {
  const { studyId } = req.params;
  const habit = await prisma.completeHabit.findMany({
    where: { studyId: parseInt(studyId) },
  });
  res.status(200).json(habit);
});

export const createCompleteHabit = asyncHandler(async (req, res) => {
  const { habitId, studyId } = req.params;
  const completeHabit = await prisma.completeHabit.create({
    data: {
      habitId: parseInt(habitId),
      studyId: parseInt(studyId),
    },
  });
  res.status(201).json(completeHabit);
});
