/*
  Warnings:

  - Added the required column `country_code` to the `Friend` table without a default value. This is not possible if the table is not empty.
  - Added the required column `notes` to the `Friend` table without a default value. This is not possible if the table is not empty.
  - Added the required column `timezone` to the `Friend` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Friend" ADD COLUMN     "country_code" TEXT NOT NULL,
ADD COLUMN     "notes" TEXT NOT NULL,
ADD COLUMN     "tags" TEXT[],
ADD COLUMN     "timezone" TEXT NOT NULL;
