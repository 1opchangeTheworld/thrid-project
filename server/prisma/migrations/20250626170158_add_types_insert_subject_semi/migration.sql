-- CreateTable
CREATE TABLE `SemesterSubject` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `semesterId` INTEGER NOT NULL,
    `subjectId` VARCHAR(191) NOT NULL,

    INDEX `SemesterSubject_semesterId_idx`(`semesterId`),
    INDEX `SemesterSubject_subjectId_idx`(`subjectId`),
    UNIQUE INDEX `SemesterSubject_semesterId_subjectId_key`(`semesterId`, `subjectId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `SemesterSubject` ADD CONSTRAINT `SemesterSubject_semesterId_fkey` FOREIGN KEY (`semesterId`) REFERENCES `Semester`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SemesterSubject` ADD CONSTRAINT `SemesterSubject_subjectId_fkey` FOREIGN KEY (`subjectId`) REFERENCES `Subject`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
