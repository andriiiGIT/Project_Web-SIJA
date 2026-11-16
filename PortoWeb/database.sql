-- ========================================================
-- SKRIP DATABASE MYSQL: personalweb_db
-- ========================================================
-- Cara Import:
-- 1. Buka phpMyAdmin (http://localhost/phpmyadmin)
-- 2. Masuk ke tab "SQL"
-- 3. Salin & tempel seluruh perintah di bawah ini, lalu klik "Go" / "Kirim"
-- ========================================================

CREATE DATABASE IF NOT EXISTS personalweb_db
CHARACTER SET utf8mb4 
COLLATE utf8mb4_unicode_ci;

USE personalweb_db;

CREATE TABLE IF NOT EXISTS tamu (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nama VARCHAR(150) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    total_login INT NOT NULL DEFAULT 1,
    waktu_pertama DATETIME NOT NULL,
    waktu_terakhir DATETIME NOT NULL,
    ip_address VARCHAR(45) DEFAULT NULL,
    INDEX idx_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
