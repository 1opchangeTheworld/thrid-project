/*
  Warnings:

  - You are about to alter the column `title_th` on the `Student` table. The data in that column could be lost. The data in that column will be cast from `TinyInt` to `VarChar(191)`.

*/
-- AlterTable
ALTER TABLE `Student` MODIFY `title_th` VARCHAR(191) NOT NULL;
