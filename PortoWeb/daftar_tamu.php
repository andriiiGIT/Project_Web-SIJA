<?php
/**
 * ============================================================================
 * DAFTAR TAMU DIGITAL (daftar_tamu.php)
 * ============================================================================
 * Dashboard untuk melihat seluruh tamu yang masuk dari web personal.
 * Diakses lewat: http://localhost/Personal%20Project/daftar_tamu.php (atau path localhost Anda)
 */

require_once __DIR__ . '/koneksi.php';

// Ambil semua data tamu diurutkan dari yang paling terakhir login
try {
    $stmt = $pdo->query("SELECT * FROM tamu ORDER BY waktu_terakhir DESC");
    $daftarTamu = $stmt->fetchAll();

    // Hitung ringkasan statistik
    $totalTamuUnik = count($daftarTamu);
    $totalKunjungan = array_sum(array_column($daftarTamu, 'total_login'));
} catch (PDOException $e) {
    die("Gagal mengambil data tamu: " . $e->getMessage());
}
?>
<!DOCTYPE html>
<html lang="id" data-theme="dark">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Database Buku Tamu — Personal Web</title>
  
  <!-- Font Senada dengan Website Utama -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Space+Grotesk:wght@600;700&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet">
  
  <style>
    :root {
      --bg-page: #0C0E10;
      --bg-card: #14171A;
      --bg-elevated: #22262B;
      --border-subtle: #24292E;
      --border-strong: #363C44;
      --text-main: #F3F4F6;
      --text-muted: #9CA3AF;
      --text-dim: #6B7280;
      --c-yellow: #EAB308;
      --c-green: #22C55E;
      --c-brown: #B45309;
      --font-heading: 'Space Grotesk', sans-serif;
      --font-body: 'Inter', sans-serif;
      --font-mono: 'JetBrains Mono', monospace;
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    body {
      background-color: var(--bg-page);
      color: var(--text-main);
      font-family: var(--font-body);
      line-height: 1.6;
      padding: 40px 20px;
    }

    .container {
      max-width: 1100px;
      margin: 0 auto;
    }

    /* Header Dashboard */
    .header-bar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 16px;
      margin-bottom: 30px;
      padding-bottom: 20px;
      border-bottom: 1px solid var(--border-subtle);
    }

    .header-title-group h1 {
      font-family: var(--font-heading);
      font-size: 1.8rem;
      letter-spacing: -0.5px;
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .header-title-group p {
      font-family: var(--font-mono);
      font-size: 0.825rem;
      color: var(--text-muted);
      margin-top: 4px;
    }

    .db-badge {
      font-family: var(--font-mono);
      font-size: 0.75rem;
      background: rgba(234, 179, 8, 0.15);
      color: var(--c-yellow);
      border: 1px solid var(--c-yellow);
      padding: 2px 8px;
      border-radius: 4px;
    }

    .nav-actions {
      display: flex;
      gap: 10px;
    }

    .btn {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      font-family: var(--font-mono);
      font-size: 0.85rem;
      font-weight: 600;
      padding: 8px 16px;
      border-radius: 6px;
      text-decoration: none;
      transition: all 180ms ease;
      cursor: pointer;
    }

    .btn-primary {
      background-color: var(--c-yellow);
      color: #000;
      border: 1px solid var(--c-yellow);
    }

    .btn-primary:hover {
      background-color: #fde047;
    }

    .btn-secondary {
      background-color: var(--bg-card);
      color: var(--text-main);
      border: 1px solid var(--border-strong);
    }

    .btn-secondary:hover {
      background-color: var(--bg-elevated);
    }

    /* Kartu Ringkasan */
    .stats-row {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      gap: 16px;
      margin-bottom: 30px;
    }

    .stat-box {
      background: var(--bg-card);
      border: 1px solid var(--border-subtle);
      border-radius: 8px;
      padding: 20px;
    }

    .stat-label {
      font-family: var(--font-mono);
      font-size: 0.775rem;
      color: var(--text-dim);
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .stat-value {
      font-family: var(--font-heading);
      font-size: 2.2rem;
      font-weight: 700;
      color: var(--c-yellow);
      margin-top: 4px;
    }

    .stat-value.green {
      color: var(--c-green);
    }

    /* Tabel Tamu */
    .table-card {
      background: var(--bg-card);
      border: 1px solid var(--border-subtle);
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
    }

    .table-header {
      padding: 16px 20px;
      border-bottom: 1px solid var(--border-subtle);
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 12px;
    }

    .table-title {
      font-family: var(--font-heading);
      font-size: 1.1rem;
      font-weight: 700;
    }

    .table-search {
      background: var(--bg-elevated);
      border: 1px solid var(--border-subtle);
      padding: 6px 12px;
      border-radius: 4px;
      color: var(--text-main);
      font-size: 0.85rem;
      outline: none;
      font-family: var(--font-mono);
    }

    .table-search:focus {
      border-color: var(--c-yellow);
    }

    .table-responsive {
      overflow-x: auto;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      text-align: left;
      font-size: 0.875rem;
    }

    th {
      background: var(--bg-elevated);
      font-family: var(--font-mono);
      font-size: 0.775rem;
      text-transform: uppercase;
      color: var(--text-dim);
      padding: 12px 18px;
      border-bottom: 1px solid var(--border-subtle);
    }

    td {
      padding: 14px 18px;
      border-bottom: 1px solid var(--border-subtle);
      color: var(--text-muted);
    }

    tr:hover td {
      background-color: var(--bg-elevated);
      color: var(--text-main);
    }

    .guest-name {
      font-weight: 600;
      color: var(--text-main);
    }

    .guest-email {
      font-family: var(--font-mono);
      color: var(--c-yellow);
    }

    .login-badge {
      display: inline-block;
      font-family: var(--font-mono);
      font-size: 0.75rem;
      font-weight: 600;
      padding: 3px 8px;
      border-radius: 4px;
      background: rgba(34, 197, 94, 0.15);
      color: var(--c-green);
      border: 1px solid rgba(34, 197, 94, 0.3);
    }

    .login-badge.multiple {
      background: rgba(234, 179, 8, 0.15);
      color: var(--c-yellow);
      border-color: rgba(234, 179, 8, 0.3);
    }

    .timestamp {
      font-family: var(--font-mono);
      font-size: 0.8rem;
    }

    .empty-state {
      padding: 60px 20px;
      text-align: center;
      color: var(--text-dim);
    }

    .empty-state p {
      font-size: 0.95rem;
      margin-top: 8px;
    }
  </style>
</head>
<body>

  <div class="container">
    <!-- Header -->
    <div class="header-bar">
      <div class="header-title-group">
        <h1>
          Buku Tamu Pengunjung
          <span class="db-badge">MySQL: personalweb_db &bull; tabel: tamu</span>
        </h1>
        <p>// Daftar riwayat akun pengunjung yang login melalui gerbang masuk</p>
      </div>

      <div class="nav-actions">
        <a href="index.html" class="btn btn-secondary">&larr; Buka Website</a>
        <a href="daftar_tamu.php" class="btn btn-primary">&#x21bb; Segarkan Data</a>
      </div>
    </div>

    <!-- Ringkasan Statistik -->
    <div class="stats-row">
      <div class="stat-box">
        <div class="stat-label">// Tamu Unik Terdaftar</div>
        <div class="stat-value"><?= number_format($totalTamuUnik); ?></div>
      </div>
      <div class="stat-box">
        <div class="stat-label">// Total Akumulasi Kunjungan</div>
        <div class="stat-value green"><?= number_format($totalKunjungan); ?></div>
      </div>
      <div class="stat-box">
        <div class="stat-label">// Status Proteksi Duplikasi</div>
        <div class="stat-value" style="font-size: 1.2rem; margin-top: 14px; color: var(--c-green);">
          &check; Aktif (Anti Duplikat)
        </div>
      </div>
    </div>

    <!-- Tabel Data Tamu -->
    <div class="table-card">
      <div class="table-header">
        <span class="table-title">Daftar Akun Pengunjung</span>
        <input type="text" id="searchInput" class="table-search" placeholder="Cari nama atau email..." onkeyup="filterTable()">
      </div>

      <div class="table-responsive">
        <table id="visitorsTable">
          <thead>
            <tr>
              <th>No</th>
              <th>Nama Lengkap</th>
              <th>Alamat Email</th>
              <th>Total Login</th>
              <th>Pertama Masuk</th>
              <th>Kunjungan Terakhir</th>
              <th>IP Address</th>
            </tr>
          </thead>
          <tbody>
            <?php if (!empty($daftarTamu)): ?>
              <?php foreach ($daftarTamu as $index => $tamu): ?>
                <tr>
                  <td><?= $index + 1; ?></td>
                  <td class="guest-name"><?= htmlspecialchars($tamu['nama'], ENT_QUOTES, 'UTF-8'); ?></td>
                  <td class="guest-email"><?= htmlspecialchars($tamu['email'], ENT_QUOTES, 'UTF-8'); ?></td>
                  <td>
                    <?php if ($tamu['total_login'] > 1): ?>
                      <span class="login-badge multiple"><?= $tamu['total_login']; ?>x Masuk</span>
                    <?php else: ?>
                      <span class="login-badge">1x Masuk</span>
                    <?php endif; ?>
                  </td>
                  <td class="timestamp"><?= date('d M Y, H:i', strtotime($tamu['waktu_pertama'])); ?> WIB</td>
                  <td class="timestamp"><?= date('d M Y, H:i', strtotime($tamu['waktu_terakhir'])); ?> WIB</td>
                  <td class="timestamp"><?= htmlspecialchars($tamu['ip_address'] ?? '-', ENT_QUOTES, 'UTF-8'); ?></td>
                </tr>
              <?php endforeach; ?>
            <?php else: ?>
              <tr>
                <td colspan="7">
                  <div class="empty-state">
                    <strong>Belum ada tamu yang masuk.</strong>
                    <p>Buka <a href="index.html" style="color: var(--c-yellow);">index.html</a> dan isi form nama serta email pada gerbang masuk untuk menguji penyimpanan database.</p>
                  </div>
                </td>
              </tr>
            <?php endif; ?>
          </tbody>
        </table>
      </div>
    </div>
  </div>

  <script>
    function filterTable() {
      const input = document.getElementById("searchInput").value.toLowerCase();
      const rows = document.querySelectorAll("#visitorsTable tbody tr");

      rows.forEach(row => {
        const text = row.innerText.toLowerCase();
        row.style.display = text.includes(input) ? "" : "none";
      });
    }
  </script>
</body>
</html>
