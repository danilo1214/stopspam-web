/*
  Warnings:

  - You are about to drop the column `businessType` on the `InstagramPage` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `InstagramPage` DROP COLUMN `businessType`,
    ADD COLUMN `subType` VARCHAR(191) NULL,
    ADD COLUMN `type` ENUM('CREATOR', 'BUSINESS') NOT NULL DEFAULT 'BUSINESS';
