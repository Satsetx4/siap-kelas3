import type { Mapel } from '../types';

/**
 * Data uji internal untuk tes komponen dan e2e.
 * Hanya dimuat saat build mode e2e (lihat docs/PLAN.md S6 langkah 5).
 * Tidak memakai `gambar` agar validator berkas gambar tidak gagal.
 */
export const mapelUji: Mapel = {
  id: 'uji',
  nama: 'Mapel Uji',
  namaPendek: 'Uji',
  ikon: 'Star',
  warna: 'jeruk',
  bab: [
    {
      id: 'uji-b01',
      nomor: 1,
      judul: 'Bab Uji Satu',
      subBab: [
        {
          id: 'uji-b01-s01',
          judul: 'Penjumlahan Dasar',
          materi: [
            {
              id: 'uji-b01-s01-k01',
              judul: 'Kenalan dengan penjumlahan',
              isi: [
                { jenis: 'paragraf', teks: 'Menjumlah artinya menggabungkan dua bilangan menjadi satu bilangan baru.' },
                { jenis: 'poin', item: ['Dua apel ditambah tiga apel menjadi lima apel.', 'Lambang tambah adalah tanda plus.'] },
                { jenis: 'contoh', teks: '2 + 3 = 5' },
                { jenis: 'ingat', teks: 'Hasil penjumlahan selalu lebih besar atau sama dengan bilangan asalnya.' },
              ],
            },
            {
              id: 'uji-b01-s01-k02',
              judul: 'Contoh dalam kehidupan',
              isi: [
                { jenis: 'paragraf', teks: 'Rina punya 4 pensil. Bayu memberi 2 pensil lagi. Pensil Rina menjadi 6.' },
                { jenis: 'contoh', teks: '4 + 2 = 6' },
              ],
            },
          ],
          soal: [
            {
              id: 'uji-b01-s01-q001', tipe: 'pg', sumber: 'guru', level: 'mudah',
              pertanyaan: '2 + 3 = ...', pilihan: ['4', '5', '6', '7'], kunci: 1,
              pembahasan: ['Soal meminta hasil penjumlahan 2 dan 3.', 'Hitung maju tiga langkah dari 2: 3, 4, 5.', 'Jadi jawabannya 5.'],
            },
            {
              id: 'uji-b01-s01-q002', tipe: 'pg', sumber: 'buatan', level: 'mudah',
              pertanyaan: '4 + 1 = ...', pilihan: ['3', '4', '5', '6'], kunci: 2,
              pembahasan: ['Empat ditambah satu berarti satu langkah setelah 4.', 'Langkah setelah 4 adalah 5.', 'Jadi jawabannya 5.'],
            },
            {
              id: 'uji-b01-s01-q003', tipe: 'pg', sumber: 'buatan', level: 'sedang',
              pertanyaan: 'Rina punya 6 kelereng, lalu diberi 3 lagi. Berapa kelereng Rina sekarang?',
              pilihan: ['8', '9', '10', '11'], kunci: 1,
              petunjuk: 'Gabungkan dua bilangan itu.',
              pembahasan: ['Kelereng Rina bertambah, jadi dijumlahkan.', '6 + 3 = 9.', 'Jadi jawabannya 9.'],
            },
            {
              id: 'uji-b01-s01-q004', tipe: 'bs', sumber: 'buatan', level: 'mudah',
              pertanyaan: '5 + 2 hasilnya 7.', kunci: true,
              pembahasan: ['Hitung dua langkah setelah 5: 6 lalu 7.', 'Jadi 5 + 2 memang 7.'],
            },
            {
              id: 'uji-b01-s01-q005', tipe: 'bs', sumber: 'buatan', level: 'sedang',
              pertanyaan: 'Hasil penjumlahan selalu lebih kecil dari bilangan asalnya.', kunci: false,
              pembahasan: ['Penjumlahan menggabungkan, jadi hasilnya bertambah.', 'Hasilnya lebih besar, bukan lebih kecil.'],
            },
            {
              id: 'uji-b01-s01-q006', tipe: 'isian', sumber: 'buatan', level: 'mudah',
              pertanyaan: '7 + 2 = ...', kunci: ['9'],
              pembahasan: ['Hitung dua langkah setelah 7: 8 lalu 9.', 'Jadi jawabannya 9.'],
            },
            {
              id: 'uji-b01-s01-q007', tipe: 'isian', sumber: 'buatan', level: 'sedang',
              pertanyaan: 'Bayu punya 5 buku, diberi 4 buku lagi. Buku Bayu sekarang ... buah.', kunci: ['9'],
              petunjuk: 'Jumlahkan buku lama dan buku baru.',
              pembahasan: ['Buku bertambah, jadi dijumlahkan.', '5 + 4 = 9.', 'Jadi jawabannya 9.'],
            },
            {
              id: 'uji-b01-s01-q008', tipe: 'jodohkan', sumber: 'buatan', level: 'sedang',
              pertanyaan: 'Jodohkan soal dengan hasilnya!',
              pasangan: [{ kiri: '1 + 1', kanan: '2' }, { kiri: '2 + 2', kanan: '4' }, { kiri: '3 + 3', kanan: '6' }],
              pembahasan: ['Hitung setiap penjumlahan satu per satu.', '1 + 1 = 2, 2 + 2 = 4, 3 + 3 = 6.'],
            },
            {
              id: 'uji-b01-s01-q009', tipe: 'jodohkan', sumber: 'buatan', level: 'menantang',
              pertanyaan: 'Jodohkan cerita dengan penjumlahan yang sesuai!',
              pasangan: [
                { kiri: 'Dua apel dan tiga apel', kanan: '2 + 3' },
                { kiri: 'Empat pensil dan satu pensil', kanan: '4 + 1' },
                { kiri: 'Lima buku dan lima buku', kanan: '5 + 5' },
              ],
              pembahasan: ['Setiap cerita berisi dua kelompok benda.', 'Kelompok pertama dan kedua dijumlahkan sesuai urutan cerita.'],
            },
            {
              id: 'uji-b01-s01-q010', tipe: 'urutkan', sumber: 'buatan', level: 'sedang',
              pertanyaan: 'Urutkan hasil penjumlahan dari yang terkecil!',
              urutanBenar: ['1 + 1', '2 + 2', '3 + 3', '4 + 4'],
              petunjuk: 'Hitung dulu setiap penjumlahan.',
              pembahasan: ['Hasilnya 2, 4, 6, dan 8.', 'Urutan dari terkecil adalah 2, 4, 6, 8.'],
            },
            {
              id: 'uji-b01-s01-q011', tipe: 'urutkan', sumber: 'buatan', level: 'menantang',
              pertanyaan: 'Urutkan langkah menghitung 3 + 2!',
              urutanBenar: ['Mulai dari bilangan 3', 'Hitung maju satu menjadi 4', 'Hitung maju lagi menjadi 5', 'Tulis hasilnya 5'],
              pembahasan: ['Penjumlahan dihitung dengan maju dari bilangan pertama.', 'Setelah dua langkah maju, hasilnya 5.'],
            },
            {
              id: 'uji-b01-s01-q012', tipe: 'pg', sumber: 'buatan', level: 'menantang',
              pertanyaan: 'Siti punya 7 permen. Ia memberi 2 permen kepada adik, lalu mendapat 4 permen dari ibu. Berapa permen Siti sekarang?',
              pilihan: ['7', '8', '9', '10'], kunci: 2,
              petunjuk: 'Kurangi dulu, lalu tambahkan.',
              pembahasan: ['Permen berkurang 2, jadi 7 - 2 = 5.', 'Lalu bertambah 4, jadi 5 + 4 = 9.', 'Jadi jawabannya 9.'],
            },
            {
              id: 'uji-b01-s01-q013', tipe: 'bs', sumber: 'buatan', level: 'menantang',
              pertanyaan: 'Jika 4 + 3 = 7, maka 3 + 4 juga 7.', kunci: true,
              pembahasan: ['Urutan bilangan yang dijumlahkan boleh ditukar.', 'Hasil penjumlahan tetap sama, yaitu 7.'],
            },
            {
              id: 'uji-b01-s01-q014', tipe: 'isian', sumber: 'buatan', level: 'sedang',
              pertanyaan: '6 + 6 = ...', kunci: ['12'],
              pembahasan: ['Enam ditambah enam berarti dua kelompok berisi enam.', 'Hasilnya 12.'],
            },
            {
              id: 'uji-b01-s01-q015', tipe: 'pg', sumber: 'buatan', level: 'mudah',
              pertanyaan: '1 + 4 = ...', pilihan: ['3', '4', '5', '6'], kunci: 2,
              pembahasan: ['Hitung empat langkah setelah 1: 2, 3, 4, 5.', 'Jadi jawabannya 5.'],
            },
            {
              id: 'uji-b01-s01-q016', tipe: 'uraian', sumber: 'buatan', level: 'sedang',
              pertanyaan: 'Ceritakan cara kamu menghitung 8 + 1.',
              contohJawaban: 'Saya mulai dari 8, lalu menghitung maju satu langkah menjadi 9.',
              pembahasan: ['Jawaban boleh berbeda asal langkahnya benar.', 'Hasil akhirnya 9.'],
            },
          ],
        },
        {
          id: 'uji-b01-s02',
          judul: 'Latihan Bab Uji Satu',
          materi: [],
          soal: [
            {
              id: 'uji-b01-s02-q001', tipe: 'pg', sumber: 'guru', level: 'mudah',
              pertanyaan: '3 + 3 = ...', pilihan: ['5', '6', '7', '8'], kunci: 1,
              pembahasan: ['Hitung tiga langkah setelah 3: 4, 5, 6.', 'Jadi jawabannya 6.'],
            },
          ],
        },
      ],
    },
    {
      id: 'uji-b02',
      nomor: 2,
      judul: 'Bab Uji Dua',
      subBab: [
        {
          id: 'uji-b02-s01',
          judul: 'Latihan Bab Uji Dua',
          materi: [],
          soal: [
            {
              id: 'uji-b02-s01-q001', tipe: 'bs', sumber: 'guru', level: 'mudah',
              pertanyaan: '2 + 2 hasilnya 4.', kunci: true,
              pembahasan: ['Dua ditambah dua sama dengan empat.', 'Jadi pernyataan itu benar.'],
            },
          ],
        },
      ],
    },
  ],
};
