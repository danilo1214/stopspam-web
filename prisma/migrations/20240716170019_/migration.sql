-- DropIndex
DROP INDEX `InstagramPage_instagramAccountId_fkey` ON `InstagramPage`;

-- AddForeignKey
ALTER TABLE `InstagramPage` ADD CONSTRAINT `InstagramPage_facebookAccountId_fkey` FOREIGN KEY (`facebookAccountId`) REFERENCES `FacebookAccount`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
