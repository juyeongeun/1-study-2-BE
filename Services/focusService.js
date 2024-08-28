import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const setPoint = async (req, res) => {
  const { studyId: id } = req.params;
  const { point } = req.body;

  try {
    await prisma.$transaction(async (prisma) => {
      const currentStudy = await prisma.study.findUnique({
        where: { id },
      });
      const updateStudy = await prisma.study.update({
        where: { id },
        data: {
          name: currentStudy.name,
          studyName: currentStudy.studyName,
          content: currentStudy.content,
          background: currentStudy.background,
          password: currentStudy.password,
          point,
        },
      });
      if (currentStudy & updateStudy) {
        return res.status(201).send("ok");
      } else {
        return res.status(304).send("fail:(");
      }
    });
  } catch (e) {
    return res.status(e.response.status).send(e.response.message);
  }
};
