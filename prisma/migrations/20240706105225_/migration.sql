-- DropForeignKey
ALTER TABLE `InstagramAccount` DROP FOREIGN KEY `InstagramAccount_userId_fkey`;

-- AlterTable
ALTER TABLE `User` ADD COLUMN `instagramAccountId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_instagramAccountId_fkey` FOREIGN KEY (`instagramAccountId`) REFERENCES `InstagramAccount`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
