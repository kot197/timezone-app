/*
  Warnings:

  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `discord_avatar` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `discord_email` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `discord_id` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `discord_username` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `discord_verified` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[discordId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Friend" DROP CONSTRAINT "Friend_userId_fkey";

-- DropForeignKey
ALTER TABLE "Session" DROP CONSTRAINT "Session_userId_fkey";

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
DROP COLUMN "discord_avatar",
DROP COLUMN "discord_email",
DROP COLUMN "discord_id",
DROP COLUMN "discord_username",
DROP COLUMN "discord_verified",
ADD COLUMN     "discordAvatar" TEXT,
ADD COLUMN     "discordEmail" TEXT,
ADD COLUMN     "discordId" TEXT,
ADD COLUMN     "discordUsername" TEXT,
ADD COLUMN     "discordVerified" BOOLEAN,
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "id" TEXT NOT NULL,
ALTER COLUMN "discriminator" DROP NOT NULL,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_discordId_key" ON "User"("discordId");

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("discordId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Friend" ADD CONSTRAINT "Friend_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("discordId") ON DELETE CASCADE ON UPDATE CASCADE;
