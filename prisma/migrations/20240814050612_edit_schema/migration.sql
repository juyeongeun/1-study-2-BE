/*
  Warnings:

  - Added the required column `studyId` to the `CompleteHabit` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CompleteHabit" ADD COLUMN     "studyId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "CompleteHabit" ADD CONSTRAINT "CompleteHabit_studyId_fkey" FOREIGN KEY ("studyId") REFERENCES "Study"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
