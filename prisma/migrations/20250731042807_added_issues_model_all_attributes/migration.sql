/*
  Warnings:

  - You are about to drop the column `name` on the `issue` table. All the data in the column will be lost.
  - Added the required column `description` to the `Issue` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Issue` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Issue` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `issue` DROP COLUMN `name`,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `description` TEXT NOT NULL,
    ADD COLUMN `status` ENUM('OPEN', 'IN_PROGRESS', 'CLOSED') NOT NULL DEFAULT 'OPEN',
    ADD COLUMN `title` VARCHAR(255) NOT NULL,
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;
