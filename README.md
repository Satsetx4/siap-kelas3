# Siap Kelas 3

Web app latihan soal & persiapan ulangan sekolah untuk anak Kelas 3 SD (Kurikulum Merdeka).

**Live:** https://siap-kelas3.vercel.app

## Isi

- PAI: 8 bab, 41 kartu materi, 128 soal latihan + 8 uraian
- Bahasa Inggris: 1 bab Classroom Commands (15 soal guru)
- Latihan 10 soal, Ujian Bab 20 soal/30 menit, Ujian Gabungan 25 soal/30 menit
- Lencana, bintang, target harian 10 soal, streak, bank salah
- Area Orang Tua: rapor penguasaan, riwayat, reset (gerbang perkalian)
- PWA offline, terang/gelap, TTS bacakan materi & soal

## Cara menjalankan

```sh
npm install
npm run dev
```

Tes: `npm run cek` (tsc + unit + build), `npm run test:konten` (validasi konten), `npm run e2e` (Playwright).

## Menambah konten

1. Taruh bahan guru di `bahan/<mapel>/` (folder ini diabaikan git).
2. Ikuti `docs/CONTENT_GUIDE.md`: ekstrak → inventaris → tulis `src/content/<mapel>/bab-NN.ts` → daftarkan di `index.ts`.
3. Jalankan `npm run test:konten` + `npm run cek` + e2e `konten.spec.ts` sampai lulus, commit, push.

## Deploy

```sh
vercel whoami            # pastikan akun tim sekawan
vercel deploy --prod --yes --scope sekawan
```

## Dokumen perencanaan

- [`docs/PLAN.md`](./docs/PLAN.md) — spesifikasi S0–S12
- [`docs/CONTENT_GUIDE.md`](./docs/CONTENT_GUIDE.md) — prosedur konten
- [`docs/PROGRESS.md`](./docs/PROGRESS.md) — progres & log sesi

## Instruksi handover untuk agen AI

---

## Instruksi Handover untuk Agen AI (WAJIB DIBACA PERTAMA)

Repositori ini dikerjakan secara bertahap (1 sesi = 1 tugas) agar rapi dan hemat kuota.

1. **Baca [`docs/PROGRESS.md`](./docs/PROGRESS.md)** untuk melihat sesi mana yang terakhir selesai dan sesi mana yang berstatus `- [ ]` berikutnya.
2. **Baca [`docs/PLAN.md`](./docs/PLAN.md)** (bagian **0. Aturan Main Agen** dan rincian sesi yang sedang aktif).
3. Jika mengerjakan sesi konten (`C0` atau `C-<MAPEL>-NN`), **wajib baca [`docs/CONTENT_GUIDE.md`](./docs/CONTENT_GUIDE.md)**.
4. Kerjakan **hanya 1 sesi**, jalankan perintah verifikasinya sampai lulus, perbarui `docs/PROGRESS.md`, lalu `git commit` dan `git push`.

---

## Struktur Dokumen Perencanaan

- [`docs/PLAN.md`](./docs/PLAN.md) — Spesifikasi produk, arsitektur, model data, desain, dan langkah kerja S0–S12.
- [`docs/CONTENT_GUIDE.md`](./docs/CONTENT_GUIDE.md) — Prosedur ekstraksi bahan guru (PDF/Word/Foto), pemotongan gambar soal, penulisan kartu materi, pembuatan bank soal, dan penulisan pembahasan.
- [`docs/PROGRESS.md`](./docs/PROGRESS.md) — Papan progres & log serah terima antar sesi.
