/*
  Warnings:

  - Added the required column `productId` to the `Subscription` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Subscription` ADD COLUMN `productId` VARCHAR(191) NOT NULL;
