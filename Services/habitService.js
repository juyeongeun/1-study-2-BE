import { PrismaClient } from "@prisma/client";
import asyncHandler from "../Common/asyncHandler.js";

const prisma = new PrismaClient();

// 습관 추가하기
export const createHabit = asyncHandler(async (req, res) => {
  const { habitName } = req.body;
  const { studyId } = req.params;
  const habit = await prisma.habit.create({
    data: {
      habitName,
      studyId: parseInt(studyId),
    },
  });
  res.status(201).json(habit);
});

// 습관명 수정하기
export const updateHabit = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { habitName } = req.body;
  const habit = await prisma.habit.updateMany({
    where: {
      id: parseInt(id),
    },
    data: {
      habitName: habitName,
    },
  });
  res.status(200).json(habit);
});

// 습관 조회하기
export const getHabits = asyncHandler(async (req, res) => {
  const { studyId } = req.params;
  const habits = await prisma.habit.findMany({
    where: {
      studyId: parseInt(studyId),
    },
  });
  res.status(200).json(habits);
});

// 습관 삭제하기
export const deleteHabit = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const today = new Date();
  await prisma.habit.update({
    where: {
      id: parseInt(id),
    },
    data: {
      endDate: today,
    },
  });
  res.status(204).send();
});
