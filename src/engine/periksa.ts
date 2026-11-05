import type { Soal } from '../content/types';
import type { Jawaban } from '../store/types';

export function normalisasi(t: string): string {
  return t.toLowerCase().normalize('NFKC').replace(/[.,!?;:"'`]/g, '').replace(/\s+/g, ' ').trim();
}

export function periksa(soal: Soal, j: Jawaban): boolean | null {
  switch (soal.tipe) {
    case 'pg': return j.tipe === 'pg' && j.pilih === soal.kunci;
    case 'bs': return j.tipe === 'bs' && j.nilai === soal.kunci;
    case 'isian': return j.tipe === 'isian' && soal.kunci.some((k) => normalisasi(k) === normalisasi(j.teks));
    case 'jodohkan': return j.tipe === 'jodohkan' && soal.pasangan.every((_, i) => j.pasangan[i] === i);
    case 'urutkan': return j.tipe === 'urutkan' && j.urutan.length === soal.urutanBenar.length && j.urutan.every((v, i) => v === i);
    case 'uraian': return null;
  }
}

export function jawabanLengkap(soal: Soal, j?: Jawaban): boolean {
  if (!j) return false;
  switch (soal.tipe) {
    case 'pg': return j.tipe === 'pg' && j.pilih >= 0;
    case 'bs': return j.tipe === 'bs';
    case 'isian': return j.tipe === 'isian' && j.teks.trim().length > 0;
    case 'jodohkan': return j.tipe === 'jodohkan' && soal.pasangan.every((_, i) => j.pasangan[i] !== undefined);
    case 'urutkan': return j.tipe === 'urutkan' && j.urutan.length === soal.urutanBenar.length;
    case 'uraian': return true;
  }
}

export function jawabanBenar(soal: Soal): string {
  switch (soal.tipe) {
    case 'pg': return soal.pilihan[soal.kunci] ?? '';
    case 'bs': return soal.kunci ? 'Benar' : 'Salah';
    case 'isian': return soal.kunci[0] ?? '';
    case 'jodohkan': return soal.pasangan.map((p) => `${p.kiri} → ${p.kanan}`).join(', ');
    case 'urutkan': return soal.urutanBenar.join(' → ');
    case 'uraian': return soal.contohJawaban;
  }
}
