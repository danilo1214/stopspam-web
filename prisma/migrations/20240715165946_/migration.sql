/*
  Warnings:

  - You are about to drop the `FacebookAccount` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `FacebookAccount` DROP FOREIGN KEY `FacebookAccount_provider_instagramId_fkey`;

-- AlterTable
ALTER TABLE `User` ADD COLUMN `instagramAccountId` INTEGER NULL;

-- DropTable
DROP TABLE `FacebookAccount`;

-- CreateTable
CREATE TABLE `InstagramAccount` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `instagramId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `userId` VARCHAR(191) NOT NULL DEFAULT '',
    `long_lived_token` TEXT NULL,

    UNIQUE INDEX `InstagramAccount_userId_key`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_instagramAccountId_fkey` FOREIGN KEY (`instagramAccountId`) REFERENCES `InstagramAccount`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
