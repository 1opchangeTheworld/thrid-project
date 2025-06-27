-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `firstname` VARCHAR(191) NOT NULL,
    `lastname` VARCHAR(191) NOT NULL,
    `telephone` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `faculties_id` INTEGER NULL,
    `majors_id` INTEGER NULL,
    `profile_img` VARCHAR(191) NOT NULL,
    `role` BOOLEAN NOT NULL,
    `actives` BOOLEAN NOT NULL,

    INDEX `User_faculties_id_idx`(`faculties_id`),
    INDEX `User_majors_id_idx`(`majors_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_faculties_id_fkey` FOREIGN KEY (`faculties_id`) REFERENCES `Faculty`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_majors_id_fkey` FOREIGN KEY (`majors_id`) REFERENCES `Major`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
