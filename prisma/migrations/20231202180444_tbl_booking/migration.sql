-- CreateTable
CREATE TABLE `tbl_booking` (
    `id_hotel` INTEGER NOT NULL AUTO_INCREMENT,
    `checkindate` VARCHAR(191) NOT NULL,
    `checkoutdate` VARCHAR(191) NOT NULL,
    `roomtype` VARCHAR(191) NOT NULL,
    `guests` INTEGER NOT NULL,

    PRIMARY KEY (`id_hotel`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
