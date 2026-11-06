import type { Bab } from '../types';

export const bab01: Bab = {
  id: 'pai-b01',
  nomor: 1,
  judul: 'Huruf Hijaiyah Bersambung dan Mad Tabi\'i',
  subBab: [
    {
      id: 'pai-b01-s01',
      judul: 'Huruf Hijaiyah Bersambung & Mad Tabi\'i',
      materi: [
        {
          id: 'pai-b01-s01-k01',
          judul: 'Kenalan dengan huruf hijaiyah',
          isi: [
            { jenis: 'paragraf', teks: 'Huruf hijaiyah adalah huruf yang dipakai untuk membaca dan menulis Al-Qur\'an.' },
            { jenis: 'poin', item: ['Huruf hijaiyah bisa ditulis terpisah.', 'Huruf hijaiyah juga bisa ditulis bersambung.'] },
            { jenis: 'ingat', teks: 'Saat huruf dirangkai, bentuknya dapat berubah.' },
          ],
        },
        {
          id: 'pai-b01-s01-k02',
          judul: 'Bentuk huruf bisa berubah',
          isi: [
            { jenis: 'paragraf', teks: 'Bentuk huruf hijaiyah berubah sesuai letaknya, yaitu di awal, di tengah, atau di akhir kata.' },
            { jenis: 'contoh', teks: 'Karena itu, kita perlu berlatih membaca bentuk huruf yang bersambung.' },
            { jenis: 'poin', item: ['Perhatikan bentuk hurufnya.', 'Perhatikan harakatnya.', 'Bacalah dengan makhraj yang tepat.'] },
          ],
        },
        {
          id: 'pai-b01-s01-k03',
          judul: 'Contoh kata bersambung',
          isi: [
            { jenis: 'arab', arab: 'كَتَبَ', latin: 'kataba', arti: 'telah menulis' },
            { jenis: 'arab', arab: 'عَلِمَ', latin: 'alima', arti: 'telah mengetahui' },
            { jenis: 'arab', arab: 'مُسْلِمٌ', latin: 'muslimun', arti: 'seorang muslim' },
          ],
        },
        {
          id: 'pai-b01-s01-k04',
          judul: 'Apa itu Mad Tabi\'i?',
          isi: [
            { jenis: 'paragraf', teks: 'Mad Tabi\'i adalah bacaan panjang asli. Panjangnya dua harakat atau kira-kira dua ketukan.' },
            { jenis: 'poin', item: ['Fathah bertemu alif (ا).', 'Kasrah bertemu ya sukun (يْ).', 'Dhammah bertemu wau sukun (وْ).'] },
            { jenis: 'ingat', teks: 'Mad Tabi\'i dibaca panjang dua harakat.' },
          ],
        },
        {
          id: 'pai-b01-s01-k05',
          judul: 'Contoh bacaan Mad Tabi\'i',
          isi: [
            { jenis: 'arab', arab: 'قَالَ', latin: 'qāla', arti: 'dia telah berkata' },
            { jenis: 'arab', arab: 'فِي', latin: 'fī', arti: 'di dalam' },
            { jenis: 'arab', arab: 'يَقُولُ', latin: 'yaqūlu', arti: 'dia sedang berkata' },
            { jenis: 'contoh', teks: 'Pada kata قَالَ, bunyi qā dibaca panjang dua harakat.' },
          ],
        },
      ],
      soal: [
        {
          id: 'pai-b01-s01-q001', tipe: 'pg', sumber: 'buatan', level: 'mudah',
          pertanyaan: 'Huruf hijaiyah adalah huruf yang dipakai untuk membaca dan menulis ...',
          pilihan: ['buku cerita', 'Al-Qur\'an', 'surat kabar', 'papan tulis'],
          kunci: 1,
          pembahasan: [
            'Soal menanyakan kegunaan huruf hijaiyah.',
            'Huruf hijaiyah dipakai untuk membaca dan menulis Al-Qur\'an.',
            'Jadi jawabannya Al-Qur\'an.',
          ],
        },
        {
          id: 'pai-b01-s01-q002', tipe: 'pg', sumber: 'buatan', level: 'mudah',
          pertanyaan: 'Kata كَتَبَ dibaca ...',
          pilihan: ['alima', 'kataba', 'muslimun', 'qāla'],
          kunci: 1,
          pembahasan: [
            'Soal meminta bacaan kata كَتَبَ.',
            'Kata itu tersusun dari huruf kaf, ta, dan ba.',
            'Bacaannya kataba, artinya telah menulis.',
          ],
        },
        {
          id: 'pai-b01-s01-q003', tipe: 'bs', sumber: 'buatan', level: 'mudah',
          pertanyaan: 'Mad Tabi\'i dibaca panjang dua harakat.',
          kunci: true,
          pembahasan: [
            'Mad Tabi\'i adalah bacaan panjang asli.',
            'Panjangnya dua harakat atau kira-kira dua ketukan.',
            'Jadi pernyataan itu benar.',
          ],
        },
        {
          id: 'pai-b01-s01-q004', tipe: 'isian', sumber: 'buatan', level: 'mudah',
          pertanyaan: 'Fathah bertemu alif dibaca ...',
          kunci: ['panjang', 'panjang dua harakat'],
          pembahasan: [
            'Fathah yang bertemu alif termasuk Mad Tabi\'i.',
            'Mad Tabi\'i dibaca panjang dua harakat.',
            'Jadi jawabannya panjang.',
          ],
        },
        {
          id: 'pai-b01-s01-q005', tipe: 'pg', sumber: 'buatan', level: 'mudah',
          pertanyaan: 'Kata مُسْلِمٌ artinya ...',
          pilihan: ['telah menulis', 'telah mengetahui', 'seorang muslim', 'di dalam'],
          kunci: 2,
          pembahasan: [
            'Soal menanyakan arti kata مُسْلِمٌ.',
            'Bacaan kata itu adalah muslimun.',
            'Artinya seorang muslim.',
          ],
        },
        {
          id: 'pai-b01-s01-q006', tipe: 'bs', sumber: 'buatan', level: 'mudah',
          pertanyaan: 'Huruf hijaiyah hanya boleh ditulis terpisah, tidak boleh bersambung.',
          kunci: false,
          pembahasan: [
            'Huruf hijaiyah boleh ditulis terpisah.',
            'Huruf hijaiyah juga boleh ditulis bersambung.',
            'Jadi pernyataan itu salah.',
          ],
        },
        {
          id: 'pai-b01-s01-q007', tipe: 'pg', sumber: 'buatan', level: 'sedang',
          pertanyaan: 'Pada kata قَالَ, bunyi yang dibaca panjang adalah ...',
          pilihan: ['qā', 'la', 'qa la', 'al'],
          kunci: 0,
          petunjuk: 'Perhatikan fathah yang bertemu alif.',
          pembahasan: [
            'Kata قَالَ dibaca qāla.',
            'Fathah bertemu alif sehingga bunyi qā dibaca panjang.',
            'Jadi jawabannya qā.',
          ],
        },
        {
          id: 'pai-b01-s01-q008', tipe: 'isian', sumber: 'buatan', level: 'sedang',
          pertanyaan: 'Kasrah bertemu ya sukun dibaca ...',
          kunci: ['panjang', 'panjang dua harakat'],
          pembahasan: [
            'Kasrah bertemu ya sukun termasuk Mad Tabi\'i.',
            'Mad Tabi\'i selalu dibaca panjang dua harakat.',
            'Jadi jawabannya panjang.',
          ],
        },
        {
          id: 'pai-b01-s01-q009', tipe: 'pg', sumber: 'buatan', level: 'sedang',
          pertanyaan: 'Kata فِي dibaca panjang karena ...',
          pilihan: ['fathah bertemu alif', 'kasrah bertemu ya sukun', 'dhammah bertemu wau sukun', 'harakatnya dihilangkan'],
          kunci: 1,
          pembahasan: [
            'Kata فِي dibaca fī.',
            'Di dalamnya ada kasrah yang bertemu ya sukun.',
            'Itulah sebabnya dibaca panjang dua harakat.',
          ],
        },
        {
          id: 'pai-b01-s01-q010', tipe: 'jodohkan', sumber: 'buatan', level: 'sedang',
          pertanyaan: 'Jodohkan kata dengan bacaannya!',
          pasangan: [
            { kiri: 'كَتَبَ', kanan: 'kataba' },
            { kiri: 'عَلِمَ', kanan: 'alima' },
            { kiri: 'مُسْلِمٌ', kanan: 'muslimun' },
          ],
          pembahasan: [
            'Baca setiap kata sesuai huruf dan harakatnya.',
            'كَتَبَ dibaca kataba, عَلِمَ dibaca alima, dan مُسْلِمٌ dibaca muslimun.',
          ],
        },
        {
          id: 'pai-b01-s01-q011', tipe: 'bs', sumber: 'buatan', level: 'sedang',
          pertanyaan: 'Bentuk huruf hijaiyah dapat berubah sesuai letaknya di awal, tengah, atau akhir kata.',
          kunci: true,
          pembahasan: [
            'Huruf hijaiyah dapat ditulis bersambung.',
            'Saat bersambung, bentuknya menyesuaikan letak huruf.',
            'Jadi pernyataan itu benar.',
          ],
        },
        {
          id: 'pai-b01-s01-q012', tipe: 'isian', sumber: 'buatan', level: 'sedang',
          pertanyaan: 'Kata يَقُولُ dibaca ...',
          kunci: ['yaqulu', 'yaqūlu'],
          pembahasan: [
            'Kata يَقُولُ tersusun dari ya, qaf, wau, dan lam.',
            'Dhammah bertemu wau sukun sehingga dibaca panjang.',
            'Bacaannya yaqūlu, artinya dia sedang berkata.',
          ],
        },
        {
          id: 'pai-b01-s01-q013', tipe: 'pg', sumber: 'buatan', level: 'menantang',
          pertanyaan: 'Kata berikut yang mengandung Mad Tabi\'i adalah ...',
          pilihan: ['كَتَبَ', 'عَلِمَ', 'فِي', 'مُسْلِمٌ'],
          kunci: 2,
          petunjuk: 'Cari kata yang punya huruf panjang.',
          pembahasan: [
            'Mad Tabi\'i terjadi saat fathah bertemu alif, kasrah bertemu ya sukun, atau dhammah bertemu wau sukun.',
            'Kata فِي memiliki kasrah bertemu ya sukun.',
            'Jadi jawabannya فِي.',
          ],
        },
        {
          id: 'pai-b01-s01-q014', tipe: 'pg', sumber: 'buatan', level: 'menantang',
          pertanyaan: 'Aisyah membaca kata يَقُولُ. Bunyi yang harus dibaca panjang adalah ...',
          pilihan: ['ya', 'qū', 'lu', 'qulu'],
          kunci: 1,
          petunjuk: 'Perhatikan dhammah yang bertemu wau sukun.',
          pembahasan: [
            'Pada kata يَقُولُ ada dhammah bertemu wau sukun.',
            'Bagian itu dibaca panjang menjadi qū.',
            'Jadi jawabannya qū.',
          ],
        },
        {
          id: 'pai-b01-s01-q015', tipe: 'urutkan', sumber: 'buatan', level: 'menantang',
          pertanyaan: 'Urutkan langkah membaca huruf hijaiyah bersambung!',
          urutanBenar: [
            'Perhatikan bentuk setiap huruf',
            'Perhatikan harakatnya',
            'Baca dengan makhraj yang tepat',
          ],
          pembahasan: [
            'Sebelum membaca, kenali dulu bentuk hurufnya.',
            'Setelah itu perhatikan harakat, lalu bacalah dengan makhraj yang tepat.',
          ],
        },
        {
          id: 'pai-b01-s01-q016', tipe: 'bs', sumber: 'buatan', level: 'menantang',
          pertanyaan: 'Kata قَالَ dan فِي sama-sama dibaca panjang dua harakat.',
          kunci: true,
          pembahasan: [
            'قَالَ dibaca panjang karena fathah bertemu alif.',
            'فِي dibaca panjang karena kasrah bertemu ya sukun.',
            'Keduanya termasuk Mad Tabi\'i, yaitu panjang dua harakat.',
          ],
        },
        {
          id: 'pai-b01-s01-q017', tipe: 'uraian', sumber: 'buatan', level: 'sedang',
          pertanyaan: 'Ceritakan dengan kata-katamu sendiri, apa itu Mad Tabi\'i?',
          contohJawaban: 'Mad Tabi\'i adalah bacaan panjang dua harakat karena fathah bertemu alif, kasrah bertemu ya sukun, atau dhammah bertemu wau sukun.',
          pembahasan: [
            'Jawaban boleh berbeda asal menyebut bacaan panjang dua harakat.',
            'Sebutkan juga tiga sebabnya: fathah bertemu alif, kasrah bertemu ya sukun, dhammah bertemu wau sukun.',
          ],
        },
      ],
    },
  ],
};
