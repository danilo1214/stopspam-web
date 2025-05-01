-- CreateTable
CREATE TABLE `DemoReply` (
    `id` VARCHAR(191) NOT NULL,
    `instagramPageId` INTEGER NOT NULL,
    `commentText` VARCHAR(191) NOT NULL,
    `replyText` VARCHAR(191) NOT NULL,
    `mediaId` VARCHAR(191) NOT NULL,
    `mediaText` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `DemoReply` ADD CONSTRAINT `DemoReply_instagramPageId_fkey` FOREIGN KEY (`instagramPageId`) REFERENCES `InstagramPage`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
