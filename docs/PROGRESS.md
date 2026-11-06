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
- **Tahap Aktif:** S11 — bab 1 PAI selesai. Berikutnya **C-PAI-02** (Surah Al-Kautsar)
- **Lokasi Proyek:** `D:\!AGY\siap-kelas3`
- **URL Produksi:** *(belum di-deploy, diisi pada S12)*

---

## Daftar Sesi

### Tahap 1: Kerangka Aplikasi (S0 – S10)
- [x] **S0** — Persiapan proyek, konfigurasi Vite/Tailwind/PWA/Playwright, & pembuatan repo GitHub
- [x] **S1** — Fondasi desain: token warna `@theme`, font lokal, skrip anti-kedip tema, komponen UI dasar (`components/ui`)
- [x] **S2** — Layout (`PageShell`, `AppHeader`, `MobileBottomNav`), router, `ErrorBoundary`, & halaman 404
- [x] **S3** — `safeStorage`, store Zustand (`useApp`, `usePref`), halaman Pilih & Buat Profil (`zod`)
- [x] **S4** — Tipe isi (`types.ts`), helper, validator konten (`validasi.test.ts`), halaman Mapel, Bab, & Kartu Materi + TTS (`tts.ts`)
- [x] **S5** — Mesin soal (`periksa`, `pilihSoal`, `nilai`, `rng`) & seluruh komponen jawaban (`pg`, `bs`, `isian`, `jodohkan`, `urutkan`, `uraian`, `Pembahasan`)
- [x] **S6** — Alur Latihan, dialog keluar/lanjut, halaman Hasil & Pembahasan, kartu Lanjutkan di Beranda
- [x] **S7** — Mode Ujian Bab & Ujian Gabungan (timer absolut, ragu-ragu, grid nomor soal, nilai terbaik & bintang)
- [x] **S8** — Bank Soal Salah (`/ulang`), halaman Prestasi (`/prestasi`), target harian 10 soal, hari beruntun, & sistem lencana
- [x] **S9** — Area Orang Tua: gerbang perkalian (`/ortu`), Rapor detail (`/ortu/rapor`), Pengaturan, daftar "Kunci Perlu Dicek", & Reset Semua Data
- [x] **S10** — SEO (`robots.txt`, `sitemap.xml`, `Seo`), ikon PWA, gambar OG, analitik, uji offline, & audit Lighthouse

### Tahap 2: Pengolahan Konten (S11 — dipecah per bab setelah bahan masuk)
> Saat bahan guru untuk suatu mapel sudah ditaruh di `bahan/<mapel>/`, jalankan sesi `C0` untuk menyusun inventaris dan menambahkan baris `C-<MAPEL>-01`, `02`, dst. di bawah ini.

- [x] **C0-PAI** — Inventaris bahan PAI (`content-notes/pai/inventaris.md`) & daftar bab PAI
- [x] **C0-ING** — Inventaris bahan Bahasa Inggris (`content-notes/inggris/inventaris.md`) & daftar bab Bahasa Inggris

**PAI** (8 bab, semuanya MODUL — tidak ada soal guru di bahan):
- [x] **C-PAI-01** — Huruf Hijaiyah Bersambung & Mad Tabi'i
- [ ] **C-PAI-02** — Surah Al-Kautsar
- [ ] **C-PAI-03** — Huruf Hijaiyah Bersambung & Izhar Halqi
- [ ] **C-PAI-04** — Hadis tentang Kewajiban Salat
- [ ] **C-PAI-05** — Sifat-Sifat Allah Swt.
- [ ] **C-PAI-06** — Iman kepada Kitab-Kitab Allah Swt.
- [ ] **C-PAI-07** — Berbaik Sangka kepada Allah Swt.
- [ ] **C-PAI-08** — Akhlak terhadap Orang Tua

**Bahasa Inggris** (1 bab, LATIHAN — 15 soal guru, tanpa soal buatan):
- [ ] **C-ING-01** — Classroom Commands

### Tahap 3: QA Akhir & Rilis (S12)
- [ ] **S12** — Pemilihan nama final bersama user, QA visual menyeluruh (360px terang/gelap), deploy ke Vercel (`sekawan`), & verifikasi link live

---

## Pertanyaan Terbuka / Kendala Bahan
*(Kosong. Jika agen menemukan halaman bahan yang buram/terpotong, kunci jawaban guru yang meragukan, atau error yang gagal 3x berturut-turut, tulis di sini dengan jelas untuk ditanyakan ke user.)*

---

## Catatan Skor Lighthouse (Diisi pada S10)
- Performance: `91`
- Accessibility: `100`
- Best Practices: `100`
- SEO: `100`
- Catatan: diukur pada build produksi yang disajikan `tools/serve-prod.mjs` (gzip + cache, mirip Vercel), 2026-11-06.

---

## Log Sesi

### 2026-11-06 — C-PAI-01 Huruf Hijaiyah Bersambung & Mad Tabi'i (Selesai)
- **Yang dikerjakan:** `src/content/pai/bab-01.ts` (5 kartu materi, 16 soal dinilai + 1 uraian), daftarkan di `src/content/pai/index.ts`, tambah `tests/e2e/konten.spec.ts` (parametris per bab).
- **Teks Arab:** diverifikasi dari gambar halaman 1 bahan: كَتَبَ / عَلِمَ / مُسْلِمٌ / قَالَ / فِي / يَقُولُ.
- **Verifikasi:** `npm.cmd run test:konten` lulus, `npm.cmd run cek` (56 unit test), e2e `konten.spec.ts` + `mapel.spec.ts` 6 passed.
- **Catatan:** e2e "mapel tanpa bab" dipindah ke `/mapel/inggris` karena PAI kini punya bab.
- **Sesi berikutnya:** **C-PAI-02** (Surah Al-Kautsar).

### 2026-11-06 — C0-PAI & C0-ING Inventaris bahan (Selesai)
- **Yang dikerjakan:** pasang `tools/render_pdf.py`, `tools/ekstrak.py`, `tools/crop.py`; ekstrak kedua PDF ke `bahan/<mapel>/_ekstrak/` (PAI 9 halaman, Inggris 1 halaman); susun `content-notes/pai/inventaris.md` (8 bab, semua MODUL, 0 soal guru) dan `content-notes/inggris/inventaris.md` (1 bab LATIHAN, 15 soal guru, kunci ditentukan agen).
- **Verifikasi:** struktur bab mengikuti judul di bahan; jumlah soal guru Inggris 15 sesuai worksheet (10 pg + 5 isian).
- **Catatan:** dua sesi C0 dikerjakan berurutan dalam satu giliran karena bahannya kecil dan saling terkait. Teks Arab hasil ekstraksi PDF berantakan — setiap teks Arab wajib dicek ulang dari gambar halaman (`bahan/pai/_ekstrak/halaman/`).
- **Sesi berikutnya:** **C-PAI-01** (Huruf Hijaiyah Bersambung & Mad Tabi'i).

### 2026-11-06 — S10 SEO, PWA, ikon, analitik, Lighthouse (Selesai)
- **Yang dikerjakan:** `public/robots.txt` (Disallow `/ortu`) + `public/sitemap.xml`, `lib/situs.ts` (SITE_URL dipakai `Seo`), `lib/analytics.ts` + panggilan `track` (profil_dibuat, mulai_sesi, selesai_sesi), ikon PWA via `npm.cmd run ikon`, `public/og.png` 1200×630 dari `tools/og.mjs`, `tools/serve-prod.mjs` (server statis gzip untuk audit), e2e `offline.spec.ts` (offline setelah kunjungan pertama + manifest/robots/sitemap).
- **Optimasi performa:** route dipecah dengan `React.lazy` (Beranda/Profil/ProfilBaru tetap eager), validasi zod dimuat saat submit, analitik dimuat 1,2 dtk setelah render, font hanya subset yang dipakai.
- **Verifikasi:** `npm.cmd run cek` (56 unit test), `npm.cmd run e2e` 38 passed, Lighthouse Performance 91 / Accessibility 100 / Best Practices 100 / SEO 100.
- **Sesi berikutnya:** **S11** (konten per bab) — bahan PAI & Inggris sudah tersedia di `bahan/`.

### 2026-11-04 — S9 Area Orang Tua (Selesai)
- **Yang dikerjakan:** `pages/OrtuGerbang.tsx` (perkalian a=12..29 × b=3..9, salah → goyang + soal baru, benar → `sessionStorage sk3:ortu`), guard `ButuhOrtu` di router, `pages/OrtuRapor.tsx` (pilih anak, penguasaan + label "Perlu diulang" < 70%, nilai terbaik, 10 soal sering salah, riwayat 20 sesi, aktivitas 14 hari), `pages/OrtuPengaturan.tsx` (ubah nama/avatar, hapus profil, suara, kecepatan, tema, "Kunci Perlu Dicek", reset 2 langkah ketik `HAPUS`, versi), `lib/versi.ts`.
- **Verifikasi:** `npm.cmd run cek` (56 unit test), `npm.cmd run e2e` 34 passed.
- **Catatan:** dua bug UI nyata ditemukan & diperbaiki — (1) `Dialog` dirender di dalam `motion.div` halaman yang bertransformasi sehingga `position: fixed` tidak mengacu viewport; kini memakai `createPortal` ke `document.body`; (2) panel dialog kini `max-h-[90dvh]` + scroll agar tombol tidak terpotong di layar HP. Tombol `Button` juga tidak lagi memakai hover-lift (hanya `whileTap`) agar target ketuk stabil.
- **Sesi berikutnya:** **S10** (SEO, PWA, ikon, analitik, Lighthouse).

### 2026-11-04 — S8 Bank salah, prestasi, target harian, lencana (Selesai)
- **Yang dikerjakan:** `engine/lencana.ts` (8 lencana, `hariBeruntun`, `evaluasiLencana`, `lencanaBaru`), evaluasi lencana di `cekJawaban`/`selesaikanSesi` + `lencanaBaru` transien (dikecualikan dari `partialize`), `ToastLencana`, `pages/Ulang.tsx`, `pages/Prestasi.tsx` (target, kalender 14 hari, lencana, bintang per mapel), kartu Target Hari Ini di Beranda, badge jumlah soal salah di bottom nav.
- **Verifikasi:** `npm.cmd run cek` (56 unit test), `npm.cmd run e2e` 28 passed.
- **Catatan:** `addInitScript` di `tests/e2e/bantu.ts` menanam state di SETIAP navigasi sehingga progres uji selalu ter-reset; kini hanya menanam bila `sk3:data` belum ada.
- **Sesi berikutnya:** **S9** (Area Orang Tua).

### 2026-11-04 — S7 Ujian bab & ujian gabungan (Selesai)
- **Yang dikerjakan:** mode ujian di `Sesi.tsx` (timer absolut mm:ss + denyut merah < 5 menit, tombol Sebelumnya/Ragu/Berikutnya, grid nomor berwarna, dialog "Masih ada X soal kosong dan Y ragu-ragu", auto-kumpul saat waktu habis), `pages/UjianGabungan.tsx` (pilih mapel + centang bab), tombol "Mulai Ujian Bab" di `BabDetail` (30 menit, 20 soal), e2e `ujian.spec.ts`.
- **Verifikasi:** `npm.cmd run cek` (43 unit test), `npm.cmd run e2e` 24 passed.
- **Catatan:** bug penting ditemukan & diperbaiki — `Dialog` menandai `#root` sebagai `inert` sehingga isi dialognya sendiri tidak bisa diklik; kini fokus dipindah ke panel dialog tanpa `inert`. Uji waktu habis memakai sesi kedaluwarsa yang ditanam (`seedSesiKedaluwarsa`) karena `page.clock` membekukan animasi `AnimatePresence`.
- **Sesi berikutnya:** **S8** (Bank soal salah, prestasi, target harian, lencana).

### 2026-11-04 — S6 Alur latihan, hasil, pembahasan (Selesai)
- **Yang dikerjakan:** aksi sesi di store (`mulaiSesi`, `jawab`, `cekJawaban`, `pindahSoal`, `tandaiRagu`, `selesaikanSesi`, `batalkanSesi`), `lib/sesi.ts`, `lib/tanggal.ts`, `pages/Sesi.tsx` (dialog keluar, petunjuk, umpan balik, pembahasan), `pages/Hasil.tsx` (nilai berhitung, bintang, daftar pembahasan, Ulangi yang Salah), tombol mulai di `BabDetail` + `Materi`, kartu Lanjutkan di Beranda, infra e2e (`VITE_E2E`, `build:e2e`, `tests/e2e/bantu.ts`, `latihan.spec.ts`), tes `build-bersih`.
- **Verifikasi:** `npm.cmd run cek` (43 unit test), `npm.cmd run e2e` 20 passed.
- **Catatan:** bug ditemukan & diperbaiki — guard `Sesi` ikut redirect ke `/beranda` saat `sesiAktif` menjadi null setelah selesai; kini memakai state `keHasil`. Tes `build-bersih` membangun ulang produksi sendiri bila `dist` masih berisi build e2e.
- **Sesi berikutnya:** **S7** (Ujian bab & ujian gabungan).

### 2026-11-04 — S5 Mesin soal & komponen jawaban (Selesai)
- **Yang dikerjakan:** `lib/rng.ts` (mulberry32 + Fisher–Yates), `engine/periksa.ts` (normalisasi, periksa, jawabanLengkap, jawabanBenar), `engine/pilihSoal.ts` (latihan/ujian bab/gabungan/ulang + `buatAcak`), `engine/nilai.ts`, komponen `SoalPG/SoalBS/SoalIsian/SoalJodohkan/SoalUrutkan/SoalUraian/SoalView/Pembahasan/GambarSoal`.
- **Verifikasi:** `npm.cmd run cek` (42 unit test), `npm.cmd run e2e` 18 passed.
- **Catatan:** `tests/setup.ts` kini memanggil `cleanup()` tiap tes (DOM antar-tes sebelumnya bocor). `catatanKunci` tidak pernah dirender ke anak (diuji).
- **Sesi berikutnya:** **S6** (Alur latihan, hasil, pembahasan).

### 2026-11-04 — S4 Model isi & halaman mapel/bab/materi (Selesai)
- **Yang dikerjakan:** `content/types.ts`, `helpers.ts`, `index.ts`, `pai/index.ts` & `inggris/index.ts` (`bab: []`), fixture `__uji__/mapelUji.ts` (2 bab, semua tipe soal & blok), validator `tests/content/validasi.test.ts` (pola ID, kunci, cakupan 15 soal per sub-bab modul), `lib/tts.ts`, `ContentProvider`, `TeksArab`, `TombolBacakan`, `BlokRenderer`, `KartuMateri`, halaman `MapelList`/`BabList`/`BabDetail`/`Materi`, `lib/ringkasan.ts`.
- **Verifikasi:** `npm.cmd run cek` (21 unit test, termasuk validator), `npm.cmd run e2e` 18 passed.
- **Catatan:** tombol mulai latihan/ujian masih `disabled` sesuai rencana (aktif di S6/S7). Fixture sengaja tanpa `gambar`; uji blok `gambar` memakai data URI di tes komponen.
- **Sesi berikutnya:** **S5** (Mesin soal & komponen jawaban).

### 2026-11-04 — S3 Penyimpanan & profil (Selesai)
- **Yang dikerjakan:** `safeStorage` (fallback memori + `bersihkanSemua`), `store/types.ts`, `useApp` (buat/pilih/ubah/hapus profil maks 5, `perbaruiStat`, setTabBab, setPosisiMateri, resetSemua, merge tahan data rusak), `usePref`, `lib/avatar.ts` (12 ikon), halaman `Profil`, `ProfilBaru` (zod), `Beranda` awal, router `/` pengalih + guard `ButuhProfil`.
- **Verifikasi:** `npm.cmd run cek` (14 unit test lulus), `npm.cmd run e2e` 14 passed (profil, tema, navigasi, 404, 360px).
- **Catatan:** `tests/e2e/bantu.ts` menyuntik profil awal via `addInitScript`; spec lama disesuaikan karena beranda kini butuh profil.
- **Sesi berikutnya:** **S4** (Tipe isi, validator, halaman mapel/bab/materi).

### 2026-11-04 — S2 Layout, router, 404 (Selesai)
- **Yang dikerjakan:** `PageShell` (480px, padding bottom nav, transisi geser), `AppHeader` (kembali + judul + aksi), `MobileBottomNav` (4 tab, pil `layoutId`, badge), `Breadcrumbs`, `Seo`, `ErrorBoundary`, `NotFound`, `router.tsx` semua route, `App.tsx` dibungkus `MotionConfig` + `ErrorBoundary` + `Analytics`.
- **Verifikasi:** `npm.cmd run cek` lulus; `e2e navigasi.spec.ts` 6 passed (tab nav, 404, tanpa scroll horizontal 360px).
- **Sesi berikutnya:** **S3** (Penyimpanan & profil).

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
