<?php
/**
 * ============================================================================
 * KONEKSI DATABASE MYSQL (PDO)
 * ============================================================================
 * Menghubungkan aplikasi ke database MySQL "personalweb_db".
 * Konfigurasi standar untuk lingkungan lokal (XAMPP / Laragon / WampServer).
 */

$host     = 'localhost';
$username = 'root';
$password = ''; // Kosongkan untuk default XAMPP/Laragon
$database = 'personalweb_db';

try {
    // 1. Koneksi awal ke server MySQL (memastikan database dibuat otomatis jika belum ada)
    $pdoInit = new PDO("mysql:host=$host;charset=utf8mb4", $username, $password, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
    ]);
    
    // Buat database otomatis jika belum ada
    $pdoInit->exec("CREATE DATABASE IF NOT EXISTS `$database` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci");

    // 2. Koneksi langsung ke database personalweb_db
    $pdo = new PDO("mysql:host=$host;dbname=$database;charset=utf8mb4", $username, $password, [
        PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES   => false
    ]);

    // 3. Buat tabel 'tamu' secara otomatis jika belum ada
    $createTableQuery = "
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
    ";
    $pdo->exec($createTableQuery);

} catch (PDOException $e) {
    // Jika koneksi gagal, kembalikan respons error yang informatif
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Gagal terhubung ke MySQL: ' . $e->getMessage()
    ]);
    exit;
}
