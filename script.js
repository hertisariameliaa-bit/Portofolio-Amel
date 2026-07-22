// ============ MENU MOBILE ============
const burger = document.getElementById('burger');
const nav = document.getElementById('nav');

burger.addEventListener('click', () => {
  nav.classList.toggle('open');
});

document.querySelectorAll('#nav a').forEach(a => {
  a.addEventListener('click', () => nav.classList.remove('open'));
});

// ============ LOADING SCREEN ============
const loader = document.getElementById('loader');
const MIN_LOADER_TIME = 900; // ms, biar animasi loading terlihat jelas
const loadStart = Date.now();

window.addEventListener('load', () => {
  const elapsed = Date.now() - loadStart;
  const wait = Math.max(MIN_LOADER_TIME - elapsed, 0);
  setTimeout(() => {
    if (loader) loader.classList.add('hide');
    document.body.classList.remove('is-loading');
    document.body.classList.add('loaded');
  }, wait);
});

// ============ SCROLL REVEAL (fade + slide in saat elemen masuk layar) ============
const revealEls = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

  revealEls.forEach(el => revealObserver.observe(el));
} else {
  // fallback kalau browser tidak mendukung IntersectionObserver
  revealEls.forEach(el => el.classList.add('is-visible'));
}

// ============ HIGHLIGHT MENU AKTIF ============
const links = document.querySelectorAll('#nav a');
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(sec => {
    const top = sec.offsetTop - 140;
    if (scrollY >= top) current = sec.id;
  });
  links.forEach(l => {
    l.classList.toggle('active', l.getAttribute('href') === '#' + current);
  });
});

// ============ FORM CONTACT ============
const contactForm = document.querySelector('#contact form');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const msg = document.documentElement.lang === 'en'
      ? 'Thank you! Your message has been recorded (this form is not yet connected to a server).'
      : 'Terima kasih! Pesan kamu sudah tercatat (form ini belum terhubung ke server).';
    alert(msg);
    contactForm.reset();
  });
}

// ============ GANTI BAHASA (ID / EN) ============
const translations = {
  id: {
    nav_beranda: "Beranda",
    nav_tentang: "Tentang",
    nav_kemampuan: "Kemampuan",
    nav_pengalaman: "Pengalaman",
    nav_projek: "Projek",
    nav_contact: "Contact",

    hero_eyebrow: "Halo, perkenalkan",
    hero_role: "Membangun sesuatu dari baris-baris kode adalah cara saya mengubah ide menjadi kenyataan.",
    hero_btn_projek: "✦ Lihat Projek",
    hero_btn_contact: "Hubungi Saya",

    tentang_tag: "Tentang Saya",
    tentang_title: "Hi, there!",
    tentang_p1: "Saya adalah seseorang yang tertarik pada perpaduan antara logika, kreativitas, dan teknologi. Dunia Informatika mempertemukan ketiganya dalam satu ruang yang terus berkembang dan penuh tantangan.",
    tentang_p2: "Bagi saya, belajar Informatika bukan sekadar memahami bahasa pemrograman atau membangun aplikasi, tetapi juga melatih cara berpikir untuk menemukan solusi yang efektif dan efisien. Setiap proyek yang saya kerjakan menjadi kesempatan untuk terus berkembang, mencoba hal baru, dan memperluas wawasan di bidang teknologi.",
    tentang_p3: "Portofolio ini menjadi ruang untuk mendokumentasikan perjalanan, pengalaman, serta karya yang telah saya bangun selama menempuh pendidikan dan mengeksplorasi dunia teknologi.",
    tentang_meta: "Program Studi Informatika — Universitas Teknokrat Indonesia",

    skill_tag: "Kemampuan",
    skill_title: "Skill &amp; Tools",
    skill_html: "Menyusun struktur halaman web secara semantik dan rapi.",
    skill_css: "Mendesain tampilan, layout responsif, dan animasi ringan.",
    skill_js: "Menambahkan interaksi dan logika pada tampilan web.",
    skill_cpp: "Dasar pemrograman terstruktur dan penyelesaian masalah algoritma.",

    exp_tag: "Pengalaman",
    exp_title: "Perjalanan Saya",
    exp1_h: "Green Heroes — Green Youth Movement",
    exp1_p: "Taman Nasional Bukit Barisan Selatan. Berkolaborasi dengan 1.979 pelajar dari 1.140 sekolah di Indonesia dan mendapatkan SK Menteri Lingkungan Hidup dan Kehutanan.",
    exp2_h: "Ketua Advokasi",
    exp2_p: "Ikatan Pelajar Muhammadiyah Ranting SMK Muhammadiyah 1 Kota Agung. Mengembangkan kesadaran advokatif berkaitan dengan persamaan hak. Bergerak di bidang bakti sosial dan konseling.",
    exp3_h: "Juara 3 Lomba Debat Bahasa Indonesia Tingkat Provinsi",
    exp3_p: "Ajang Gebyar Bulan Bahasa 2022 yang diselenggarakan oleh Universitas Muhammadiyah Pringsewu (UMPRI). Prestasi ini menunjukkan kemampuan berpikir kritis, komunikasi, dan penyampaian argumentasi secara efektif dalam tim.",

    proj_tag: "Projek",
    proj_title: "Karya Terpilih",
    proj1_tag: "Struktur Data",
    proj1_p: "Game edukatif bertema petualangan Krakatau, dibuat sebagai projek akhir mata kuliah Struktur Data.",
    proj2_h: "Web Portofolio Pribadi",
    proj2_p: "Website portofolio pribadi yang sedang kamu lihat sekarang, dibangun dengan HTML, CSS, dan JavaScript.",
    proj3_tag: "Desain Grafis",
    proj3_h: "Packaging \"Bananies\"",
    proj3_p: "Desain kemasan makanan bertema pisang, dibuat sebagai projek akhir mata kuliah Desain Grafis.",
    proj_note: "*Ganti gambar di folder assets/ dengan nama file yang sama untuk memperbarui thumbnail projek.",

    contact_tag: "Contact",
    contact_title: "Mari Terhubung",
    contact_p: "Terbuka untuk kolaborasi projek, diskusi, atau sekadar berkenalan. Silakan hubungi saya melalui salah satu kanal di bawah ini.",
    contact_email_label: "Email",
    contact_kampus_label: "Kampus",
    contact_ig_label: "Instagram",

    form_nama: "Nama",
    form_email: "Email",
    form_pesan: "Pesan",
    form_submit: "Kirim Pesan",

    footer_text: "© 2026 Herti Sari Amelia — Informatika, Universitas Teknokrat Indonesia"
  },
  en: {
    nav_beranda: "Home",
    nav_tentang: "About",
    nav_kemampuan: "Skills",
    nav_pengalaman: "Experience",
    nav_projek: "Projects",
    nav_contact: "Contact",

    hero_eyebrow: "Hi there, let me introduce myself",
    hero_role: "Informatics Engineering student at Universitas Teknokrat Indonesia — focused on building clean, functional, and pleasant-to-use web interfaces.",
    hero_btn_projek: "✦ View Projects",
    hero_btn_contact: "Contact Me",

    tentang_tag: "About Me",
    tentang_title: "Hi, there!",
    tentang_p1: "My name is <b>Herti Sari Amelia</b>, an <b>Informatics Engineering student at Universitas Teknokrat Indonesia</b>. I'm interested in web development, especially the <b>frontend</b> side, where ideas and design are translated into interfaces people can actually feel and use.",
    tentang_p2: "To me, coding isn't just about writing lines of instructions — it's a way to communicate solutions clearly and make them enjoyable to use. I love learning new things, refining cleaner code structures, and keeping the look and function of a design consistent.",
    tentang_p3: "Through this portfolio, I want to show the learning process and the projects I've worked on during my studies in Informatics Engineering.",
    tentang_meta: "Informatics Engineering — Universitas Teknokrat Indonesia",

    skill_tag: "Skills",
    skill_title: "Skills &amp; Tools",
    skill_html: "Building web page structure semantically and cleanly.",
    skill_css: "Designing layouts, responsive design, and light animations.",
    skill_js: "Adding interactivity and logic to web pages.",
    skill_cpp: "Foundations of structured programming and algorithmic problem solving.",

    exp_tag: "Experience",
    exp_title: "My Journey",
    exp1_h: "Green Heroes — Green Youth Movement",
    exp1_p: "Bukit Barisan Selatan National Park. Collaborated with 1,979 students from 1,140 schools across Indonesia and received an official decree from the Minister of Environment and Forestry.",
    exp2_h: "Head of Advocacy",
    exp2_p: "Muhammadiyah Student Association, SMK Muhammadiyah 1 Kota Agung Branch. Developed advocacy awareness related to equal rights, active in social service and counseling.",
    exp3_h: "3rd Place, Provincial-Level Indonesian Language Debate Competition",
    exp3_p: "Gebyar Bulan Bahasa 2022, held by Universitas Muhammadiyah Pringsewu (UMPRI). This achievement reflects critical thinking, communication, and effective argumentation skills within a team.",

    proj_tag: "Projects",
    proj_title: "Selected Work",
    proj1_tag: "Data Structures",
    proj1_p: "An educational game themed around the Krakatau adventure, made as a final project for the Data Structures course.",
    proj2_h: "Personal Portfolio Website",
    proj2_p: "The personal portfolio website you're viewing right now, built with HTML, CSS, and JavaScript.",
    proj3_tag: "Graphic Design",
    proj3_h: "\"Bananies\" Packaging",
    proj3_p: "A banana-themed food packaging design, made as a final project for the Graphic Design course.",
    proj_note: "*Replace the images in the assets/ folder with the same file names to update the project thumbnails.",

    contact_tag: "Contact",
    contact_title: "Let's Connect",
    contact_p: "Open to project collaboration, discussions, or just getting to know each other. Feel free to reach out through any of the channels below.",
    contact_email_label: "Email",
    contact_kampus_label: "University",
    contact_ig_label: "Instagram",

    form_nama: "Name",
    form_email: "Email",
    form_pesan: "Message",
    form_submit: "Send Message",

    footer_text: "© 2026 Herti Sari Amelia — Informatics Engineering, Universitas Teknokrat Indonesia"
  }
};

const langToggle = document.getElementById('lang-toggle');
const langOptions = document.querySelectorAll('.lang-opt');

function applyLanguage(lang) {
  const dict = translations[lang];
  if (!dict) return;

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (dict[key] !== undefined) {
      el.innerHTML = dict[key];
    }
  });

  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (dict[key] !== undefined) {
      el.setAttribute('placeholder', dict[key]);
    }
  });

  langOptions.forEach(opt => {
    opt.classList.toggle('active', opt.getAttribute('data-lang') === lang);
  });

  document.documentElement.lang = lang;
}

if (langToggle) {
  langToggle.addEventListener('click', () => {
    const current = document.documentElement.lang === 'en' ? 'en' : 'id';
    const next = current === 'id' ? 'en' : 'id';
    applyLanguage(next);
  });
}

// Bahasa default saat halaman dibuka: Indonesia
applyLanguage('id');
