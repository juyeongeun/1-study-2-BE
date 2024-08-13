/*
  Warnings:

  - Added the required column `background` to the `Study` table without a default value. This is not possible if the table is not empty.
  - Added the required column `content` to the `Study` table without a default value. This is not possible if the table is not empty.
  - Added the required column `studyName` to the `Study` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Study" ADD COLUMN     "background" TEXT NOT NULL,
ADD COLUMN     "content" TEXT NOT NULL,
ADD COLUMN     "studyName" TEXT NOT NULL;
