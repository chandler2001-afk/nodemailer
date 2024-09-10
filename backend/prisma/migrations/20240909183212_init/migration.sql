/*
  Warnings:

  - You are about to drop the `mails` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `name` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "mails";

-- DropTable
DROP TABLE "name";

-- CreateTable
CREATE TABLE "details" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "mail" TEXT NOT NULL,

    CONSTRAINT "details_pkey" PRIMARY KEY ("id")
);
