import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // data 초기화
  await prisma.study.deleteMany({});

  // 게시글 1
  const study1 = await prisma.study.create({
    data: {
      name: "영은",
      studyName: "코딩 테스트 스터디",
      content: "언어 : 파이썬",
      background: "../image/background1.svg",
      password: "1234",
      point: 35,
    },
  });

  const study2 = await prisma.study.create({
    data: {
      name: "효인",
      studyName: "GitHub 스터디",
      content: "github 협업에 관한 스터디",
      background: "../image/background1.svg",
      password: "12345",
      point: 36,
    },
  });

  const study3 = await prisma.study.create({
    data: {
      name: "범준",
      studyName: "React 스터디",
      content: "React 기초부터 마스터까지!",
      background: "../image/background1.svg",
      password: "2345",
      point: 35,
    },
  });

  const study4 = await prisma.study.create({
    data: {
      name: "대건",
      studyName: "Backend의 모든 것",
      content: "언어 : 파이썬, 자바",
      background: "../image/background1.svg",
      password: "3456",
      point: 36,
    },
  });

  const reaction1 = await prisma.reaction.create({
    data: {
      studyId: study1.id,
      emoji: "smile",
    },
  });
  const reaction2 = await prisma.reaction.create({
    data: {
      studyId: study1.id,
      emoji: "smile",
    },
  });
  const reaction3 = await prisma.reaction.create({
    data: {
      studyId: study1.id,
      emoji: "Good",
    },
  });
  const reaction4 = await prisma.reaction.create({
    data: {
      studyId: study2.id,
      emoji: "smile",
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
