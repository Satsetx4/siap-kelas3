import { describe, expect, it } from 'vitest';
import { periksa, normalisasi, jawabanLengkap } from '../../src/engine/periksa';
import { pilihLatihan, pilihUjianBab, pilihUjianGabungan, pilihUlang, buatAcak } from '../../src/engine/pilihSoal';
import { hitungNilai, bintang, penguasaanBab, penguasaanMapel } from '../../src/engine/nilai';
import { buatRng, acak, permutasi } from '../../src/lib/rng';
import { mapelUji } from '../../src/content/__uji__/mapelUji';
import type { Soal, SoalPG, SoalBS, SoalIsian, SoalJodohkan, SoalUrutkan, SoalUraian } from '../../src/content/types';
import type { StatSoal } from '../../src/store/types';

const pg: SoalPG = { id: 't-b01-s01-q001', tipe: 'pg', pertanyaan: '2+3?', pilihan: ['4', '5'], kunci: 1, pembahasan: ['x'], level: 'mudah', sumber: 'buatan' };
const bs: SoalBS = { id: 't-b01-s01-q002', tipe: 'bs', pertanyaan: 'x', kunci: true, pembahasan: ['x'], level: 'mudah', sumber: 'buatan' };
const isian: SoalIsian = { id: 't-b01-s01-q003', tipe: 'isian', pertanyaan: 'x', kunci: ['lima'], pembahasan: ['x'], level: 'mudah', sumber: 'buatan' };
const jodohkan: SoalJodohkan = {
  id: 't-b01-s01-q004', tipe: 'jodohkan', pertanyaan: 'x',
  pasangan: [{ kiri: 'a', kanan: '1' }, { kiri: 'b', kanan: '2' }, { kiri: 'c', kanan: '3' }],
  pembahasan: ['x'], level: 'mudah', sumber: 'buatan',
};
const urutkan: SoalUrutkan = { id: 't-b01-s01-q005', tipe: 'urutkan', pertanyaan: 'x', urutanBenar: ['a', 'b', 'c'], pembahasan: ['x'], level: 'mudah', sumber: 'buatan' };
const uraian: SoalUraian = { id: 't-b01-s01-q006', tipe: 'uraian', pertanyaan: 'x', contohJawaban: 'y', pembahasan: ['x'], level: 'mudah', sumber: 'buatan' };

describe('periksa', () => {
  it('menilai setiap tipe dengan benar dan salah', () => {
    expect(periksa(pg, { tipe: 'pg', pilih: 1 })).toBe(true);
    expect(periksa(pg, { tipe: 'pg', pilih: 0 })).toBe(false);
    expect(periksa(bs, { tipe: 'bs', nilai: true })).toBe(true);
    expect(periksa(bs, { tipe: 'bs', nilai: false })).toBe(false);
    expect(periksa(isian, { tipe: 'isian', teks: 'lima' })).toBe(true);
    expect(periksa(isian, { tipe: 'isian', teks: 'empat' })).toBe(false);
    expect(periksa(jodohkan, { tipe: 'jodohkan', pasangan: { 0: 0, 1: 1, 2: 2 } })).toBe(true);
    expect(periksa(jodohkan, { tipe: 'jodohkan', pasangan: { 0: 1, 1: 0, 2: 2 } })).toBe(false);
    expect(periksa(urutkan, { tipe: 'urutkan', urutan: [0, 1, 2] })).toBe(true);
    expect(periksa(urutkan, { tipe: 'urutkan', urutan: [1, 0, 2] })).toBe(false);
    expect(periksa(uraian, { tipe: 'uraian', cocok: null })).toBeNull();
  });

  it('isian menerima variasi huruf besar, titik, dan spasi ganda', () => {
    expect(normalisasi('  LiMa.  ')).toBe('lima');
    expect(periksa(isian, { tipe: 'isian', teks: ' LIMA. ' })).toBe(true);
    expect(periksa(isian, { tipe: 'isian', teks: 'lima   ' })).toBe(true);
  });

  it('jawabanLengkap sesuai tipe', () => {
    expect(jawabanLengkap(pg, undefined)).toBe(false);
    expect(jawabanLengkap(pg, { tipe: 'pg', pilih: 0 })).toBe(true);
    expect(jawabanLengkap(isian, { tipe: 'isian', teks: '  ' })).toBe(false);
    expect(jawabanLengkap(jodohkan, { tipe: 'jodohkan', pasangan: { 0: 0 } })).toBe(false);
    expect(jawabanLengkap(urutkan, { tipe: 'urutkan', urutan: [0] })).toBe(false);
    expect(jawabanLengkap(uraian, { tipe: 'uraian', cocok: null })).toBe(true);
  });
});

describe('rng', () => {
  it('deterministik dengan seed sama', () => {
    const a = acak([1, 2, 3, 4, 5], buatRng(42));
    const b = acak([1, 2, 3, 4, 5], buatRng(42));
    expect(a).toEqual(b);
    expect(a.slice().sort()).toEqual([1, 2, 3, 4, 5]);
  });

  it('permutasi menghasilkan indeks lengkap', () => {
    expect(permutasi(4, buatRng(7)).slice().sort()).toEqual([0, 1, 2, 3]);
  });
});

const stat = (kadaluarsa = 0): Record<string, StatSoal> => ({
  [pg.id]: { benar: 1, salah: 0, terakhir: 'benar', beruntunBenar: 1, diBankSalah: false, ts: kadaluarsa },
});

describe('pilihLatihan', () => {
  it('memprioritaskan soal belum dijawab lalu bank salah', () => {
    const daftar: Soal[] = [pg, bs, isian];
    const s: Record<string, StatSoal> = {
      [bs.id]: { benar: 0, salah: 2, terakhir: 'salah', beruntunBenar: 0, diBankSalah: true, ts: 5 },
      [isian.id]: { benar: 3, salah: 0, terakhir: 'benar', beruntunBenar: 3, diBankSalah: false, ts: 1 },
    };
    const hasil = pilihLatihan(daftar, s, buatRng(1), 2);
    expect(hasil.map((s2) => s2.id).sort()).toEqual([pg.id, bs.id].sort());
  });

  it('mengembalikan semua bila kurang dari jumlah', () => {
    const hasil = pilihLatihan([pg, bs], {}, buatRng(3), 10);
    expect(hasil).toHaveLength(2);
  });
});

describe('pilihUjianBab', () => {
  it('hanya mengambil soal dinilai maksimal 20', () => {
    const bab = mapelUji.bab[0];
    const hasil = pilihUjianBab(bab, buatRng(9));
    expect(hasil.length).toBeLessThanOrEqual(20);
    expect(hasil.every((s) => s.tipe !== 'uraian')).toBe(true);
  });
});

describe('pilihUjianGabungan', () => {
  it('proporsional, minimal 1 per bab, tidak melebihi ketersediaan', () => {
    const hasil = pilihUjianGabungan(mapelUji.bab, buatRng(5));
    const tersedia = mapelUji.bab.flatMap((b) => b.subBab.flatMap((s) => s.soal)).filter((s) => s.tipe !== 'uraian');
    expect(hasil.length).toBe(tersedia.length);
    expect(new Set(hasil.map((s) => s.id)).size).toBe(hasil.length);
    expect(mapelUji.bab.every((b) => hasil.some((s) => s.id.startsWith(b.id)))).toBe(true);
  });

  it('menghormati total permintaan', () => {
    const hasil = pilihUjianGabungan(mapelUji.bab, buatRng(5), 3);
    expect(hasil).toHaveLength(3);
  });
});

describe('pilihUlang', () => {
  it('hanya soal bank salah, terlama dulu', () => {
    const daftar: Soal[] = [pg, bs];
    const s: Record<string, StatSoal> = {
      [pg.id]: { benar: 0, salah: 1, terakhir: 'salah', beruntunBenar: 0, diBankSalah: true, ts: 9 },
      [bs.id]: { benar: 0, salah: 1, terakhir: 'salah', beruntunBenar: 0, diBankSalah: true, ts: 2 },
    };
    const hasil = pilihUlang(daftar, s, buatRng(1), 1);
    expect(hasil).toHaveLength(1);
    expect([pg.id, bs.id]).toContain(hasil[0].id);
  });
});

describe('buatAcak', () => {
  it('urutkan tidak pernah tampil dalam urutan benar', () => {
    const rng = buatRng(11);
    for (let i = 0; i < 20; i += 1) {
      const hasil = buatAcak([urutkan], rng)[urutkan.id];
      expect(hasil).not.toEqual([0, 1, 2]);
    }
  });

  it('pg menghasilkan permutasi penuh, bs kosong', () => {
    const hasil = buatAcak([pg, bs], buatRng(2));
    expect(hasil[pg.id].slice().sort()).toEqual([0, 1]);
    expect(hasil[bs.id]).toEqual([]);
  });
});

describe('nilai', () => {
  it('membulatkan nilai dan menangani nol soal', () => {
    expect(hitungNilai(7, 10)).toBe(70);
    expect(hitungNilai(1, 3)).toBe(33);
    expect(hitungNilai(0, 0)).toBe(0);
  });

  it('bintang pada batas 59/60/74/75/89/90', () => {
    expect(bintang(59)).toBe(0);
    expect(bintang(60)).toBe(1);
    expect(bintang(74)).toBe(1);
    expect(bintang(75)).toBe(2);
    expect(bintang(89)).toBe(2);
    expect(bintang(90)).toBe(3);
  });

  it('penguasaan bab dan mapel', () => {
    const bab = mapelUji.bab[0];
    const dinilai = bab.subBab.flatMap((s) => s.soal).filter((s) => s.tipe !== 'uraian');
    const soal: Record<string, StatSoal> = {};
    dinilai.slice(0, 2).forEach((s) => {
      soal[s.id] = { benar: 1, salah: 0, terakhir: 'benar', beruntunBenar: 1, diBankSalah: false, ts: 1 };
    });
    expect(penguasaanBab(bab, soal)).toBeCloseTo((2 / dinilai.length) * 100, 5);
    expect(penguasaanMapel(mapelUji.bab, soal)).toBeGreaterThan(0);
  });
});
