import { TIPE_DINILAI, type Bab, type Soal } from '../content/types';
import type { StatSoal } from '../store/types';
import { acak, buatRng, permutasi, samaUrutan, type Rng } from '../lib/rng';

export const JUMLAH_LATIHAN = 10;
export const JUMLAH_UJIAN_BAB = 20;
export const JUMLAH_UJIAN_GABUNGAN = 25;
export const MAKS_ULANG = 10;

type Stat = Record<string, StatSoal>;

function urutPrioritas(soal: Soal[], stat: Stat): Soal[] {
  const belum = soal.filter((s) => !stat[s.id]);
  const bank = soal.filter((s) => stat[s.id]?.diBankSalah && !belum.includes(s));
  const sisa = soal
    .filter((s) => stat[s.id] && !stat[s.id].diBankSalah)
    .sort((a, b) => (stat[a.id]?.ts ?? 0) - (stat[b.id]?.ts ?? 0));
  return [...belum, ...bank, ...sisa];
}

export function pilihLatihan(soal: Soal[], stat: Stat, rng: Rng, jumlah = JUMLAH_LATIHAN): Soal[] {
  const urut = urutPrioritas(soal, stat);
  const ambil = urut.slice(0, Math.min(jumlah, urut.length));
  return acak(ambil, rng);
}

export function pilihUjianBab(bab: Bab, rng: Rng, jumlah = JUMLAH_UJIAN_BAB): Soal[] {
  const dinilai = bab.subBab.flatMap((s) => s.soal).filter((q) => TIPE_DINILAI.includes(q.tipe));
  return acak(dinilai, rng).slice(0, Math.min(jumlah, dinilai.length));
}

export function pilihUjianGabungan(babs: Bab[], rng: Rng, total = JUMLAH_UJIAN_GABUNGAN): Soal[] {
  const perBab = babs.map((b) => ({
    bab: b,
    soal: b.subBab.flatMap((s) => s.soal).filter((q) => TIPE_DINILAI.includes(q.tipe)),
  })).filter((x) => x.soal.length > 0);

  if (perBab.length === 0) return [];

  const totalTersedia = perBab.reduce((n, x) => n + x.soal.length, 0);
  const target = Math.min(total, totalTersedia);

  const kuota = perBab.map((x) => Math.max(1, Math.round((x.soal.length / totalTersedia) * target)));
  let selisih = target - kuota.reduce((a, b) => a + b, 0);
  let i = 0;
  while (selisih !== 0 && i < 1000) {
    const idx = i % kuota.length;
    if (selisih > 0 && kuota[idx] < perBab[idx].soal.length) { kuota[idx] += 1; selisih -= 1; }
    else if (selisih < 0 && kuota[idx] > 1) { kuota[idx] -= 1; selisih += 1; }
    i += 1;
  }

  const hasil = perBab.flatMap((x, idx) => acak(x.soal, rng).slice(0, kuota[idx]));
  return acak(hasil, rng);
}

export function pilihUlang(soal: Soal[], stat: Stat, rng: Rng, maks = MAKS_ULANG): Soal[] {
  const bank = soal
    .filter((s) => stat[s.id]?.diBankSalah)
    .sort((a, b) => (stat[a.id]?.ts ?? 0) - (stat[b.id]?.ts ?? 0));
  return acak(bank.slice(0, maks), rng);
}

/** Permutasi tampilan opsi/kanan/item per soal. */
export function buatAcak(soal: Soal[], rng: Rng): Record<string, number[]> {
  const hasil: Record<string, number[]> = {};
  for (const s of soal) {
    if (s.tipe === 'pg') hasil[s.id] = permutasi(s.pilihan.length, rng);
    else if (s.tipe === 'jodohkan') hasil[s.id] = permutasi(s.pasangan.length, rng);
    else if (s.tipe === 'urutkan') {
      const benar = s.urutanBenar.map((_, i) => i);
      let urut = permutasi(benar.length, rng);
      for (let coba = 0; coba < 10 && samaUrutan(urut, benar); coba += 1) urut = permutasi(benar.length, rng);
      hasil[s.id] = urut;
    } else hasil[s.id] = [];
  }
  return hasil;
}

export function rngAplikasi(): Rng {
  return buatRng(Date.now());
}
