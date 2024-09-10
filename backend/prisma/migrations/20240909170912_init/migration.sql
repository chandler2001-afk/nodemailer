-- CreateTable
CREATE TABLE "name" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "name_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "mails" (
    "id" SERIAL NOT NULL,
    "mail" TEXT NOT NULL,

    CONSTRAINT "mails_pkey" PRIMARY KEY ("id")
);
