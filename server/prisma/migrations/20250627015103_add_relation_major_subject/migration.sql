-- AlterTable
ALTER TABLE `Subject` ADD COLUMN `majorId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Subject` ADD CONSTRAINT `Subject_majorId_fkey` FOREIGN KEY (`majorId`) REFERENCES `Major`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
