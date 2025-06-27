/*
  Warnings:

  - Added the required column `semester_id` to the `SubjectStudent` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `SubjectStudent` ADD COLUMN `semester_id` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `Semester` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `year` INTEGER NOT NULL,
    `term` INTEGER NOT NULL,
    `startDate` DATETIME(3) NOT NULL,
    `endDate` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Enrollment` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `student_id` INTEGER NOT NULL,
    `faculty_id` INTEGER NOT NULL,
    `major_id` INTEGER NOT NULL,
    `semester_id` INTEGER NOT NULL,

    INDEX `Enrollment_student_id_idx`(`student_id`),
    INDEX `Enrollment_faculty_id_idx`(`faculty_id`),
    INDEX `Enrollment_major_id_idx`(`major_id`),
    INDEX `Enrollment_semester_id_idx`(`semester_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE INDEX `SubjectStudent_semester_id_idx` ON `SubjectStudent`(`semester_id`);

-- AddForeignKey
ALTER TABLE `SubjectStudent` ADD CONSTRAINT `SubjectStudent_semester_id_fkey` FOREIGN KEY (`semester_id`) REFERENCES `Semester`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Enrollment` ADD CONSTRAINT `Enrollment_student_id_fkey` FOREIGN KEY (`student_id`) REFERENCES `Student`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Enrollment` ADD CONSTRAINT `Enrollment_faculty_id_fkey` FOREIGN KEY (`faculty_id`) REFERENCES `Faculty`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Enrollment` ADD CONSTRAINT `Enrollment_major_id_fkey` FOREIGN KEY (`major_id`) REFERENCES `Major`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Enrollment` ADD CONSTRAINT `Enrollment_semester_id_fkey` FOREIGN KEY (`semester_id`) REFERENCES `Semester`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
