import type { StatSoal } from '../store/types';
import { TIPE_DINILAI, type Bab } from '../content/types';

export function bintangDariNilai(nilai: number | undefined): number {
  if (nilai === undefined) return 0;
  if (nilai >= 90) return 3;
  if (nilai >= 75) return 2;
  if (nilai >= 60) return 1;
  return 0;
}

export function penguasaanBab(bab: Bab, soal: Record<string, StatSoal>): number {
  const dinilai = bab.subBab.flatMap((s) => s.soal).filter((q) => TIPE_DINILAI.includes(q.tipe));
  if (dinilai.length === 0) return 0;
  const benar = dinilai.filter((q) => soal[q.id]?.terakhir === 'benar').length;
  return (benar / dinilai.length) * 100;
}
