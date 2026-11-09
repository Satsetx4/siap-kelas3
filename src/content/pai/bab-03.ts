import type { Bab } from '../types';

export const bab03: Bab = {
  id: 'pai-b03',
  nomor: 3,
  judul: 'Huruf Hijaiyah Bersambung dan Izhar Halqi',
  subBab: [
    {
      id: 'pai-b03-s01',
      judul: 'Izhar Halqi',
      materi: [
        {
          id: 'pai-b03-s01-k01',
          judul: 'Apa itu Izhar Halqi?',
          isi: [
            { jenis: 'paragraf', teks: 'Izhar Halqi adalah hukum bacaan nun sukun (نْ) atau tanwin yang bertemu dengan salah satu dari enam huruf halqi.' },
            { jenis: 'poin', item: ['Nun sukun atau tanwin dibaca dengan jelas.', 'Bacaan tidak dileburkan ke huruf berikutnya.'] },
            { jenis: 'ingat', teks: 'Izhar Halqi artinya dibaca dengan jelas.' },
          ],
        },
        {
          id: 'pai-b03-s01-k02',
          judul: 'Enam huruf halqi',
          isi: [
            { jenis: 'arab', arab: 'ء ه ع ح غ خ', latin: '', arti: '' },
            { jenis: 'poin', item: ['Hamzah (ء).', 'Ha (ه).', '‘Ain (ع).', 'Ha tebal atau tenggorokan (ح).', 'Ghain (غ).', 'Kha (خ).'] },
            { jenis: 'contoh', teks: 'Ingat enam huruf ini: ء ه ع ح غ خ.' },
          ],
        },
        {
          id: 'pai-b03-s01-k03',
          judul: 'Contoh bacaan Izhar Halqi',
          isi: [
            { jenis: 'arab', arab: 'مَنْ آمَنَ', latin: 'man āmana', arti: '' },
            { jenis: 'contoh', teks: 'Nun sukun bertemu hamzah (ء), dibaca jelas.' },
            { jenis: 'arab', arab: 'مِنْ هَادٍ', latin: 'min hādin', arti: '' },
            { jenis: 'contoh', teks: 'Nun sukun bertemu ha (ه), dibaca jelas.' },
            { jenis: 'arab', arab: 'عَلِيمٌ حَكِيمٌ', latin: '‘alīmun ḥakīm', arti: '' },
            { jenis: 'contoh', teks: 'Tanwin bertemu ha (ح), dibaca jelas saat disambung.' },
          ],
        },
        {
          id: 'pai-b03-s01-k04',
          judul: 'Cara membaca Izhar Halqi',
          isi: [
            { jenis: 'poin', item: ['Perhatikan nun sukun atau tanwin.', 'Periksa huruf yang muncul sesudahnya.', 'Jika bertemu salah satu dari enam huruf halqi, bacalah nun sukun atau tanwin dengan jelas.', 'Latih bacaan dengan bimbingan guru agar makhraj setiap huruf tepat.'] },
            { jenis: 'ingat', teks: 'Perhatikan nun sukun, periksa huruf sesudahnya, bacalah dengan jelas.' },
          ],
        },
        {
          id: 'pai-b03-s01-k05',
          judul: 'Agar bacaan tartil',
          isi: [
            { jenis: 'paragraf', teks: 'Izhar Halqi melatih kita membaca Al-Qur’an dengan jelas dan sesuai aturan tajwid.' },
            { jenis: 'contoh', teks: 'Bacalah dengan tenang, jangan terburu-buru, dan perhatikan makhraj setiap huruf.' },
          ],
        },
      ],
      soal: [
        {
          id: 'pai-b03-s01-q001', tipe: 'pg', sumber: 'buatan', level: 'mudah',
          pertanyaan: 'Izhar Halqi adalah hukum bacaan nun sukun atau tanwin yang bertemu dengan ...',
          pilihan: ['huruf mad', 'enam huruf halqi', 'huruf bersambung', 'tanda waqaf'],
          kunci: 1,
          pembahasan: [
            'Soal menanyakan pasangan bacaan Izhar Halqi.',
            'Izhar Halqi terjadi saat nun sukun atau tanwin bertemu enam huruf halqi.',
            'Jadi jawabannya enam huruf halqi.',
          ],
        },
        {
          id: 'pai-b03-s01-q002', tipe: 'bs', sumber: 'buatan', level: 'mudah',
          pertanyaan: 'Bacaan nun sukun atau tanwin pada Izhar Halqi dibaca dengan jelas.',
          kunci: true,
          pembahasan: [
            'Izhar artinya jelas.',
            'Nun sukun atau tanwin dibaca jelas tanpa dileburkan.',
            'Jadi pernyataan itu benar.',
          ],
        },
        {
          id: 'pai-b03-s01-q003', tipe: 'isian', sumber: 'buatan', level: 'mudah',
          pertanyaan: 'Sebutkan salah satu dari enam huruf halqi!',
          kunci: ['hamzah', 'ha', 'ain', '‘ain', 'ghain', 'kha', 'ء', 'ه', 'ع', 'ح', 'غ', 'خ'],
          pembahasan: [
            'Enam huruf halqi: ء ه ع ح غ خ.',
            'Namanya: hamzah, ha, ‘ain, ha tebal, ghain, kha.',
            'Salah satu jawaban itu sudah benar.',
          ],
        },
        {
          id: 'pai-b03-s01-q004', tipe: 'pg', sumber: 'buatan', level: 'mudah',
          pertanyaan: 'Berikut ini yang termasuk huruf halqi adalah ...',
          pilihan: ['ن', 'ء', 'م', 'ل'],
          kunci: 1,
          pembahasan: [
            'Enam huruf halqi adalah ء ه ع ح غ خ.',
            'Hamzah (ء) termasuk di dalamnya.',
            'Jadi jawabannya ء.',
          ],
        },
        {
          id: 'pai-b03-s01-q005', tipe: 'pg', sumber: 'buatan', level: 'mudah',
          pertanyaan: 'Pada contoh مَنْ آمَنَ, nun sukun bertemu dengan huruf ...',
          pilihan: ['م', 'ن', 'ء', 'ا'],
          kunci: 2,
          pembahasan: [
            'Kata مَنْ diakhiri nun sukun.',
            'Sesudahnya ada hamzah (ء) pada آمَنَ.',
            'Jadi jawabannya ء.',
          ],
        },
        {
          id: 'pai-b03-s01-q006', tipe: 'bs', sumber: 'buatan', level: 'mudah',
          pertanyaan: 'Pada Izhar Halqi, nun sukun dileburkan ke huruf berikutnya.',
          kunci: false,
          pembahasan: [
            'Izhar Halqi dibaca dengan jelas.',
            'Nun sukun tidak dileburkan ke huruf berikutnya.',
            'Jadi pernyataan itu salah.',
          ],
        },
        {
          id: 'pai-b03-s01-q007', tipe: 'pg', sumber: 'buatan', level: 'sedang',
          pertanyaan: 'Contoh مِنْ هَادٍ dibaca jelas karena ...',
          pilihan: ['nun sukun bertemu ha (ه)', 'tanwin bertemu ha (ح)', 'nun sukun bertemu hamzah (ء)', 'tanwin bertemu ghain (غ)'],
          kunci: 0,
          petunjuk: 'Perhatikan huruf sesudah nun sukun.',
          pembahasan: [
            'Pada مِنْ هَادٍ ada nun sukun.',
            'Sesudahnya ada huruf ha (ه).',
            'Ha termasuk huruf halqi, jadi dibaca jelas.',
          ],
        },
        {
          id: 'pai-b03-s01-q008', tipe: 'pg', sumber: 'buatan', level: 'sedang',
          pertanyaan: 'Pada contoh عَلِيمٌ حَكِيمٌ, yang bertemu adalah ...',
          pilihan: ['nun sukun dan hamzah', 'tanwin dan ha (ح)', 'nun sukun dan ha (ه)', 'tanwin dan kha (خ)'],
          kunci: 1,
          pembahasan: [
            'Akhir kata عَلِيمٌ ada tanwin.',
            'Sesudahnya ada huruf ha (ح) pada حَكِيمٌ.',
            'Jadi jawabannya tanwin dan ha (ح).',
          ],
        },
        {
          id: 'pai-b03-s01-q009', tipe: 'isian', sumber: 'buatan', level: 'sedang',
          pertanyaan: 'Langkah pertama membaca Izhar Halqi adalah memperhatikan ...',
          kunci: ['nun sukun atau tanwin', 'nun sukun', 'tanwin'],
          pembahasan: [
            'Cara membaca dimulai dari memperhatikan nun sukun atau tanwin.',
            'Setelah itu periksa huruf sesudahnya.',
            'Jadi jawabannya nun sukun atau tanwin.',
          ],
        },
        {
          id: 'pai-b03-s01-q010', tipe: 'jodohkan', sumber: 'buatan', level: 'sedang',
          pertanyaan: 'Jodohkan contoh dengan pasangannya!',
          pasangan: [
            { kiri: 'مَنْ آمَنَ', kanan: 'nun sukun bertemu hamzah' },
            { kiri: 'مِنْ هَادٍ', kanan: 'nun sukun bertemu ha' },
            { kiri: 'عَلِيمٌ حَكِيمٌ', kanan: 'tanwin bertemu ha' },
          ],
          pembahasan: [
            'مَنْ آمَنَ: nun sukun bertemu hamzah.',
            'مِنْ هَادٍ: nun sukun bertemu ha.',
            'عَلِيمٌ حَكِيمٌ: tanwin bertemu ha.',
          ],
        },
        {
          id: 'pai-b03-s01-q011', tipe: 'bs', sumber: 'buatan', level: 'sedang',
          pertanyaan: 'Agar makhraj tepat, bacaan perlu dilatih dengan bimbingan guru.',
          kunci: true,
          pembahasan: [
            'Bahan meminta latihan dengan bimbingan guru.',
            'Tujuannya agar makhraj setiap huruf tepat.',
            'Jadi pernyataan itu benar.',
          ],
        },
        {
          id: 'pai-b03-s01-q012', tipe: 'pg', sumber: 'buatan', level: 'sedang',
          pertanyaan: 'Siti menemukan nun sukun bertemu huruf غ. Bacaan yang tepat adalah ...',
          pilihan: ['dileburkan ke huruf غ', 'dibaca jelas', 'dibaca panjang dua harakat', 'berhenti dan diam'],
          kunci: 1,
          pembahasan: [
            'Ghain (غ) termasuk enam huruf halqi.',
            'Nun sukun bertemu huruf halqi dibaca Izhar.',
            'Jadi jawabannya dibaca jelas.',
          ],
        },
        {
          id: 'pai-b03-s01-q013', tipe: 'pg', sumber: 'buatan', level: 'menantang',
          pertanyaan: 'Pernyataan yang tepat tentang Izhar Halqi adalah ...',
          pilihan: [
            'Nun sukun bertemu huruf halqi dibaca samar',
            'Tanwin bertemu huruf halqi dibaca jelas',
            'Huruf halqi hanya ada tiga',
            'Izhar Halqi hanya berlaku untuk nun sukun, bukan tanwin',
          ],
          kunci: 1,
          petunjuk: 'Ingat pengertian Izhar Halqi.',
          pembahasan: [
            'Izhar Halqi berlaku untuk nun sukun atau tanwin.',
            'Keduanya dibaca dengan jelas.',
            'Huruf halqi ada enam, bukan tiga.',
          ],
        },
        {
          id: 'pai-b03-s01-q014', tipe: 'urutkan', sumber: 'buatan', level: 'menantang',
          pertanyaan: 'Urutkan langkah membaca Izhar Halqi!',
          urutanBenar: ['Perhatikan nun sukun atau tanwin', 'Periksa huruf yang muncul sesudahnya', 'Bacalah dengan jelas jika bertemu huruf halqi', 'Latih bacaan dengan bimbingan guru'],
          pembahasan: [
            'Pertama perhatikan nun sukun atau tanwin.',
            'Lalu periksa huruf sesudahnya.',
            'Jika huruf halqi, bacalah dengan jelas dan latih dengan bimbingan guru.',
          ],
        },
        {
          id: 'pai-b03-s01-q015', tipe: 'isian', sumber: 'buatan', level: 'menantang',
          pertanyaan: 'Tuliskan enam huruf halqi!',
          kunci: ['ء ه ع ح غ خ', 'hamzah ha ain ha ghain kha', 'hamzah, ha, ain, ha, ghain, kha'],
          pembahasan: [
            'Enam huruf halqi: ء ه ع ح غ خ.',
            'Yaitu hamzah, ha, ‘ain, ha tebal, ghain, dan kha.',
          ],
        },
        {
          id: 'pai-b03-s01-q016', tipe: 'bs', sumber: 'buatan', level: 'menantang',
          pertanyaan: 'Izhar Halqi melatih kita membaca Al-Qur’an dengan jelas dan sesuai aturan tajwid.',
          kunci: true,
          pembahasan: [
            'Kesimpulan bahan menyebut hal yang sama.',
            'Membaca jelas sesuai aturan tajwid.',
            'Jadi pernyataan itu benar.',
          ],
        },
        {
          id: 'pai-b03-s01-q017', tipe: 'uraian', sumber: 'buatan', level: 'sedang',
          pertanyaan: 'Jelaskan dengan kata-katamu sendiri, kapan bacaan disebut Izhar Halqi!',
          contohJawaban: 'Saat nun sukun atau tanwin bertemu salah satu dari enam huruf halqi, lalu dibaca dengan jelas.',
          pembahasan: [
            'Jawaban boleh berbeda asal menyebut nun sukun atau tanwin.',
            'Sebutkan juga enam huruf halqi dan dibaca dengan jelas.',
          ],
        },
      ],
    },
  ],
};
