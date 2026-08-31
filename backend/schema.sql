-- ==========================================================
-- Pink Pages & Amaleeni Womenpreneurs Database Schema
-- Run this in Hostinger phpMyAdmin (MySQL / MariaDB)
-- ==========================================================

CREATE TABLE IF NOT EXISTS `users` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `full_name` VARCHAR(150) NOT NULL,
  `email` VARCHAR(191) NOT NULL UNIQUE,
  `password_hash` VARCHAR(255) NOT NULL,
  `phone` VARCHAR(30) NOT NULL,
  `role` VARCHAR(50) DEFAULT 'member',
  `status` ENUM('active', 'inactive', 'suspended') DEFAULT 'active',
  `last_login` DATETIME NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_email (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `pink_pages_profiles` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `user_id` INT NOT NULL UNIQUE,
  `ref_id` VARCHAR(50) NOT NULL UNIQUE,
  `org_name` VARCHAR(200) NOT NULL,
  `category` VARCHAR(100) NOT NULL,
  `sector` VARCHAR(120) NOT NULL,
  `city` VARCHAR(100) NOT NULL,
  `state_country` VARCHAR(100) NOT NULL,
  `website_url` VARCHAR(255) NULL,
  `seeking` TEXT NULL,
  `business_description` TEXT NULL,
  `payment_status` ENUM('PENDING', 'PAID', 'FAILED', 'REFUNDED') DEFAULT 'PENDING',
  `payment_amount` DECIMAL(10,2) DEFAULT 5000.00,
  `razorpay_order_id` VARCHAR(100) NULL,
  `razorpay_payment_id` VARCHAR(100) NULL,
  `paid_at` DATETIME NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE,
  INDEX idx_ref_id (`ref_id`),
  INDEX idx_payment_status (`payment_status`),
  INDEX idx_sector (`sector`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `orders` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `user_id` INT NOT NULL,
  `razorpay_order_id` VARCHAR(100) NOT NULL UNIQUE,
  `amount` INT NOT NULL, -- in paise (500000 = Rs 5000)
  `currency` VARCHAR(10) DEFAULT 'INR',
  `status` ENUM('created', 'attempted', 'paid') DEFAULT 'created',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `login_attempts` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `ip_address` VARCHAR(45) NOT NULL,
  `email` VARCHAR(191) NOT NULL,
  `attempt_time` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_ip_time (`ip_address`, `attempt_time`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
