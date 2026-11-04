# Papan Progres & Serah Terima Sesi — Siap Kelas 3

> **Instruksi Wajib untuk Agen Pelaksana:**
> 1. Di awal sesi, baca file ini terlebih dahulu.
> 2. Cari baris pertama yang berstatus `- [ ]` di bawah bagian **Daftar Sesi**.
> 3. Kerjakan **HANYA** satu sesi tersebut mengikuti instruksi di `docs/PLAN.md` (dan `docs/CONTENT_GUIDE.md` jika sesi konten).
> 4. Di akhir sesi, setelah semua perintah verifikasi lulus:
>    - Ubah `- [ ]` menjadi `- [x]` pada sesi yang baru diselesaikan.
>    - Tambahkan entri baru di bagian **Log Sesi** di bawah.
>    - Lakukan `git commit` dan `git push`.

---

## Status Saat Ini
- **Tahap Aktif:** S1 selesai, berikutnya S2 (Layout, router, halaman kerangka)
- **Lokasi Proyek:** `D:\!AGY\siap-kelas3`
- **URL Produksi:** *(belum di-deploy, diisi pada S12)*

---

## Daftar Sesi

### Tahap 1: Kerangka Aplikasi (S0 – S10)
- [x] **S0** — Persiapan proyek, konfigurasi Vite/Tailwind/PWA/Playwright, & pembuatan repo GitHub
- [x] **S1** — Fondasi desain: token warna `@theme`, font lokal, skrip anti-kedip tema, komponen UI dasar (`components/ui`)
- [ ] **S2** — Layout (`PageShell`, `AppHeader`, `MobileBottomNav`), router, `ErrorBoundary`, & halaman 404
- [ ] **S3** — `safeStorage`, store Zustand (`useApp`, `usePref`), halaman Pilih & Buat Profil (`zod`)
- [ ] **S4** — Tipe isi (`types.ts`), helper, validator konten (`validasi.test.ts`), halaman Mapel, Bab, & Kartu Materi + TTS (`tts.ts`)
- [ ] **S5** — Mesin soal (`periksa`, `pilihSoal`, `nilai`, `rng`) & seluruh komponen jawaban (`pg`, `bs`, `isian`, `jodohkan`, `urutkan`, `uraian`, `Pembahasan`)
- [ ] **S6** — Alur Latihan, dialog keluar/lanjut, halaman Hasil & Pembahasan, kartu Lanjutkan di Beranda
- [ ] **S7** — Mode Ujian Bab & Ujian Gabungan (timer absolut, ragu-ragu, grid nomor soal, nilai terbaik & bintang)
- [ ] **S8** — Bank Soal Salah (`/ulang`), halaman Prestasi (`/prestasi`), target harian 10 soal, hari beruntun, & sistem lencana
- [ ] **S9** — Area Orang Tua: gerbang perkalian (`/ortu`), Rapor detail (`/ortu/rapor`), Pengaturan, daftar "Kunci Perlu Dicek", & Reset Semua Data
- [ ] **S10** — SEO (`robots.txt`, `sitemap.xml`, `Seo`), ikon PWA, gambar OG, analitik, uji offline, & audit Lighthouse

### Tahap 2: Pengolahan Konten (S11 — dipecah per bab setelah bahan masuk)
> Saat bahan guru untuk suatu mapel sudah ditaruh di `bahan/<mapel>/`, jalankan sesi `C0` untuk menyusun inventaris dan menambahkan baris `C-<MAPEL>-01`, `02`, dst. di bawah ini.

- [ ] **C0-PAI** — Inventaris bahan PAI (`content-notes/pai/inventaris.md`) & daftar bab PAI
- [ ] **C0-ING** — Inventaris bahan Bahasa Inggris (`content-notes/inggris/inventaris.md`) & daftar bab Bahasa Inggris
*(Baris `C-PAI-01`, `C-ING-01`, dst. akan ditambahkan oleh agen pada sesi C0)*

### Tahap 3: QA Akhir & Rilis (S12)
- [ ] **S12** — Pemilihan nama final bersama user, QA visual menyeluruh (360px terang/gelap), deploy ke Vercel (`sekawan`), & verifikasi link live

---

## Pertanyaan Terbuka / Kendala Bahan
*(Kosong. Jika agen menemukan halaman bahan yang buram/terpotong, kunci jawaban guru yang meragukan, atau error yang gagal 3x berturut-turut, tulis di sini dengan jelas untuk ditanyakan ke user.)*

---

## Catatan Skor Lighthouse (Diisi pada S10)
- Performance: `-`
- Accessibility: `-`
- Best Practices: `-`
- SEO: `-`

---

## Log Sesi

### 2026-11-04 — S1 Fondasi desain (Selesai)
- **Yang dikerjakan:** token `@theme` + gaya dasar + reduced-motion, font lokal Fredoka/Andika/Scheherazade, `lib/motion.ts`, komponen `Button/IconButton/Card/Dialog/Segmented/ProgressBar/ProgressRing/Stars/Badge`, `ThemeToggle`, favicon lingkaran jeruk + 3, `index.html` id + SEO + boot tema.
- **Verifikasi:** `npm.cmd run cek` lulus, `e2e tema.spec.ts` 2 passed (tanpa kedip, bertahan reload).
- **Catatan:** paket Scheherazade New tersedia, tidak perlu Amiri.
- **Sesi berikutnya:** **S2** (Layout, router, halaman kerangka).

### 2026-11-04 — S0 Persiapan proyek (Selesai)
- **Yang dikerjakan:** scaffold Vite react-ts, install deps (react-router, zustand, motion, lucide, zod, analytics, fontsource, tailwind, PWA, vitest, playwright), tulis `vite.config.ts` + `vercel.json` + `playwright.config.ts` + skrip `package.json`, `App.tsx` sementara, tes asap unit+e2e.
- **Verifikasi:** `npm.cmd run cek` lulus, `npm.cmd run e2e` 2 passed (hp+desktop).
- **Sesi berikutnya:** **S1** (Fondasi desain).

### 2026-11-04 — Perencanaan Awal (Selesai)
- **Status:** Seluruh keputusan produk dikunci melalui wawancara `/grill-me` (16 keputusan).
- **Dokumen yang dibuat:** `PLAN.md`, `CONTENT_GUIDE.md`, `PROGRESS.md`.
- **Sesi berikutnya:** **S0** (Persiapan proyek & repo di `D:\!AGY\siap-kelas3`).
