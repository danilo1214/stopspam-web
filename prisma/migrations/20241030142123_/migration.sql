/*
  Warnings:

  - A unique constraint covering the columns `[providerAccountId]` on the table `Account` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Account_providerAccountId_key` ON `Account`(`providerAccountId`);

-- AddForeignKey
ALTER TABLE `FacebookAccount` ADD CONSTRAINT `FacebookAccount_instagramId_fkey` FOREIGN KEY (`instagramId`) REFERENCES `Account`(`providerAccountId`) ON DELETE RESTRICT ON UPDATE CASCADE;
