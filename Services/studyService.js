import { PrismaClient } from '@prisma/client';
import asyncHandler from '../Common/asyncHandler.js';

const prisma = new PrismaClient();

// 스터디 추가하기
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

// 스터디 조회하기
export const getStudies = asyncHandler(async (req, res) => {
  const { orderBy = 'recent', keyword, offset = 0, limit = 6 } = req.query;

  // 정렬 기준 설정

  let orderByClause;
  switch (orderBy) {
    case 'recent':
      orderByClause = { createdAt: 'desc' };
      break;
    case 'old':
      orderByClause = { createdAt: 'asc' };
      break;
    case 'highestPoints':
      orderByClause = { point: 'desc' };
      break;
    case 'lowestPoints':
      orderByClause = { point: 'asc' };
      break;
  }

  // 검색 조건 설정
  const where = keyword
    ? {
        OR: [
          { name: { contains: keyword, mode: 'insensitive' } },
          { studyName: { contains: keyword, mode: 'insensitive' } },
          { content: { contains: keyword, mode: 'insensitive' } },
        ],
      }
    : {};

  const totalCount = await prisma.study.count({ where });

  console.log(orderBy);
  const study = await prisma.study.findMany({
    where,
    orderBy: orderByClause,
    skip: parseInt(offset, 10),
    take: parseInt(limit, 10),
    include: {
      reaction: true,
    },
  });
  console.log('Fetched studies:', study);
  res.status(200).json({ study, totalCount });
});

// 스터디 상세 조회하기
export const getStudyById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const study = await prisma.study.findUnique({
    where: { id: parseInt(id) },
  });
  if (!study) return res.status(404).json({ error: 'study not found' });
  res.status(200).json(study);
});

// 스터디 수정하기
export const updateStudy = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, studyName, content, background, password } = req.body;
  const study = await prisma.study.update({
    where: { id: parseInt(id) },
    data: { name, studyName, content, background, password },
  });
  if (!study) return res.status(404).json({ error: 'study not found' });
  res.status(200).json(study);
});

// 스터디 삭제하기
export const deleteStudy = asyncHandler(async (req, res) => {
  const { id } = req.params;
  await prisma.study.delete({
    where: { id: parseInt(id) },
  });
  res.status(204).send();
});
