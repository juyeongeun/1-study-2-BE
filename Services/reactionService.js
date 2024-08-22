import { PrismaClient } from "@prisma/client";
import asyncHandler from "../Common/asyncHandler.js";

const prisma = new PrismaClient();

// 이모지 추가하기
export const createReaction = asyncHandler(async (req, res) => {
  const { emoji } = req.body;
  const { studyId } = req.params;

  const reaction = await prisma.reaction.findFirst({
    where: {
      studyId: parseInt(studyId),
      emoji: emoji,
    },
  });

  if (reaction) {
    const updateCount = await prisma.reaction.update({
      where: { id: reaction.id },
      data: { count: reaction.count + 1 },
    });
    res.status(200).json(updateCount);
  } else {
    const newReaction = await prisma.reaction.create({
      data: {
        studyId: parseInt(studyId),
        emoji: emoji,
        count: 1,
      },
    });
    res.status(201).json(newReaction);
  }
});

// 이모지 조회하기
export const getReactions = asyncHandler(async (req, res) => {
  const { studyId } = req.params;

  const reaction = await prisma.reaction.findMany({
    where: { studyId: parseInt(studyId) },
  });

  if (!reaction) {
    return res.status(404).json({ error: "Reaction not found" });
  }

  res.status(200).json(reaction);
});
