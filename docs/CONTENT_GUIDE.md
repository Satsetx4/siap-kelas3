# Panduan Pengolahan Konten — Siap Kelas 3

> Dokumen ini dipakai pada setiap sesi konten (C0 dan C-xx). Ikuti langkahnya **berurutan**. Tujuannya: **tidak ada satu pun soal guru yang terlewat**, setiap soal punya penjelasan yang mudah dipahami anak kelas 3, dan setiap bagian modul punya bank soal yang lengkap.

---

## 1. Prinsip Utama

1. **Soal guru = suci.** Kalimat soal, pilihan, dan kunci jawaban diketik **persis**. Satu-satunya perubahan yang boleh: membetulkan salah ketik yang jelas (misal "sholaat" → "sholat"), dan perubahan itu wajib dicatat di inventaris kolom "Catatan".
2. **Kunci guru dipakai walau diduga salah.** Isi `catatanKunci` dengan alasan singkat dan jawaban yang menurut agen benar. Contoh: `"Kunci guru: B. Menurut agen yang benar C karena ... Mohon dicek."` Pembahasan tetap ditulis agar **konsisten dengan kunci guru**, tanpa mengatakan kunci itu salah. Catat juga di inventaris.
3. **Bahan tanpa kunci jawaban:** agen menentukan jawaban, lalu tulis di inventaris kolom "Kunci oleh agen = ya". Jangan isi `catatanKunci` untuk kasus ini.
4. **Soal buatan agen hanya dari MODUL** (bahan berisi penjelasan materi). Bahan yang hanya berisi latihan soal **tidak** dibuatkan soal tambahan.
5. **Gambar selalu diambil dari bahan asli** (crop), tidak digambar ulang.
6. **Tulisan Arab tidak boleh diketik dari ingatan** (lihat bagian 6).
7. **Satu sesi = satu bab.** Jangan mengerjakan bab berikutnya di sesi yang sama.

---

## 2. Persiapan Alat (sekali saja, di sesi C0 pertama)

```powershell
python -m pip install pymupdf python-docx pillow
```

### `tools/render_pdf.py`: ubah setiap halaman PDF menjadi PNG (untuk dilihat dan di-crop)
```python
import sys, pathlib, fitz  # pymupdf

src = pathlib.Path(sys.argv[1]); out = pathlib.Path(sys.argv[2]); out.mkdir(parents=True, exist_ok=True)
doc = fitz.open(src)
for i, page in enumerate(doc, start=1):
    page.get_pixmap(dpi=150).save(out / f"{src.stem}-hal{i:03d}.png")
print(f"{len(doc)} halaman -> {out}")
```
Pemakaian: `python tools/render_pdf.py "bahan/pai/LKS PAI.pdf" bahan/pai/_ekstrak/halaman`

### `tools/ekstrak.py`: ambil teks dari PDF/DOCX dan gambar dari DOCX
```python
import sys, pathlib, zipfile, fitz, docx

src = pathlib.Path(sys.argv[1]); out = pathlib.Path(sys.argv[2]); out.mkdir(parents=True, exist_ok=True)
teks = []
if src.suffix.lower() == ".pdf":
    for i, page in enumerate(fitz.open(src), start=1):
        teks.append(f"\n\n===== HALAMAN {i} =====\n" + page.get_text())
elif src.suffix.lower() == ".docx":
    d = docx.Document(src)
    teks = [p.text for p in d.paragraphs]
    for t in d.tables:
        for r in t.rows:
            teks.append(" | ".join(c.text for c in r.cells))
    with zipfile.ZipFile(src) as z:
        for n in z.namelist():
            if n.startswith("word/media/"):
                (out / f"{src.stem}-{pathlib.Path(n).name}").write_bytes(z.read(n))
(out / f"{src.stem}.txt").write_text("\n".join(teks), encoding="utf-8")
print("selesai:", out / f"{src.stem}.txt")
```
Jika teks PDF kosong atau berantakan (hasil scan), gunakan PNG hasil `render_pdf.py` dan **baca gambarnya langsung** (lihat file gambar dengan alat baca file), lalu ketik ulang. Hal yang sama berlaku untuk foto JPG.

### `tools/crop.py`: potong gambar soal → WebP
```python
import sys, pathlib
from PIL import Image

# python tools/crop.py <gambar_sumber> <x1> <y1> <x2> <y2> <tujuan.webp>
src, x1, y1, x2, y2, dst = sys.argv[1], *map(int, sys.argv[2:6]), sys.argv[6]
img = Image.open(src).convert("RGB").crop((x1, y1, x2, y2))
if img.width > 800:
    img = img.resize((800, round(img.height * 800 / img.width)), Image.LANCZOS)
pathlib.Path(dst).parent.mkdir(parents=True, exist_ok=True)
img.save(dst, "WEBP", quality=85)
print(dst, img.size)
```
Cara menentukan koordinat: buka PNG halaman, perkirakan kotak gambar (x1,y1 = kiri-atas; x2,y2 = kanan-bawah, dalam piksel), jalankan crop, lalu **lihat hasilnya**. Jika terpotong atau terlalu lebar, ulangi dengan koordinat baru. Beri margin ±10px. Nama file tujuan: `public/img/soal/<mapelId>/<soalId>.webp`. Untuk gambar pilihan: `<soalId>-a.webp`, `-b`, `-c`, `-d`. Untuk gambar materi: `public/img/materi/<mapelId>/<kartuId>.webp`.

---

## 3. Sesi C0: Inventaris Mapel

**Masukan:** semua file di `bahan/<mapel>/` (user menaruh file di sana; jika belum ada, minta user menaruhnya lalu berhenti).

Langkah:
1. Untuk setiap file: PDF → `render_pdf.py` + `ekstrak.py`; DOCX → `ekstrak.py`; JPG/PNG → salin ke `_ekstrak/halaman/`.
2. Baca seluruh bahan. Kelompokkan setiap file/halaman menjadi:
   - **MODUL**: berisi penjelasan materi (boleh juga ada contoh soal).
   - **LATIHAN**: berisi kumpulan soal saja.
3. Tentukan daftar **bab** mengikuti judul bab di bahan guru (urutan sesuai buku/LKS). Jika bahan tidak menyebut bab, kelompokkan per topik dan beri judul yang jelas.
4. Di setiap bab tentukan **sub-bab** (per subjudul modul, atau per kelompok latihan seperti "Latihan 1", "Penilaian Harian").
5. Buat `content-notes/<mapel>/inventaris.md` dengan format:

```markdown
# Inventaris <Nama Mapel>

## Daftar file bahan
| File | Jenis | Halaman | Bab |
|---|---|---|---|
| LKS PAI.pdf | MODUL+LATIHAN | 1–48 | 1–4 |

## Struktur
### pai-b01 — <Judul Bab>
| Sub-bab | Judul | Sumber | Jenis |
|---|---|---|---|
| pai-b01-s01 | <judul> | LKS hal. 3–5 | MODUL |
| pai-b01-s02 | Latihan Bab 1 | LKS hal. 6–7 | LATIHAN |

### Pemetaan soal guru (diisi saat sesi C-xx)
| Rujukan asli | ID soal | Tipe | Kunci oleh agen? | Gambar | Catatan |
|---|---|---|---|---|---|
| hal. 6 no. 1 | pai-b01-s02-q001 | pg | tidak | - | - |
```
6. Hitung perkiraan jumlah soal guru per bab dan tulis di bawah tabel struktur ("Soal guru: 25").
7. Tambahkan ke `docs/PROGRESS.md` satu baris sesi per bab: `- [ ] C-PAI-01 — <judul bab>`.
8. Commit: `content(<mapel>): inventaris`.

**Kalau bahan kurang jelas** (halaman buram, terpotong): tulis di inventaris bagian "Masalah bahan" dan di PROGRESS "Pertanyaan Terbuka". Lanjutkan bagian lain.

---

## 4. Sesi C-<MAPEL>-NN: Mengerjakan Satu Bab

### Langkah 1: Siapkan file bab
Buat `src/content/<mapel>/bab-NN.ts`:
```ts
import type { Bab } from '../types';
export const bab01: Bab = {
  id: 'pai-b01', nomor: 1, judul: '<Judul Bab>',
  subBab: [ /* diisi di langkah berikut */ ],
};
```
Daftarkan di `src/content/<mapel>/index.ts`: `bab: [bab01, ...]` (urut nomor).

### Langkah 2: Ketik semua soal guru (sub-bab LATIHAN dan contoh soal di MODUL)
- Buka sumber per halaman. Untuk **setiap nomor soal**, buat satu objek `Soal` dengan `sumber: 'guru'` dan `rujukan: '<file> hal. X no. Y'`.
- Pemetaan bentuk soal ke tipe:

| Bentuk di bahan | Tipe |
|---|---|
| Pilihan a/b/c/d | `pg` (kunci = indeks: a=0, b=1, c=2, d=3) |
| "Benar atau salah" / B-S | `bs` |
| Isian titik-titik dengan jawaban 1–3 kata | `isian` (tulis semua variasi wajar di `kunci`, misal `["sholat", "salat", "shalat"]`) |
| Menjodohkan | `jodohkan` |
| Mengurutkan | `urutkan` |
| Uraian / esai / "jelaskan" | `uraian` (tulis `contohJawaban` 1–3 kalimat sederhana) |
| Isian yang jawabannya panjang (> 3 kata) | `uraian` |

- Soal dengan gambar → crop (bagian 2) → isi `gambar` dan `gambarAlt` (deskripsi singkat apa yang terlihat, **tanpa** membocorkan jawaban).
- Isi tabel "Pemetaan soal guru" di inventaris untuk **setiap** soal.
- ID soal berurutan per sub-bab: `q001`, `q002`, … Soal guru selalu didahulukan, soal buatan setelahnya.

### Langkah 3: Tulis kartu materi (hanya sub-bab MODUL)
- 3–8 kartu per sub-bab. Setiap kartu memuat **satu gagasan**, maksimal ±80 kata.
- Susunan kartu yang disarankan: (1) pengantar dekat dengan kehidupan anak, (2–n) isi inti, (n) kotak `ingat` berisi ringkasan.
- Pakai jenis blok yang sesuai: `poin` untuk daftar, `contoh` untuk contoh, `arab` untuk ayat/doa (bagian 6), `kosakata` untuk daftar kata Inggris (bagian 7), `gambar` untuk ilustrasi dari modul (crop).
- Bahasa: kalimat pendek (≤ 15 kata), sapaan "kamu", tanpa istilah sulit. Jika istilah wajib dipakai, langsung jelaskan ("**Wudu** artinya bersuci sebelum sholat").
- Isi materi **hanya** dari modul guru (boleh disederhanakan). Jangan menambah materi di luar modul.
- ID kartu: `<subBabId>-k01`, `-k02`, …

### Langkah 4: Buat bank soal buatan (hanya sub-bab MODUL)
Target per sub-bab MODUL (dihitung bersama soal guru yang sudah ada di sub-bab itu):
- **Minimal 15 soal dinilai**, idealnya 15–20.
- Komposisi level: ±40% `mudah`, ±40% `sedang`, ±20% `menantang` (validator: ≥ 4 / ≥ 4 / ≥ 2).
- Komposisi tipe: ±50% `pg`, sisanya campuran `bs`, `isian`, `jodohkan`, `urutkan` (minimal 3 tipe berbeda per sub-bab). Boleh tambah 1–2 `uraian` (tidak dihitung).
- **Setiap poin/gagasan di kartu materi wajib punya minimal 1 soal.** Buat daftar centang gagasan → soal di inventaris bagian "Cakupan materi".

Definisi level untuk kelas 3:
| Level | Arti | Contoh (PAI) |
|---|---|---|
| mudah | Mengingat langsung isi materi | "Sholat Subuh dikerjakan … rakaat." |
| sedang | Memahami/mengenali dalam contoh | "Rina bangun tidur. Doa apa yang ia baca?" |
| menantang | Menerapkan pada situasi baru / 2 langkah berpikir | "Dodi sudah wudu lalu kentut. Apa yang harus ia lakukan sebelum sholat?" |

Aturan menulis soal buatan:
- Gaya dan tingkat bahasa **meniru soal guru**.
- Hanya **satu** jawaban benar yang jelas. Pengecoh masuk akal (berasal dari materi yang sama), tidak konyol.
- Dilarang memakai pilihan "semua benar" / "semua salah". Kata "kecuali/bukan" hanya untuk level menantang dan ditulis **tebal huruf kapital**: "KECUALI".
- Panjang pilihan kira-kira setara (jawaban benar jangan selalu yang terpanjang).
- **Sebar posisi kunci pg** secara merata (a/b/c/d) dalam satu sub-bab.
- Nama tokoh: nama anak Indonesia yang beragam (Rina, Dodi, Siti, Bayu, Aisyah, Made, Putri, Fajar). Jangan pakai "John Doe" atau nama orang terkenal.
- Konteks dekat dengan kehidupan anak: rumah, sekolah, masjid, keluarga, bermain.
- Tidak boleh ada soal yang jawabannya bergantung pada pendapat.
- `petunjuk` (opsional, disarankan untuk level sedang/menantang): arahkan cara berpikir tanpa memberi jawaban. Contoh: "Ingat lagi urutan wudu di kartu ke-3."

### Langkah 5: Tulis pembahasan untuk SEMUA soal (guru dan buatan)
Format `pembahasan: string[]`, 2–4 butir:
1. **Apa yang ditanya** (ulang dengan kata sederhana).
2. **Kunci pengetahuan** (fakta/aturan dari materi).
3. **Mengapa jawabannya itu** dan (untuk pg) mengapa pengecoh utama salah.
4. (Opsional) **Tips mengingat**.

Contoh BAGUS:
```ts
pembahasan: [
  'Soal ini menanyakan jumlah rakaat sholat Maghrib.',
  'Ingat: Subuh 2, Zuhur 4, Asar 4, Maghrib 3, Isya 4.',
  'Jadi sholat Maghrib ada 3 rakaat. Jawabannya C.',
  'Tips: Maghrib adalah satu-satunya sholat wajib yang rakaatnya 3.',
]
```

Contoh BURUK (dilarang): `['Jawabannya C.']` atau penjelasan panjang lebih dari 4 butir, atau memakai istilah sulit tanpa penjelasan.

Pembahasan untuk soal Bahasa Inggris tetap ditulis dalam Bahasa Indonesia (bagian 7).

### Langkah 6: Validasi & cakupan
1. `npm.cmd run test:konten`. Perbaiki semua error.
2. Pastikan di inventaris: jumlah baris "Pemetaan soal guru" untuk bab ini = jumlah soal guru di bahan, dan semua kolom ID terisi.
3. Pastikan daftar "Cakupan materi" sudah tercentang semua.
4. `npm.cmd run cek`, lalu `npm.cmd run e2e -- konten.spec.ts`.
5. Lihat cepat 3 soal acak di browser (screenshot Playwright 360px): gambar tampil, teks Arab rapi, tidak ada teks terpotong.

### Langkah 7: Tutup sesi
Centang sesi di `PROGRESS.md`, isi log (jumlah soal guru, soal buatan, catatan kunci), lalu commit dan push: `content(pai): bab 01 <judul>`.

---

## 5. Contoh Lengkap File Bab (sebagai acuan bentuk)

> Isi di bawah adalah **contoh format**, bukan isi sebenarnya. Isi sebenarnya harus berasal dari bahan guru.

```ts
import type { Bab } from '../types';

export const bab01: Bab = {
  id: 'pai-b01',
  nomor: 1,
  judul: 'Contoh Judul Bab',
  subBab: [
    {
      id: 'pai-b01-s01',
      judul: 'Contoh Sub-bab Modul',
      materi: [
        {
          id: 'pai-b01-s01-k01',
          judul: 'Kenalan dulu, yuk!',
          isi: [
            { jenis: 'paragraf', teks: 'Setiap hari kita makan. Sebelum makan, kita berdoa dulu.' },
            { jenis: 'arab', arab: '<TEKS ARAB DARI BAHAN, SUDAH DIVERIFIKASI>', latin: '<latin dari bahan>', arti: '<arti dari bahan>' },
            { jenis: 'ingat', teks: 'Berdoa sebelum makan supaya makanan kita berkah.' },
          ],
        },
      ],
      soal: [
        {
          id: 'pai-b01-s01-q001', tipe: 'pg', sumber: 'guru', rujukan: 'LKS hal. 4 no. 1', level: 'mudah',
          pertanyaan: 'Sebelum makan, kita membaca …',
          pilihan: ['doa sebelum tidur', 'doa sebelum makan', 'doa keluar rumah', 'doa masuk masjid'],
          kunci: 1,
          pembahasan: [
            'Soal ini menanyakan doa yang dibaca sebelum makan.',
            'Setiap kegiatan punya doanya sendiri.',
            'Karena kegiatannya makan, kita membaca doa sebelum makan. Jawabannya B.',
          ],
        },
        {
          id: 'pai-b01-s01-q002', tipe: 'bs', sumber: 'buatan', level: 'mudah',
          pertanyaan: 'Berdoa sebelum makan cukup dilakukan di rumah saja.',
          kunci: false,
          pembahasan: ['Kita berdoa setiap kali akan makan.', 'Di rumah, di sekolah, atau di mana saja tetap berdoa.', 'Jadi pernyataan itu salah.'],
        },
        {
          id: 'pai-b01-s01-q003', tipe: 'urutkan', sumber: 'buatan', level: 'sedang',
          pertanyaan: 'Urutkan kegiatan Bayu saat makan siang!',
          urutanBenar: ['Mencuci tangan', 'Berdoa sebelum makan', 'Makan dengan tangan kanan', 'Berdoa sesudah makan'],
          petunjuk: 'Mulai dari yang dilakukan sebelum duduk di meja makan.',
          pembahasan: ['Sebelum makan, tangan harus bersih dulu.', 'Lalu berdoa, makan dengan tangan kanan, dan ditutup doa sesudah makan.'],
        },
      ],
    },
  ],
};
```

---

## 6. Aturan Khusus PAI

1. **Teks Arab** (ayat, doa, kalimat thayyibah, huruf hijaiyah):
   - Sumber utama: **bahan guru**. Ketik ulang dengan harakat lengkap (Unicode Arab). Jangan memakai gambar untuk teks Arab, kecuali bagian 6.3.
   - **Ayat Al-Qur'an wajib dicocokkan** dengan Qur'an Kemenag (https://quran.kemenag.go.id) atau API `https://api.alquran.cloud/v1/ayah/<surah>:<ayat>/quran-uthmani`. Jika ejaan Arab di bahan guru berbeda tipis karena standar rasm Indonesia, **pakai versi bahan guru** dan catat di inventaris.
   - **Doa harian** dan teks non-ayat: pakai versi bahan guru apa adanya.
   - Setelah mengetik, bandingkan sekali lagi huruf per huruf dengan gambar bahan (zoom crop jika perlu).
   - Jika teks Arab **tidak bisa** dipastikan benar (bahan buram dan tidak ada sumber pembanding), pakai crop gambar dari bahan (blok `gambar` di materi, atau field `gambar` di soal), lalu catat di "Masalah bahan".
2. **Latin & arti**: ambil dari bahan guru. Jika bahan tidak menyediakan, ambil dari Qur'an Kemenag (terjemahan resmi), lalu sederhanakan **hanya** di kartu materi, bukan di soal guru.
3. **Tidak ada tombol Bacakan untuk teks Arab.** Field `arab` dan blok `arab` otomatis dilewati oleh TTS (`tts.ts` membuang karakter Arab).
4. **Isi keagamaan hanya dari bahan guru.** Jangan menambah pendapat, hukum fikih, atau kisah yang tidak ada di modul. Soal buatan hanya menguji isi modul.
5. Ejaan istilah ikuti bahan guru (misal "sholat" vs "salat"), dan konsisten dalam satu mapel. Untuk `isian`, masukkan variasi ejaan umum ke `kunci`.
6. Soal hafalan ayat ("lanjutkan ayat berikut") → pakai `pg` dengan pilihan teks Arab (`pilihan` berisi teks Arab) atau `urutkan` potongan ayat. Komponen merender teks yang mengandung huruf Arab dengan font Arab dan `dir="rtl"` (deteksi `/[\u0600-\u06FF]/`).

---

## 7. Aturan Khusus Bahasa Inggris

1. **Soal tetap berbahasa Inggris** sesuai bahan. **Petunjuk, pembahasan, `gambarAlt`, dan judul kartu materi** ditulis dalam Bahasa Indonesia (kosakata Inggris yang dibahas tetap ditulis dalam Inggris).
2. Kartu materi kosakata memakai blok `kosakata` (`en`, `id`, opsional `gambar` dari bahan). Setiap item punya tombol dengar `en-US` (otomatis di `BlokRenderer`).
3. **Soal "Dengarkan lalu pilih"** (soal buatan, hanya untuk sub-bab MODUL): minimal **3 per sub-bab** yang berisi kosakata/kalimat.
   ```ts
   {
     id: 'inggris-b01-s01-q016', tipe: 'pg', sumber: 'buatan', level: 'mudah',
     pertanyaan: 'Dengarkan, lalu pilih kata yang kamu dengar.',
     audio: { teks: 'yellow', lang: 'en-US' },
     pilihan: ['yellow', 'yellows', 'hello', 'jelly'],
     kunci: 0,
     pembahasan: ['Kata yang dibacakan adalah "yellow".', '"Yellow" artinya kuning.', 'Perhatikan bunyi awal "ye-" dan akhiran "-low".'],
   }
   ```
   Variasi: dengar kata → pilih arti Indonesia; dengar kata → pilih gambar (`pilihanGambar` dari crop bahan); dengar kalimat pendek → pilih jawaban.
   `audio.teks` maksimal 8 kata. Pertanyaan tidak boleh memuat teks yang dibacakan.
4. Pembahasan wajib menyebut **arti** kata kunci dan, bila relevan, pola sederhana (misal: "Untuk benda lebih dari satu, biasanya ditambah -s: *cat* → *cats*.").
5. Untuk `isian` Inggris, `kunci` berisi variasi yang benar (misal `["it's", "it is"]`). Pemeriksaan sudah mengabaikan huruf besar dan tanda baca.
6. Hindari soal ejaan yang menjebak di level mudah.

---

## 8. Daftar Periksa per Bab (salin ke log PROGRESS)

- [ ] Semua soal guru bab ini sudah punya ID (cocok dengan jumlah di bahan).
- [ ] Semua soal punya pembahasan 2–4 butir, berbahasa Indonesia sederhana.
- [ ] Sub-bab MODUL: ≥ 15 soal dinilai, level dan tipe sesuai, semua gagasan materi tercakup.
- [ ] Inggris: ≥ 3 soal dengar per sub-bab MODUL.
- [ ] Gambar sudah di-crop, dicek visual, dan `gambarAlt` terisi.
- [ ] Teks Arab sudah dicocokkan (ayat dengan sumber resmi, doa dengan bahan).
- [ ] Kunci yang diduga salah → `catatanKunci` + catatan di inventaris.
- [ ] `npm.cmd run test:konten` dan `npm.cmd run cek` lulus.
