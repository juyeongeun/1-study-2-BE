import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const setPoint = async (req, res) => {
  const id = parseInt(req.params.studyId);
  const point = parseInt(req.body.point);

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
      return res.status(201).send(updateStudy);
    });
  } catch (e) {
    console.log(e);
    return res.status(500).send("server error!");
  }
};
