/*
  Warnings:

  - You are about to drop the column `instagramAccountId` on the `InstagramPage` table. All the data in the column will be lost.
  - You are about to drop the column `instagramAccountId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `InstagramAccount` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `facebookAccountId` to the `InstagramPage` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `InstagramPage` DROP FOREIGN KEY `InstagramPage_instagramAccountId_fkey`;

-- DropForeignKey
ALTER TABLE `Post` DROP FOREIGN KEY `Post_createdById_fkey`;

-- DropForeignKey
ALTER TABLE `User` DROP FOREIGN KEY `User_instagramAccountId_fkey`;

-- AlterTable
ALTER TABLE `InstagramPage` RENAME COLUMN `instagramAccountId` TO `facebookAccountId`;

-- AlterTable
ALTER TABLE `User` DROP COLUMN `instagramAccountId`;

-- DropTable
DROP TABLE `InstagramAccount`;

-- DropTable
DROP TABLE `Post`;

-- CreateTable
CREATE TABLE `FacebookAccount` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `instagramId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `long_lived_token` TEXT NULL,

    UNIQUE INDEX `FacebookAccount_instagramId_key`(`instagramId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
