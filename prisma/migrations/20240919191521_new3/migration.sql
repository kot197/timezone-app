-- CreateTable
CREATE TABLE "Friend" (
    "id" SERIAL NOT NULL,
    "country" TEXT NOT NULL,
    "location" TEXT NOT NULL,

    CONSTRAINT "Friend_pkey" PRIMARY KEY ("id")
);
