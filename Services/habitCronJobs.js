import { schedule } from "node-cron";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const clearInactiveHabits = async () => {
  try {
    const deletedCompleteHabits = await prisma.completeHabit.deleteMany({});
    console.log(
      `${deletedCompleteHabits.count} complete habits older than one week were deleted.`
    );

    const deletedHabits = await prisma.habit.deleteMany({
      where: {
        endDate: {
          not: null,
        },
        isActive: true,
      },
    });
    console.log(
      `${deletedHabits.count} habits with endDate set and isActive=true were deleted.`
    );
  } catch (error) {
    console.error("Error during cron job:", error);
  }
};

// 매주 월요일 자정에 실행
schedule("0 0 * * 1", () => {
  clearInactiveHabits();
});
