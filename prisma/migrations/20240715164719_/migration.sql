/*
  Warnings:

  - You are about to drop the column `facebookAccountId` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[instagramId]` on the table `FacebookAccount` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `User` DROP FOREIGN KEY `User_facebookAccountId_fkey`;

-- DropIndex
DROP INDEX `FacebookAccount_userId_key` ON `FacebookAccount`;

-- AlterTable
ALTER TABLE `FacebookAccount` ADD COLUMN `provider` VARCHAR(191) NOT NULL DEFAULT 'facebook';

-- AlterTable
ALTER TABLE `User` DROP COLUMN `facebookAccountId`;

-- CreateIndex
CREATE UNIQUE INDEX `FacebookAccount_instagramId_key` ON `FacebookAccount`(`instagramId`);

-- AddForeignKey
ALTER TABLE `FacebookAccount` ADD CONSTRAINT `FacebookAccount_provider_instagramId_fkey` FOREIGN KEY (`provider`, `instagramId`) REFERENCES `Account`(`provider`, `providerAccountId`) ON DELETE RESTRICT ON UPDATE CASCADE;
