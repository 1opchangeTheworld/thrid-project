-- CreateTable
CREATE TABLE `subjects` (
    `id` VARCHAR(191) NOT NULL,
    `facultiesId` INTEGER NOT NULL,
    `subId` VARCHAR(15) NOT NULL,
    `subName` VARCHAR(45) NOT NULL,
    `subUnit` DOUBLE NOT NULL,
    `subGroup` BOOLEAN NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SubjectStudent` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `subject_id` VARCHAR(191) NOT NULL,
    `student_id` INTEGER NOT NULL,
    `score` DOUBLE NULL,
    `grade` VARCHAR(191) NULL,
    `status` VARCHAR(191) NULL,

    INDEX `SubjectStudent_subject_id_idx`(`subject_id`),
    INDEX `SubjectStudent_student_id_idx`(`student_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `subjects` ADD CONSTRAINT `subjects_facultiesId_fkey` FOREIGN KEY (`facultiesId`) REFERENCES `Faculty`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SubjectStudent` ADD CONSTRAINT `SubjectStudent_subject_id_fkey` FOREIGN KEY (`subject_id`) REFERENCES `subjects`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SubjectStudent` ADD CONSTRAINT `SubjectStudent_student_id_fkey` FOREIGN KEY (`student_id`) REFERENCES `Student`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
