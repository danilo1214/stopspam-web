-- DropForeignKey
ALTER TABLE `InstagramPage` DROP FOREIGN KEY `InstagramPage_facebookAccountId_fkey`;

-- AddForeignKey
ALTER TABLE `InstagramPage` ADD CONSTRAINT `InstagramPage_facebookAccountId_fkey` FOREIGN KEY (`facebookAccountId`) REFERENCES `FacebookAccount`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
