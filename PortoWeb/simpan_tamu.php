<?php
/**
 * ============================================================================
 * ENDPOINT API: SIMPAN TAMU (simpan_tamu.php)
 * ============================================================================
 * Menerima data nama dan email dari form login gerbang masuk.
 * Menghindari duplikasi akun: akun dengan email yang sama tidak akan tercatat
 * dua kali, melainkan riwayat login (jumlah login & waktu terakhir) diperbarui.
 */

header('Content-Type: application/json; charset=UTF-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Accept');

// Tangani pre-flight request CORS
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Hanya menerima metode POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode([
        'success' => false,
        'message' => 'Metode request tidak diizinkan. Gunakan POST.'
    ]);
    exit;
}

// Hubungkan ke database
require_once __DIR__ . '/koneksi.php';

// Ambil input JSON atau POST
$rawInput = file_get_contents('php://input');
$inputData = json_decode($rawInput, true);

if (!$inputData && !empty($_POST)) {
    $inputData = $_POST;
}

$nama  = isset($inputData['nama']) ? trim($inputData['nama']) : '';
$email = isset($inputData['email']) ? trim($inputData['email']) : '';

// Validasi input
if (empty($nama) || strlen($nama) < 2) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'message' => 'Nama lengkap wajib diisi minimal 2 karakter.'
    ]);
    exit;
}

if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'message' => 'Format email tidak valid.'
    ]);
    exit;
}

// Deteksi alamat IP
$ipAddress = $_SERVER['REMOTE_ADDR'] ?? 'UNKNOWN';
if (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
    $ipAddress = explode(',', $_SERVER['HTTP_X_FORWARDED_FOR'])[0];
}

try {
    // Kueri SQL: Jika email sudah ada, jangan buat baris baru (hindari duplikat),
    // melainkan perbarui jumlah login dan waktu terakhir masuk!
    $sql = "
        INSERT INTO tamu (nama, email, total_login, waktu_pertama, waktu_terakhir, ip_address)
        VALUES (:nama, :email, 1, NOW(), NOW(), :ip)
        ON DUPLICATE KEY UPDATE
            nama           = :nama_update,
            total_login    = total_login + 1,
            waktu_terakhir = NOW(),
            ip_address     = :ip_update
    ";

    $stmt = $pdo->prepare($sql);
    $stmt->execute([
        ':nama'        => $nama,
        ':email'       => strtolower($email),
        ':ip'          => $ipAddress,
        ':nama_update' => $nama,
        ':ip_update'   => $ipAddress
    ]);

    // Ambil data terbaru dari tamu tersebut
    $fetchStmt = $pdo->prepare("SELECT id, nama, email, total_login, waktu_pertama, waktu_terakhir FROM tamu WHERE email = :email LIMIT 1");
    $fetchStmt->execute([':email' => strtolower($email)]);
    $visitor = $fetchStmt->fetch();

    $isReturningUser = ($visitor['total_login'] > 1);

    echo json_encode([
        'success' => true,
        'message' => $isReturningUser 
            ? 'Selamat datang kembali! Riwayat login Anda telah diperbarui.' 
            : 'Data tamu berhasil dicatat ke database.',
        'is_returning' => $isReturningUser,
        'data' => $visitor
    ]);

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Terjadi kesalahan database: ' . $e->getMessage()
    ]);
}
