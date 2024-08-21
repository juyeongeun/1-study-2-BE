import { PrismaClient } from "@prisma/client";
import asyncHandler from "../Common/asyncHandler.js";

const prisma = new PrismaClient();

export const createStudy = asyncHandler(async (req, res) => {
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
});

export const getStudies = asyncHandler(async (req, res) => {
  const { cursor, sortBy, sortOrder, keyword } = req.query;

  let orderBy = {};
  if (sortBy) {
    orderBy[sortBy] = sortOrder === "asc" ? "asc" : "desc";
  } else {
    orderBy = { createdAt: "desc" };
  }

  const where = keyword
    ? {
        OR: [
          { name: { contains: keyword, mode: "insensitive" } },
          { studyName: { contains: keyword, mode: "insensitive" } },
          { content: { contains: keyword, mode: "insensitive" } },
        ],
      }
    : {};

  const studies = await prisma.study.findMany({
    where,
    orderBy,
    skip: cursor ? 1 : 0,
    take: 6,
    cursor: cursor ? { id: parseInt(cursor) } : undefined,
  });

  res.status(200).json(studies);
});

export const getStudyById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const study = await prisma.study.findUnique({
    where: { id: parseInt(id) },
  });
  if (!study) return res.status(404).json({ error: "study not found" });
  res.status(200).json(study);
});

export const updateStudy = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, studyName, content, background, password } = req.body;
  const study = await prisma.study.update({
    where: { id: parseInt(id) },
    data: { name, studyName, content, background, password },
  });
  if (!study) return res.status(404).json({ error: "study not found" });
  res.status(200).json(study);
});

export const deleteStudy = asyncHandler(async (req, res) => {
  const { id } = req.params;
  await prisma.study.delete({
    where: { id: parseInt(id) },
  });
  res.status(204).send();
});
