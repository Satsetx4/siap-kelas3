import type { Bab } from '../types';

export const bab04: Bab = {
  id: 'pai-b04',
  nomor: 4,
  judul: 'Hadis tentang Kewajiban Salat',
  subBab: [
    {
      id: 'pai-b04-s01',
      judul: 'Salat Lima Waktu dan Hadisnya',
      materi: [
        {
          id: 'pai-b04-s01-k01',
          judul: 'Apa itu salat?',
          isi: [
            { jenis: 'paragraf', teks: 'Salat adalah ibadah kepada Allah Swt. yang diawali dengan takbiratul ihram dan diakhiri dengan salam.' },
            { jenis: 'poin', item: ['Disertai bacaan tertentu.', 'Disertai gerakan tertentu sesuai syariat Islam.'] },
            { jenis: 'ingat', teks: 'Salat diawali takbiratul ihram dan diakhiri salam.' },
          ],
        },
        {
          id: 'pai-b04-s01-k02',
          judul: 'Salat fardu lima waktu',
          isi: [
            { jenis: 'paragraf', teks: 'Salat fardu lima waktu wajib dilaksanakan oleh setiap muslim yang telah memenuhi syarat.' },
            { jenis: 'poin', item: ['Subuh.', 'Zuhur.', 'Asar.', 'Magrib.', 'Isya.'] },
          ],
        },
        {
          id: 'pai-b04-s01-k03',
          judul: 'Hadis tentang salat',
          isi: [
            { jenis: 'paragraf', teks: 'Rasulullah saw. bersabda tentang lima perkara dalam Islam.' },
            { jenis: 'arab', arab: 'بُنِيَ الْإِسْلَامُ عَلَى خَمْسٍ', latin: 'Buniyal-Islāmu ‘alā khamsin.', arti: 'Islam dibangun di atas lima perkara.' },
            { jenis: 'contoh', teks: 'Hadis ini diriwayatkan oleh Imam Bukhari dan Imam Muslim. Salah satu dari lima perkara itu adalah mendirikan salat.' },
          ],
        },
        {
          id: 'pai-b04-s01-k04',
          judul: 'Salat lima waktu itu wajib',
          isi: [
            { jenis: 'paragraf', teks: 'Allah mewajibkan lima salat dalam sehari semalam.' },
            { jenis: 'contoh', teks: 'Hadis tentang kewajiban ini juga diriwayatkan oleh Imam Bukhari dan Imam Muslim.' },
            { jenis: 'poin', item: ['Membiasakan salat sejak kecil.', 'Salat mendekatkan diri kepada Allah Swt.'] },
          ],
        },
        {
          id: 'pai-b04-s01-k05',
          judul: 'Manfaat dan sikap membiasakan salat',
          isi: [
            { jenis: 'poin', item: ['Mengingat Allah Swt.', 'Melatih kedisiplinan dan tanggung jawab.', 'Membiasakan hidup bersih melalui wudu.', 'Melatih kesabaran dan ketertiban.', 'Membantu menjauhi perbuatan buruk.'] },
            { jenis: 'poin', item: ['Salat tepat waktu sesuai bimbingan orang tua dan guru.', 'Berwudu sebelum salat dan memakai pakaian bersih yang menutup aurat.', 'Mengikuti salat berjamaah dengan tertib dan mengajak keluarga serta teman dengan santun.'] },
            { jenis: 'ingat', teks: 'Biasakan salat sejak kecil dengan tertib dan bersih.' },
          ],
        },
      ],
      soal: [
        {
          id: 'pai-b04-s01-q001', tipe: 'pg', sumber: 'buatan', level: 'mudah',
          pertanyaan: 'Salat diawali dengan ... dan diakhiri dengan salam.',
          pilihan: ['takbiratul ihram', 'berwudu', 'adzan', 'doa bersama'],
          kunci: 0,
          pembahasan: ['Soal menanyakan awal salat.', 'Salat diawali dengan takbiratul ihram.', 'Jadi jawabannya takbiratul ihram.'],
        },
        {
          id: 'pai-b04-s01-q002', tipe: 'bs', sumber: 'buatan', level: 'mudah',
          pertanyaan: 'Salat fardu ada lima waktu dalam sehari semalam.',
          kunci: true,
          pembahasan: ['Salat fardu berjumlah lima waktu.', 'Yaitu Subuh, Zuhur, Asar, Magrib, dan Isya.', 'Jadi pernyataan itu benar.'],
        },
        {
          id: 'pai-b04-s01-q003', tipe: 'isian', sumber: 'buatan', level: 'mudah',
          pertanyaan: 'Sebutkan salah satu salat fardu lima waktu!',
          kunci: ['subuh', 'zuhur', 'asar', 'magrib', 'maghrib', 'isya', 'isya’'],
          pembahasan: ['Lima salat fardu: Subuh, Zuhur, Asar, Magrib, Isya.', 'Salah satunya sudah benar.'],
        },
        {
          id: 'pai-b04-s01-q004', tipe: 'pg', sumber: 'buatan', level: 'mudah',
          pertanyaan: 'Buniyal-Islāmu ‘alā khamsin artinya ...',
          pilihan: ['Salatlah sebelum terlambat', 'Islam dibangun di atas lima perkara', 'Wudu adalah kunci salat', 'Salat menghapus semua dosa'],
          kunci: 1,
          pembahasan: ['Itu arti hadis tentang salat.', 'Artinya Islam dibangun di atas lima perkara.', 'Jadi jawabannya pilihan kedua.'],
        },
        {
          id: 'pai-b04-s01-q005', tipe: 'pg', sumber: 'buatan', level: 'mudah',
          pertanyaan: 'Hadis tentang kewajiban salat diriwayatkan oleh ...',
          pilihan: ['Imam Bukhari dan Imam Muslim', 'Malaikat Jibril', 'para sahabat saja', 'guru di sekolah'],
          kunci: 0,
          pembahasan: ['Bahan menyebut dua perawi.', 'Yaitu Imam Bukhari dan Imam Muslim.', 'Jadi jawabannya pilihan pertama.'],
        },
        {
          id: 'pai-b04-s01-q006', tipe: 'bs', sumber: 'buatan', level: 'mudah',
          pertanyaan: 'Sebelum salat, kita berwudu dan memakai pakaian bersih yang menutup aurat.',
          kunci: true,
          pembahasan: ['Itu sikap membiasakan salat.', 'Berwudu dan berpakaian bersih menutup aurat.', 'Jadi pernyataan itu benar.'],
        },
        {
          id: 'pai-b04-s01-q007', tipe: 'pg', sumber: 'buatan', level: 'sedang',
          pertanyaan: 'Salah satu dari lima perkara dalam hadis adalah ...',
          pilihan: ['berpuasa setahun penuh', 'mendirikan salat', 'membangun masjid', 'membaca buku'],
          kunci: 1,
          petunjuk: 'Ingat isi kartu hadis tentang salat.',
          pembahasan: ['Hadis menyebut lima perkara.', 'Salah satunya adalah mendirikan salat.', 'Jadi jawabannya mendirikan salat.'],
        },
        {
          id: 'pai-b04-s01-q008', tipe: 'isian', sumber: 'buatan', level: 'sedang',
          pertanyaan: 'Salat fardu yang dikerjakan pada sore hari sebelum Magrib adalah salat ...',
          kunci: ['asar', 'ashar'],
          pembahasan: ['Urutan salat: Subuh, Zuhur, Asar, Magrib, Isya.', 'Sebelum Magrib adalah Asar.', 'Jadi jawabannya Asar.'],
        },
        {
          id: 'pai-b04-s01-q009', tipe: 'pg', sumber: 'buatan', level: 'sedang',
          pertanyaan: 'Manfaat salat berikut ini yang berkaitan dengan kebersihan adalah ...',
          pilihan: ['mengingat Allah Swt.', 'membiasakan hidup bersih melalui wudu', 'melatih kesabaran dan ketertiban', 'menjauhi perbuatan buruk'],
          kunci: 1,
          pembahasan: ['Salah satu manfaat salat adalah hidup bersih.', 'Caranya melalui wudu sebelum salat.', 'Jadi jawabannya membiasakan hidup bersih melalui wudu.'],
        },
        {
          id: 'pai-b04-s01-q010', tipe: 'jodohkan', sumber: 'buatan', level: 'sedang',
          pertanyaan: 'Jodohkan sikap dengan maknanya!',
          pasangan: [
            { kiri: 'Salat tepat waktu', kanan: 'sesuai bimbingan orang tua dan guru' },
            { kiri: 'Berwudu sebelum salat', kanan: 'membiasakan hidup bersih' },
            { kiri: 'Salat berjamaah dengan tertib', kanan: 'mengikuti dengan santun' },
          ],
          pembahasan: ['Salat tepat waktu sesuai bimbingan orang tua dan guru.', 'Berwudu membiasakan hidup bersih.', 'Berjamaah dilakukan dengan tertib dan santun.'],
        },
        {
          id: 'pai-b04-s01-q011', tipe: 'bs', sumber: 'buatan', level: 'sedang',
          pertanyaan: 'Salat hanya kewajiban, bukan sarana mendekatkan diri kepada Allah.',
          kunci: false,
          pembahasan: ['Salat memang kewajiban.', 'Tapi juga sarana mendekatkan diri kepada Allah.', 'Jadi pernyataan itu salah.'],
        },
        {
          id: 'pai-b04-s01-q012', tipe: 'pg', sumber: 'buatan', level: 'sedang',
          pertanyaan: 'Bayu mengajak adiknya salat dengan santun. Sikap Bayu menunjukkan ...',
          pilihan: ['membiasakan salat dengan santun', 'menunda salat', 'salat sendirian saja', 'bermain saat adzan'],
          kunci: 0,
          pembahasan: ['Mengajak keluarga dan teman dengan santun itu baik.', 'Itu sikap membiasakan salat.', 'Jadi jawabannya membiasakan salat dengan santun.'],
        },
        {
          id: 'pai-b04-s01-q013', tipe: 'urutkan', sumber: 'buatan', level: 'menantang',
          pertanyaan: 'Urutkan salat fardu dari pagi sampai malam!',
          urutanBenar: ['Subuh', 'Zuhur', 'Asar', 'Magrib', 'Isya'],
          pembahasan: ['Urutan lima waktu: Subuh, Zuhur, Asar, Magrib, Isya.', 'Hafalkan urutan ini agar tidak tertukar.'],
        },
        {
          id: 'pai-b04-s01-q014', tipe: 'pg', sumber: 'buatan', level: 'menantang',
          pertanyaan: 'Pernyataan yang tepat tentang salat fardu adalah ...',
          pilihan: ['Hanya wajib bagi orang dewasa, anak bebas salat', 'Wajib bagi setiap muslim yang memenuhi syarat, dibiasakan sejak kecil', 'Cukup dikerjakan saat hari raya', 'Tidak perlu berwudu jika pakaian bersih'],
          kunci: 1,
          petunjuk: 'Ingat siapa yang wajib dan kapan membiasakannya.',
          pembahasan: ['Salat fardu wajib bagi muslim yang memenuhi syarat.', 'Anak belajar membiasakannya sejak kecil.', 'Berwudu tetap dilakukan sebelum salat.'],
        },
        {
          id: 'pai-b04-s01-q015', tipe: 'bs', sumber: 'buatan', level: 'menantang',
          pertanyaan: 'Mengikuti salat berjamaah dengan tertib termasuk sikap membiasakan salat.',
          kunci: true,
          pembahasan: ['Bahan menyebut sikap itu.', 'Berjamaah dengan tertib itu baik.', 'Jadi pernyataan itu benar.'],
        },
        {
          id: 'pai-b04-s01-q016', tipe: 'isian', sumber: 'buatan', level: 'menantang',
          pertanyaan: 'Salat diakhiri dengan ...',
          kunci: ['salam'],
          pembahasan: ['Salat diawali takbiratul ihram.', 'Salat diakhiri dengan salam.', 'Jadi jawabannya salam.'],
        },
        {
          id: 'pai-b04-s01-q017', tipe: 'uraian', sumber: 'buatan', level: 'sedang',
          pertanyaan: 'Tuliskan dua caramu membiasakan salat dalam sehari-hari!',
          contohJawaban: 'Saya salat tepat waktu dan berwudu sebelum salat dengan pakaian bersih.',
          pembahasan: ['Jawaban boleh berbeda asal sesuai bahan.', 'Contohnya tepat waktu, berwudu, pakaian bersih, berjamaah tertib.'],
        },
      ],
    },
  ],
};
