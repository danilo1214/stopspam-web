/*
  Warnings:

  - Added the required column `variantId` to the `Subscription` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Subscription` ADD COLUMN `variantId` VARCHAR(191) NOT NULL;