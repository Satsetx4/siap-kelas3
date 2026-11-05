import type { Bab } from '../content/types';
import { TIPE_DINILAI } from '../content/types';
import type { StatSoal } from '../store/types';

export function hitungNilai(benar: number, jumlahDinilai: number): number {
  if (jumlahDinilai === 0) return 0;
  return Math.round((benar / jumlahDinilai) * 100);
}

export function bintang(nilai: number): number {
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

export function penguasaanMapel(babs: Bab[], soal: Record<string, StatSoal>): number {
  const berisi = babs.filter((b) => b.subBab.some((s) => s.soal.some((q) => TIPE_DINILAI.includes(q.tipe))));
  if (berisi.length === 0) return 0;
  return berisi.reduce((n, b) => n + penguasaanBab(b, soal), 0) / berisi.length;
}
