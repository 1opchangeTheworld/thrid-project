/*
  Warnings:

  - You are about to drop the `subjects` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `SubjectStudent` DROP FOREIGN KEY `SubjectStudent_subject_id_fkey`;

-- DropForeignKey
ALTER TABLE `subjects` DROP FOREIGN KEY `subjects_facultiesId_fkey`;

-- DropTable
DROP TABLE `subjects`;

-- CreateTable
CREATE TABLE `Subject` (
    `id` VARCHAR(191) NOT NULL,
    `facultiesId` INTEGER NOT NULL,
    `subId` VARCHAR(15) NOT NULL,
    `subName` VARCHAR(45) NOT NULL,
    `subUnit` DOUBLE NOT NULL,
    `subGroup` BOOLEAN NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Subject` ADD CONSTRAINT `Subject_facultiesId_fkey` FOREIGN KEY (`facultiesId`) REFERENCES `Faculty`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SubjectStudent` ADD CONSTRAINT `SubjectStudent_subject_id_fkey` FOREIGN KEY (`subject_id`) REFERENCES `Subject`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
