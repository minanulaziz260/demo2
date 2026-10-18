# Undangan Digital Web - Timeless Snapshot (Arina & Bagas)

Source code lengkap hasil rekonstruksi dan reverse engineering (*REA*) template undangan pernikahan digital **Timeless Snapshot** dari [Wevitation](https://www.wevitation.com/demo/timeless-snapshot).

Source code ini sudah dibersihkan dari seluruh ketergantungan server tertutup (Cloudflare Rocket Loader, tracking analytics, dan session Laravel Livewire yang usang) dan dioptimalkan menjadi **Clean Standalone Web Application** yang dapat langsung dijalankan di browser, di-hosting di GitHub Pages, Vercel, Netlify, atau cPanel hosting biasa.

---

## 📁 Struktur Direktori & File

```text
undangan-timeless-snapshot/
├── index.html                     # Halaman utama undangan (Clean HTML5)
├── README.md                      # Dokumentasi & panduan penggunaan
├── assets/
│   ├── audio/
│   │   └── wedding-music.mp3      # Audio musik latar undangan
│   ├── css/
│   │   ├── plugins.bundle.css     # CSS bundle komponen UI & icon fonts
│   │   ├── style.bundle.css       # Style utama tema Metronic
│   │   ├── custom.css             # Style modifikasi Wevitation
│   │   ├── theme.css              # Custom styling tema
│   │   ├── animate.min.css        # Efek animasi CSS
│   │   ├── aos.css                # Animate On Scroll styling
│   │   ├── splide.min.css         # Slider galeri foto
│   │   ├── lightgallery.css       # Lightbox popup galeri foto
│   │   ├── bootstrap-icons.css    # Icon set Bootstrap
│   │   ├── responsive-flip-countdown.css # Countdown styling
│   │   └── fonts/                 # Woff2 webfonts (Bootstrap & LineAwesome)
│   ├── fonts/
│   │   ├── Mick Caster/           # Font heading 'Mick Caster' (Offline woff2/ttf)
│   │   ├── Philosopher/           # Font body 'Philosopher' (Offline Google Font woff2)
│   │   └── lg.woff, lg.ttf        # Font icon lightbox
│   ├── images/
│   │   ├── cover_background_1.jpg # Background amplop depan
│   │   ├── cover_background_2.jpg # Background desktop backdrop
│   │   ├── bride1.jpg             # Foto mempelai wanita (Arina)
│   │   ├── bride2.jpg             # Foto mempelai pria (Bagas)
│   │   ├── gallery_1.png s/d 4    # Foto galeri kenangan
│   │   ├── story_1.png & 3        # Foto perjalanan cinta (Love Story)
│   │   ├── bca.svg & nab.svg      # Logo bank transfer hadiah
│   │   ├── saweria.png            # Logo saweria
│   │   ├── qris_1.jpg & 2         # QR Code QRIS amplop digital
│   │   └── igstory.jpg            # Frame template untuk Instagram Story
│   └── js/
│       ├── plugins.bundle.js      # jQuery & library pendukung UI
│       ├── scripts.bundle.js      # Script fungsi umum layout
│       ├── lozad.min.js           # Lazy loading gambar hemat kuota
│       ├── splide.min.js          # Carousel slider foto & thumbnail
│       ├── lightgallery-all.min.js# Lightbox popup foto resolusi tinggi
│       ├── aos.js                 # Animate on scroll controller
│       ├── jquery.countdown.min.js# Penghitung waktu mundur acara
│       ├── jquery.flipper-responsive.js # Animasi flip countdown
│       ├── html2canvas.min.js     # Generator unduh gambar IG story
│       └── invitation.js          # Controller interaktif undangan
└── themes/
    └── timeless-snapshot/
        ├── css/
        │   ├── styles.css         # Style spesifik tema Timeless Snapshot
        │   ├── variable.css       # CSS custom properties / warna tema
        │   ├── bg-animation.css   # Animasi background
        │   └── animation-keyframes.css
        └── img/
            └── quote.png, quote-2.png # Aset dekorasi kutipan
```

---

## ⚡ Fitur-Fitur Interaktif

1. **Cover / Amplop Digital Interaktif (`#modalInvitation`)**:
   * Saat pertama kali dibuka, layar tertutup amplop selamat datang.
   * Tombol **"Buka Undangan"** akan membuka modal, membuka scroll layar, dan otomatis memutar lagu latar (*autoplay*).
2. **Floating Music Controller (`#btn-floating-music`)**:
   * Tombol floating melayang di pojok kiri bawah dengan animasi piringan hitam berputar saat lagu aktif.
   * Bisa diklik kapan saja untuk *pause* atau *play* musik.
3. **Penyebutan Nama Tamu Dinamis via URL (`?to=...`)**:
   * Cukup tambahkan parameter query pada URL:
     ```text
     index.html?to=Budi+Santoso
     index.html?to=Bapak+Joko+&+Keluarga
     ```
   * Nama penerima pada sampul depan, teks sapaan, dan form ucapan akan otomatis berubah sesuai parameter.
4. **Form Konfirmasi Kehadiran (RSVP)**:
   * Pengunjung dapat memilih status hadir atau tidak hadir serta memasukkan jumlah orang.
   * Data konfirmasi tersimpan secara reaktif di `localStorage` peramban.
5. **Buku Ucapan & Doa (Wishes)**:
   * Pengunjung dapat menuliskan nama dan pesan doa restu.
   * Ucapan baru langsung muncul seketika (*instant reactive prepend*) di daftar komentar dan tersimpan di `localStorage`.
6. **Download Template Instagram Story**:
   * Menggunakan `html2canvas` untuk memotret area frame `#ig-story-area` menjadi file `.png` beresolusi tinggi yang siap dibagikan ke Instagram Story.
7. **Amplop Digital & Copy Nomor Rekening**:
   * Tombol salin nomor rekening BCA / NAB yang langsung menyalin ke *clipboard* perangkat dengan notifikasi Toastr.
   * Modal QRIS untuk scan pembayaran digital.
8. **Countdown Timer**:
   * Penghitung mundur flip otomatis menuju tanggal pernikahan (31 Desember 2026).

---

## 🚀 Cara Menjalankan Secara Lokal

Undangan ini dapat dijalankan langsung dengan web server lokal apa pun:

### Opsi 1: Menggunakan Python (Tanpa instalasi tambahan)
Buka terminal di dalam folder ini dan jalankan:
```bash
python3 -m http.server 8000
```
Buka browser di: `http://localhost:8000` atau `http://localhost:8000?to=Nama+Tamu`.

### Opsi 2: Menggunakan Node.js / NPX
```bash
npx serve .
```

### Opsi 3: VS Code Live Server
Klik kanan pada `index.html` lalu pilih **"Open with Live Server"**.

---

## 🛠️ Cara Kustomisasi Data & Konten

1. **Mengubah Nama Mempelai**:
   * Buka `index.html`, lakukan pencarian & ganti untuk:
     * `Arina Febriana` (Mempelai Wanita)
     * `Bagas Sadewa` (Mempelai Pria)
2. **Mengubah Tanggal Acara & Countdown**:
   * Buka `assets/js/invitation.js`, cari baris:
     ```javascript
     const targetEventDate = "2026-12-31 10:00:00";
     ```
     Ganti dengan tanggal dan waktu acara Anda.
3. **Mengubah Foto-Foto**:
   * Cukup gantikan file gambar di dalam folder `assets/images/` dengan foto Anda menggunakan nama file yang sama (misal `bride1.jpg`, `bride2.jpg`, `cover_background_1.jpg`, dll).
4. **Mengubah Musik Latar**:
   * Ganti file `assets/audio/wedding-music.mp3` dengan lagu pilihan Anda (format `.mp3`).
5. **Menyambungkan Form RSVP & Ucapan ke Google Sheets / Database**:
   * Pada `assets/js/invitation.js`, di dalam fungsi `submitRSVP` dan `submitWish`, Anda dapat menambahkan `fetch()` ke Webhook Google Apps Script, SheetDB, Supabase, atau API endpoint backend Anda sendiri.

---

## 🌐 Panduan Deployment

* **GitHub Pages**: Buat repositori baru di GitHub, unggah seluruh isi folder ini, lalu aktifkan GitHub Pages di menu *Settings > Pages*.
* **Vercel / Netlify**: Cukup *drag and drop* folder ini ke dashboard Vercel atau Netlify.
* **Hosting cPanel**: Upload seluruh isi folder ke direktori `public_html/` atau subdomain Anda.
