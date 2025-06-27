-- CreateTable
CREATE TABLE `Faculty` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Major` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `faculty_id` INTEGER NOT NULL,
    `name` VARCHAR(191) NOT NULL,

    INDEX `Major_faculty_id_idx`(`faculty_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Student` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `student_id` VARCHAR(191) NOT NULL,
    `username` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `title_th` BOOLEAN NOT NULL,
    `firstname_th` VARCHAR(191) NOT NULL,
    `lastname_th` VARCHAR(191) NOT NULL,
    `faculties_id` INTEGER NOT NULL,
    `majors_id` INTEGER NOT NULL,
    `certificate` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `actives` BOOLEAN NOT NULL,

    UNIQUE INDEX `Student_student_id_key`(`student_id`),
    INDEX `Student_faculties_id_idx`(`faculties_id`),
    INDEX `Student_majors_id_idx`(`majors_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Major` ADD CONSTRAINT `Major_faculty_id_fkey` FOREIGN KEY (`faculty_id`) REFERENCES `Faculty`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Student` ADD CONSTRAINT `Student_faculties_id_fkey` FOREIGN KEY (`faculties_id`) REFERENCES `Faculty`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Student` ADD CONSTRAINT `Student_majors_id_fkey` FOREIGN KEY (`majors_id`) REFERENCES `Major`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
