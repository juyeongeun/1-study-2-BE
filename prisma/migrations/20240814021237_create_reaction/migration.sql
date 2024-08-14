-- CreateTable
CREATE TABLE "Reaction" (
    "id" SERIAL NOT NULL,
    "studyId" INTEGER NOT NULL,
    "Emoji" TEXT NOT NULL,
    "count" INTEGER NOT NULL,
    "careateAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Reaction_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Reaction" ADD CONSTRAINT "Reaction_studyId_fkey" FOREIGN KEY ("studyId") REFERENCES "Study"("id") ON DELETE CASCADE ON UPDATE CASCADE;
