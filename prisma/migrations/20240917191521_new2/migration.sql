/*
  Warnings:

  - Added the required column `discord_avatar` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `discord_email` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `discord_id` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `discord_username` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `discord_verified` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `discriminator` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "discord_avatar" TEXT NOT NULL,
ADD COLUMN     "discord_email" TEXT NOT NULL,
ADD COLUMN     "discord_id" TEXT NOT NULL,
ADD COLUMN     "discord_username" TEXT NOT NULL,
ADD COLUMN     "discord_verified" TEXT NOT NULL,
ADD COLUMN     "discriminator" TEXT NOT NULL;
