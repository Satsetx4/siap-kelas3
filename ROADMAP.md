# Roadmap siap-kelas3

Web app latihan soal Kelas 3 SD Kurikulum Merdeka, live di siap-kelas3.vercel.app. Isi: PAI 8 bab (41 kartu materi, 128 soal + 8 uraian), Inggris 1 bab Classroom Commands (15 soal guru). Fitur: Latihan 10 soal, Ujian Bab 20 soal/30 mnt, Gabungan 25 soal/30 mnt, lencana + streak + bank salah, Area Ortu (rapor, gerbang perkalian), PWA offline, TTS. Status: v1.0 rilis (S0–S10 + C-PAI-01..08 + C-ING-01), suite 60/60 hijau.

## Fase 1 — Stabilkan v1.0 live
- [ ] Verifikasi URL produksi di PROGRESS.md (masih tulis "belum di-deploy")
- [x] v1.0 rilis: suite 60/60 hijau (mapel.spec diperbaiki 9 Nov 2026)
- [ ] Jalankan `npm run cek` (tsc + unit + build) + `test:konten` + e2e hingga hijau di main
- [ ] Uji offline PWA + audit Lighthouse pasca-rilis
- [ ] Tambah ROADMAP.md ini agar keluar dari status NONE

## Fase 2 — Tambah mapel baru (per bahan guru)
- [ ] Taruh bahan di `bahan/<mapel>/` lalu jalankan sesi C0 (inventaris + daftar bab)
- [ ] Tulis `src/content/<mapel>/bab-NN.ts` + daftar di `index.ts` ikut `CONTENT_GUIDE.md`
- [ ] Prioritas: Matematika Kelas 3 (belum ada) lalu Tematik/B. Indonesia
- [ ] Tiap bab: kartu materi + TTS + 10+ soal lolos `test:konten`

## Fase 3 — Kualitas konten + kunci
- [ ] Sisir daftar "Kunci Perlu Dicek" di Area Ortu hingga kosong
- [ ] Verifikasi guru untuk soal PAI modul (8 bab tanpa soal guru di bahan)
- [ ] Perluas bank Inggris (baru 1 bab, 15 soal) ke bab-02+
- [ ] Jaga suite 60/60 + `mapel.spec.ts` hijau tiap batch konten

## Fase 4 — Operasional sekolah
- [ ] Sinkron kalender ulangan (ujian bab/gabungan ikuti jadwal sekolah)
- [ ] Prosedur reset data + rapor ortu tiap semester baru
- [ ] Jaga TTS + tema terang/gelap + MobileBottomNav di HP murah
- [ ] Tag rilis per semester (v1.x) agar bank soal stabil saat ujian
