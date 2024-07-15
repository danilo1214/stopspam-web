/*
  Warnings:

  - Added the required column `instagramAccountId` to the `InstagramPage` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `InstagramPage` ADD COLUMN `instagramAccountId` INTEGER NOT NULL,
    MODIFY `instagramId` VARCHAR(191) NOT NULL DEFAULT '';

-- AddForeignKey
ALTER TABLE `InstagramPage` ADD CONSTRAINT `InstagramPage_instagramAccountId_fkey` FOREIGN KEY (`instagramAccountId`) REFERENCES `InstagramAccount`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
