CREATE TABLE `users`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(100) NOT NULL,
    `email` VARCHAR(50) NOT NULL,
    `password` VARCHAR(100) NOT NULL,
    `phone` VARCHAR(20) NOT NULL,
    `address` TEXT NOT NULL,
    `created_at` DATETIME NOT NULL,
    `updated_at` DATETIME,
    `deleted_at` DATETIME
);
CREATE TABLE `admins`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `email` VARCHAR(50) NOT NULL,
    `name` VARCHAR(100) NOT NULL,
    `password` VARCHAR(100) NOT NULL,
    `created_at` DATETIME NOT NULL,
    `updated_at` DATETIME,
    `deleted_at` DATETIME
);
CREATE TABLE `poly`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(100) NOT NULL,
    `is_open` TINYINT(1) NOT NULL DEFAULT 1,
    `created_at` DATETIME NOT NULL,
    `updated_at` DATETIME,
    `deleted_at` DATETIME
);
CREATE TABLE `queues`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `user_id` INT NOT NULL,
    `poli_id` INT NOT NULL,
    `name` VARCHAR(100) NOT NULL,
    `phone` VARCHAR(20) NOT NULL,
    `address` TEXT NOT NULL,
    `number` INT NOT NULL,
    `status` ENUM('Menunggu', 'Selesai', 'Tiba', 'Pemeriksaan') NOT NULL DEFAULT 'Menunggu',
    `complaint` TEXT NOT NULL,
    `created_at` DATETIME NOT NULL,
    `started_at` DATETIME,
    `updated_at` DATETIME,
    `deleted_at` DATETIME
);