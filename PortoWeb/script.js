/**
 * ============================================================================
 * JURNAL DIGITAL & PORTOFOLIO PERSONAL
 * ============================================================================
 * Arsitektur: Vanilla JavaScript (ES6+), Modular, Bebas Dependensi Eksternal.
 * Seluruh konten halaman dipusatkan pada objek konfigurasi `PROFILE` di bawah.
 *
 * Catatan Keamanan:
 * `localStorage` pada browser hanya bersifat penyimpanan sisi klien (lokal)
 * untuk personalisasi UX & sesi, BUKAN pengganti autentikasi server yang aman.
 */

'use strict';

/* ============================================================================
   DATA PEMBUAT (PROFILE CONFIGURATION)
   ============================================================================ */
const PROFILE = {
  name: 'Andrianto Eka Putra',
  initials: 'A',
  title: 'Mr. Robot',
  typingWords: [
    'CyberSecurity Engineer',
    'System Web Pentesting',
    'CyberSecurity Specialist',
    'Ethical Hacking'
  ],
  tagline: 'Membangun sebuah personal branding dan portofolio, untuk dipakai kedepannya',
  location: 'Bogor, Indonesia (WIB / UTC+7)',
  email: 'AndriantoEkaPutra@gmail.com',
  bio: [
    'Seorang pelajar yang dalam proses mendalami prospek CyberSecurity dan memahami materi sekolah, seorang yang bercita-cita menjadi seorang ethical hacker',
    'Menghargai aturan keamanan dan prosedur dasar, siap memahami bari kode yang banyak, dan performa nyata daripada sekadar tren atau tumpukan dependensi yang tidak perlu.'
  ],
  stats: [
    { value: 1, suffix: '', label: 'Tahun Karir' },
    { value: 2, suffix: '+', label: 'Sistem & Proyek' },
    { value: 0, suffix: '', label: 'Mitra Industri' },
    { value: 99, suffix: '%', label: 'Skor Aksesibilitas' }
  ],
  skills: [
    { name: 'Linux dan Command dasar', level: 52 },
    { name: 'Basic Web Development', level: 94 },
    { name: 'Basic Python logic dan otomasi', level: 92 },
    { name: 'KaliLinux Ecosystem', level: 99 },
    { name: 'Basic Web server PHP base', level: 78 },
    { name: 'Networking dan Subnetting IP', level: 85 },
    { name: 'Hacking', level: 100 }
  ],
  experiences: [
    {
      role: 'Head of my Personal Project',
      company: 'SMKN 1 Cibinong',
      period: '2026 — Sekarang',
      description: 'Memimpin berjalannya pembuatan personal project untuk mengembangan diri dan pembuatan portofolio individu.'
    },
    {
      role: 'Pentesting member',
      company: 'Microsoft',
      period: '2025-2026',
      description: 'Membangun dashboard analitik performa tinggi dan platform e-commerce dengan kepatuhan penuh standar aksesibilitas WCAG 2.1 tingkat AA.'
    },

  ],
  education: [
    {
      role: 'Murid SIJA',
      company: 'SMKN 1 Cibinong',
      period: '2026-sekarang',
      description: 'Fokus pada Rekayasa Perangkat Lunak dan Dasar Linux. Murid teladan dengan predikat The Goat.'
    },
    {
      role: 'Sertifikasi CyberSecurity',
      company: 'IAACH (International Association of Cyber and Hacking)',
      period: '2026-2027',
      description: 'Sertifikasi profesional bidang Cyber pelajar.'
    }
  ],
  projects: [
    {
      title: 'Project Web SIJA',
      description: 'Tugas Design Halaman web dasar, dengan basic html dan css ',
      tags: ['CSS Custom Properties', 'Html for life', 'Design Web'],
      link: 'https://github.com/example/aura-design-system'
    },
    {
      title: 'Personal Blog',
      description: 'Web yang berisikan sebuah portofolio diri saya sendiri, dan sebagai rekam jejak saya selama menjalankan project dan sebagi murid SIJA',
      tags: ['SVG/Canvas', 'Web Workers', 'PWA'],
      link: 'https://github.com/example/pulse-analytics'
    },
    {
      title: 'Game : Monster Shooter',
      description: 'Game Web base, shooting open world 2D, dibuat dengan basic html, css, dan javascript.',
      tags: ['Game Dev', 'Gaming for all', 'indie game developer'],
      link: 'https://github.com/example/ecologistics'
    }
  ],
  socials: [
    {
      platform: 'GitHub',
      url: 'https://github.com/andriiiGIT',
      svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>'
    },
    {
      platform: 'LinkedIn',
      url: 'https://linkedin.com',
      svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>'
    },
    {
      platform: 'Instagram',
      url: 'https://instagram.com/_4nto0o',
      svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>'
    }
  ]
};

/* ============================================================================
   UTILITAS BANTU (HELPERS)
   ============================================================================ */
function sanitizeInput(str) {
  if (typeof str !== 'string') return '';
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '/': '&#x2F;'
  };
  return str.trim().replace(/[&<>"'/]/g, (char) => map[char]);
}

function isValidEmail(email) {
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email.trim());
}

function showToast(message) {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <svg class="toast-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
      <polyline points="22 4 12 14.01 9 11.01"></polyline>
    </svg>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transition = 'opacity 200ms ease';
    setTimeout(() => toast.remove(), 200);
  }, 3500);
}

/**
 * Mengirim data tamu ke backend PHP (MySQL) secara asinkron.
 * Disimpan ke database "personalweb_db" pada tabel "tamu".
 */
async function submitToBackend(data) {
  try {
    const response = await fetch('simpan_tamu.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(data)
    });

    const result = await response.json();
    if (result.success) {
      console.log('[DATABASE SUCCESS]', result.message, result.data);
    } else {
      console.warn('[DATABASE WARN]', result.message);
    }
  } catch (err) {
    // Tetap berjalan mulus di browser meski web server lokal (Apache/MySQL) belum dihidupkan
    console.warn('[BACKEND NOTICE] Belum dapat terhubung ke simpan_tamu.php. Pastikan Apache & MySQL (XAMPP/Laragon) sedang berjalan jika ingin menyimpan ke database lokal.', err);
  }
}

/* ============================================================================
   MANAJEMEN GERBANG MASUK (ENTRY GATE & SESI)
   ============================================================================ */
const GateManager = {
  overlayEl: document.getElementById('gateOverlay'),
  formEl: document.getElementById('gateForm'),
  nameInput: document.getElementById('visitorName'),
  emailInput: document.getElementById('visitorEmail'),
  nameError: document.getElementById('nameError'),
  emailError: document.getElementById('emailError'),
  visitorPill: document.getElementById('visitorPill'),
  visitorPillName: document.getElementById('visitorPillName'),
  logoutBtn: document.getElementById('logoutBtn'),
  greetingBadge: document.getElementById('heroVisitorGreeting'),

  init() {
    this.checkSession();
    this.bindEvents();
  },

  checkSession() {
    const currentVisitor = this.getCurrentVisitor();
    if (currentVisitor && currentVisitor.nama) {
      this.unlockWebsite(currentVisitor.nama, false);
    } else {
      this.lockWebsite();
    }
  },

  getCurrentVisitor() {
    try {
      const stored = localStorage.getItem('currentVisitor');
      return stored ? JSON.parse(stored) : null;
    } catch (e) {
      console.warn('Gagal membaca sesi:', e);
      return null;
    }
  },

  lockWebsite() {
    document.body.classList.add('gate-locked');
    this.overlayEl.classList.remove('hidden', 'closing');
    if (this.visitorPill) this.visitorPill.classList.add('hidden');
    setTimeout(() => this.nameInput && this.nameInput.focus(), 100);
    this.setupFocusTrap();
  },

  unlockWebsite(visitorName, isNewLogin = true) {
    document.body.classList.remove('gate-locked');
    this.overlayEl.classList.add('closing');

    setTimeout(() => {
      this.overlayEl.classList.add('hidden');
      this.overlayEl.classList.remove('closing');
    }, 200);

    if (this.greetingBadge) {
      this.greetingBadge.textContent = `Tamu Terverifikasi: ${visitorName}`;
    }
    if (this.visitorPill && this.visitorPillName) {
      this.visitorPillName.textContent = visitorName;
      this.visitorPill.classList.remove('hidden');
    }

    if (isNewLogin) {
      showToast(`Akses dibuka. Selamat datang, ${visitorName}!`);
    }
  },

  logout() {
    localStorage.removeItem('currentVisitor');
    this.formEl.reset();
    this.clearErrors();
    if (this.greetingBadge) {
      this.greetingBadge.textContent = 'Sesi Pengunjung Aktif';
    }
    this.lockWebsite();
    showToast('Sesi telah diakhiri. Gerbang masuk kembali aktif.');
  },

  clearErrors() {
    if (this.nameError) this.nameError.textContent = '';
    if (this.emailError) this.emailError.textContent = '';
    if (this.nameInput) this.nameInput.classList.remove('invalid');
    if (this.emailInput) this.emailInput.classList.remove('invalid');
  },

  setupFocusTrap() {
    const focusableElements = this.overlayEl.querySelectorAll('input, button');
    if (!focusableElements.length) return;

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    this.overlayEl.onkeydown = (e) => {
      if (e.key === 'Tab') {
        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
      if (e.key === 'Escape') {
        e.preventDefault();
      }
    };
  },

  bindEvents() {
    if (!this.formEl) return;

    this.nameInput.addEventListener('input', () => {
      this.nameError.textContent = '';
      this.nameInput.classList.remove('invalid');
    });

    this.emailInput.addEventListener('input', () => {
      this.emailError.textContent = '';
      this.emailInput.classList.remove('invalid');
    });

    this.formEl.addEventListener('submit', (e) => {
      e.preventDefault();
      this.clearErrors();

      const cleanName = sanitizeInput(this.nameInput.value);
      const cleanEmail = sanitizeInput(this.emailInput.value);

      let hasError = false;

      if (!cleanName || cleanName.length < 2) {
        this.nameError.textContent = 'Nama lengkap minimal 2 karakter.';
        this.nameInput.classList.add('invalid');
        this.nameInput.focus();
        hasError = true;
      }

      if (!cleanEmail || !isValidEmail(cleanEmail)) {
        this.emailError.textContent = 'Format email tidak valid.';
        this.emailInput.classList.add('invalid');
        if (!hasError) this.emailInput.focus();
        hasError = true;
      }

      if (hasError) return;

      const visitorData = {
        nama: cleanName,
        email: cleanEmail,
        waktu: new Date().toISOString()
      };

      try {
        let visitors = JSON.parse(localStorage.getItem('visitors') || '[]');
        if (!Array.isArray(visitors)) visitors = [];

        const existingIndex = visitors.findIndex(v => v.email && v.email.toLowerCase() === cleanEmail.toLowerCase());
        if (existingIndex >= 0) {
          visitors[existingIndex] = visitorData;
        } else {
          visitors.push(visitorData);
        }

        localStorage.setItem('visitors', JSON.stringify(visitors));
        localStorage.setItem('currentVisitor', JSON.stringify(visitorData));
      } catch (err) {
        console.warn('LocalStorage tidak dapat diakses:', err);
      }

      submitToBackend(visitorData);
      this.unlockWebsite(cleanName, true);
    });

    if (this.logoutBtn) {
      this.logoutBtn.addEventListener('click', () => this.logout());
    }
  }
};

/* ============================================================================
   RENDER KONTEN DARI OBJEK PROFILE
   ============================================================================ */
function renderProfileContent() {
  document.getElementById('navBrandName').textContent = PROFILE.name;
  document.getElementById('navAvatarInitials').textContent = PROFILE.initials;
  document.getElementById('heroName').textContent = PROFILE.name;
  document.getElementById('heroTagline').textContent = PROFILE.tagline;
  document.getElementById('heroAvatarInitials').textContent = PROFILE.initials;
  document.getElementById('footerAuthorName').textContent = PROFILE.name;
  document.getElementById('currentYear').textContent = new Date().getFullYear();

  // Tentang & Bio
  document.getElementById('aboutLocation').textContent = PROFILE.location;
  document.getElementById('aboutBioContent').innerHTML = PROFILE.bio
    .map(p => `<p>${p}</p>`)
    .join('');

  // Stats Grid
  document.getElementById('statsGrid').innerHTML = PROFILE.stats
    .map(item => `
      <div class="stat-card">
        <div class="stat-number-wrapper">
          <span class="counter-number" data-target="${item.value}">0</span>${item.suffix}
        </div>
        <div class="stat-label">// ${item.label}</div>
      </div>
    `)
    .join('');

  // Skills Grid
  document.getElementById('skillsGrid').innerHTML = PROFILE.skills
    .map(skill => `
      <div class="skill-card">
        <div class="skill-header">
          <span class="skill-name">${skill.name}</span>
          <span class="skill-pct">${skill.level}%</span>
        </div>
        <div class="progress-track" role="progressbar" aria-valuenow="${skill.level}" aria-valuemin="0" aria-valuemax="100">
          <div class="progress-fill" data-level="${skill.level}"></div>
        </div>
      </div>
    `)
    .join('');

  // Timelines
  document.getElementById('experienceTimeline').innerHTML = PROFILE.experiences
    .map(item => `
      <div class="timeline-item">
        <span class="timeline-period">[${item.period}]</span>
        <h4 class="timeline-role">${item.role}</h4>
        <div class="timeline-org">${item.company}</div>
        <p class="timeline-desc">${item.description}</p>
      </div>
    `)
    .join('');

  document.getElementById('educationTimeline').innerHTML = PROFILE.education
    .map(item => `
      <div class="timeline-item">
        <span class="timeline-period">[${item.period}]</span>
        <h4 class="timeline-role">${item.role}</h4>
        <div class="timeline-org">${item.company}</div>
        <p class="timeline-desc">${item.description}</p>
      </div>
    `)
    .join('');

  // Projects Grid
  document.getElementById('projectsGrid').innerHTML = PROFILE.projects
    .map(proj => `
      <article class="project-card">
        <div>
          <h3 class="project-title">${proj.title}</h3>
          <p class="project-desc">${proj.description}</p>
        </div>
        <div>
          <div class="tech-stack-list">
            ${proj.tags.map(tag => `<span class="tech-tag">${tag}</span>`).join('')}
          </div>
          <a href="${proj.link}" class="project-link" target="_blank" rel="noopener noreferrer">
            <span>Repositori Kode &rarr;</span>
          </a>
        </div>
      </article>
    `)
    .join('');

  // Kontak & Sosial
  const emailLink = document.getElementById('contactEmailLink');
  emailLink.href = `mailto:${PROFILE.email}`;
  document.getElementById('contactEmailText').textContent = PROFILE.email;

  document.getElementById('socialLinks').innerHTML = PROFILE.socials
    .map(soc => `
      <a href="${soc.url}" class="social-btn" target="_blank" rel="noopener noreferrer">
        ${soc.svg}
        <span>${soc.platform}</span>
      </a>
    `)
    .join('');
}

/* ============================================================================
   EFEK MENGETIK
   ============================================================================ */
function initTypewriter() {
  const textElement = document.getElementById('typewriterText');
  if (!textElement) return;

  const words = PROFILE.typingWords;
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 70;

  function type() {
    const currentWord = words[wordIndex];

    if (isDeleting) {
      charIndex--;
      typingSpeed = 35;
    } else {
      charIndex++;
      typingSpeed = 70;
    }

    textElement.textContent = currentWord.substring(0, charIndex);

    if (!isDeleting && charIndex === currentWord.length) {
      typingSpeed = 2000;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      typingSpeed = 400;
    }

    setTimeout(type, typingSpeed);
  }

  type();
}

/* ============================================================================
   INTERSECTION OBSERVERS (COUNT-UP & PROGRESS)
   ============================================================================ */
function initScrollObservers() {
  const statsContainer = document.getElementById('statsGrid');
  if (statsContainer) {
    let hasCounted = false;
    const statsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !hasCounted) {
          hasCounted = true;
          const counters = statsContainer.querySelectorAll('.counter-number');
          counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'), 10) || 0;
            const duration = 1200;
            const startTime = performance.now();

            function updateCount(currentTime) {
              const elapsed = currentTime - startTime;
              const progress = Math.min(elapsed / duration, 1);
              const currentVal = Math.floor(progress * target);
              counter.textContent = currentVal;

              if (progress < 1) {
                requestAnimationFrame(updateCount);
              } else {
                counter.textContent = target;
              }
            }

            requestAnimationFrame(updateCount);
          });
        }
      });
    }, { threshold: 0.2 });

    statsObserver.observe(statsContainer);
  }

  const skillsContainer = document.getElementById('skillsGrid');
  if (skillsContainer) {
    let hasAnimated = false;
    const skillsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !hasAnimated) {
          hasAnimated = true;
          const fills = skillsContainer.querySelectorAll('.progress-fill');
          fills.forEach(fill => {
            const level = fill.getAttribute('data-level');
            fill.style.width = `${level}%`;
          });
        }
      });
    }, { threshold: 0.2 });

    skillsObserver.observe(skillsContainer);
  }
}

/* ============================================================================
   TEMA DARK / LIGHT DENGAN LOCALSTORAGE
   ============================================================================ */
function initThemeManager() {
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const htmlRoot = document.documentElement;

  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');

  htmlRoot.setAttribute('data-theme', initialTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = htmlRoot.getAttribute('data-theme');
      const targetTheme = currentTheme === 'dark' ? 'light' : 'dark';

      htmlRoot.setAttribute('data-theme', targetTheme);
      localStorage.setItem('theme', targetTheme);
      showToast(`Beralih ke mode ${targetTheme === 'dark' ? 'gelap' : 'terang'}`);
    });
  }
}

/* ============================================================================
   NAVIGASI & SCROLL SPY
   ============================================================================ */
function initNavigation() {
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');
  const backToTopBtn = document.getElementById('backToTopBtn');

  if (mobileMenuBtn && navMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      mobileMenuBtn.setAttribute('aria-expanded', String(isOpen));
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
      });
    });
  }

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  const sections = document.querySelectorAll('main section');
  window.addEventListener('scroll', () => {
    let currentId = '';
    const scrollPos = window.scrollY + 140;

    sections.forEach(sec => {
      if (scrollPos >= sec.offsetTop && scrollPos < sec.offsetTop + sec.offsetHeight) {
        currentId = sec.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentId}`) {
        link.classList.add('active');
      }
    });
  }, { passive: true });
}

/* ============================================================================
   INIT
   ============================================================================ */
document.addEventListener('DOMContentLoaded', () => {
  renderProfileContent();
  GateManager.init();
  initTypewriter();
  initScrollObservers();
  initThemeManager();
  initNavigation();
});
