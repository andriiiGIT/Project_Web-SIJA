/**
 * CYBERPUNK INTERACTIVE ENGINE (script.js)
 * Mengatur transisi tab interaktif & contact dropdown/card
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Inisialisasi Tab Switcher di Bagian Body
    initTabSwitcher();

    // 2. Inisialisasi Contact Dropdown/Card
    initContactDropdown();
});

/**
 * Mengatur interaktivitas tombol list di sidebar kiri
 * dengan transisi halus ke konten sisi kanan.
 */
function initTabSwitcher() {
    const listItems = document.querySelectorAll('#list li');
    const tabPanels = document.querySelectorAll('.tab-panel');

    if (listItems.length === 0 || tabPanels.length === 0) return;

    listItems.forEach((item, index) => {
        item.addEventListener('click', (e) => {
            e.preventDefault();

            // Jika sudah aktif, tidak perlu re-trigger
            if (item.classList.contains('active')) return;

            // 1. Hapus class 'active' dari semua menu list
            listItems.forEach(li => li.classList.remove('active'));
            // Tambahkan class 'active' ke item yang diklik
            item.classList.add('active');

            // 2. Ambil target panel berdasarkan data-tab atribut atau indeks
            const targetId = item.getAttribute('data-tab');
            let targetPanel = null;

            if (targetId) {
                targetPanel = document.getElementById(targetId);
            } else if (tabPanels[index]) {
                targetPanel = tabPanels[index];
            }

            if (targetPanel) {
                // Efek transisi keluar pada panel yang sedang aktif
                const currentActive = document.querySelector('.tab-panel.active');
                if (currentActive) {
                    currentActive.style.opacity = '0';
                    currentActive.style.transform = 'translateY(12px)';

                    setTimeout(() => {
                        currentActive.classList.remove('active');
                        currentActive.style.opacity = '';
                        currentActive.style.transform = '';

                        // Tampilkan panel baru dengan animasi
                        targetPanel.classList.add('active');
                    }, 180);
                } else {
                    targetPanel.classList.add('active');
                }
            }
        });
    });
}

/**
 * Mengatur dropdown nomor kontak & logo profil saat Contact diklik
 */
function initContactDropdown() {
    const contactTriggers = document.querySelectorAll('.contact-trigger');
    const contactDropdown = document.getElementById('contact-card-dropdown');
    const closeBtn = document.querySelector('.close-contact-btn');

    if (!contactDropdown) return;

    // Toggle dropdown saat tombol / link contact diklik
    contactTriggers.forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();

            const isShown = contactDropdown.classList.contains('show');
            if (isShown) {
                closeContactCard();
            } else {
                openContactCard(trigger);
            }
        });
    });

    // Tombol close di dalam kartu
    if (closeBtn) {
        closeBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            closeContactCard();
        });
    }

    // Klik di luar kartu dropdown untuk menutupnya
    document.addEventListener('click', (e) => {
        if (!contactDropdown.contains(e.target)) {
            closeContactCard();
        }
    });

    // Menekan tombol Escape untuk menutup
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeContactCard();
        }
    });

    function openContactCard(fromTrigger) {
        contactDropdown.classList.add('show');
        
        // Jika dipicu dari footer, scroll halus ke header agar dropdown terlihat
        if (fromTrigger && fromTrigger.closest('#footer')) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else if (window.innerWidth < 768) {
            contactDropdown.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    }

    function closeContactCard() {
        contactDropdown.classList.remove('show');
    }
}
