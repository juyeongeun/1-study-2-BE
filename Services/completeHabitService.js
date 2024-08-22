import { PrismaClient } from "@prisma/client";
import asyncHandler from "../Common/asyncHandler.js";

const prisma = new PrismaClient();

//studyId에 해당하는 완료된 모든 습관
export const getCompleteHabits = asyncHandler(async (req, res) => {
  const { studyId } = req.params;
  const habit = await prisma.completeHabit.findMany({
    where: { studyId: parseInt(studyId) },
  });
  res.status(200).json(habit);
});

//완료된 습관 만들기
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

