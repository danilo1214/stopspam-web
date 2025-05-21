/*
  Warnings:

  - Added the required column `mediaUrl` to the `DemoReply` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `DemoReply` ADD COLUMN `mediaUrl` VARCHAR(191) NOT NULL;
