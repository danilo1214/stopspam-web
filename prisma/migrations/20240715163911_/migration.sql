/*
  Warnings:

  - You are about to drop the column `instagramAccountId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `InstagramAccount` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `User` DROP FOREIGN KEY `User_instagramAccountId_fkey`;

-- AlterTable
ALTER TABLE `User` DROP COLUMN `instagramAccountId`,
    ADD COLUMN `facebookAccountId` INTEGER NULL;

-- DropTable
DROP TABLE `InstagramAccount`;

-- CreateTable
CREATE TABLE `FacebookAccount` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `instagramId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `userId` VARCHAR(191) NOT NULL DEFAULT '',
    `long_lived_token` TEXT NULL,

    UNIQUE INDEX `FacebookAccount_userId_key`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_facebookAccountId_fkey` FOREIGN KEY (`facebookAccountId`) REFERENCES `FacebookAccount`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
