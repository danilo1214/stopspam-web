/*
  Warnings:

  - You are about to drop the column `long_lived_token` on the `Account` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Account` DROP COLUMN `long_lived_token`;

-- CreateTable
CREATE TABLE `InstagramAccount` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `instagramId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `long_lived_token` TEXT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
