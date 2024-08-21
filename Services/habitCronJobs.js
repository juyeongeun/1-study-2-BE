import { schedule } from "node-cron";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const clearInactiveHabits = async () => {
  try {
    // 1. 일주일이 지난 completeHabit 데이터 삭제
    const deletedCompleteHabits = await prisma.completeHabit.deleteMany({});
    console.log(
      `${deletedCompleteHabits.count} complete habits older than one week were deleted.`
    );

    // 2. 일주일이 지난 habit 데이터 삭제
    const deletedHabits = await prisma.habit.deleteMany({
      where: {
        endDate: {
          not: null, // endDate가 null이 아닌 경우
        },
        isActive: true, // isActive가 true인 경우
      },
    });
    console.log(
      `${deletedHabits.count} habits with endDate set and isActive=true were deleted.`
    );
  } catch (error) {
    console.error("Error during cron job:", error);
  }
};

// 크론 작업: 매주 월요일 자정에 실행
schedule("10 11 * * 3", () => {
  clearInactiveHabits();
});
