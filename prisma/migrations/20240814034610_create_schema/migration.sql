-- CreateTable
CREATE TABLE "CompleteHabit" (
    "id" SERIAL NOT NULL,
    "habitId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CompleteHabit_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CompleteHabit" ADD CONSTRAINT "CompleteHabit_habitId_fkey" FOREIGN KEY ("habitId") REFERENCES "Habit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
