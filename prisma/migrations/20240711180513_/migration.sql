-- CreateTable
CREATE TABLE `InstagramPage` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `instagramId` VARCHAR(191) NOT NULL,
    `profilePictureUrl` VARCHAR(191) NOT NULL,
    `followers` INTEGER NOT NULL,
    `biography` TEXT NOT NULL,
    `username` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `userId` VARCHAR(191) NOT NULL DEFAULT '',

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `InstagramPage` ADD CONSTRAINT `InstagramPage_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
