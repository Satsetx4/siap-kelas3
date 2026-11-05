import { Footprints, Flame, CalendarCheck, Medal, Crown, Eraser, Ear, Target } from 'lucide-react';
import type { ProgresProfil } from '../store/types';
import { geserHari, kunciHari } from '../lib/tanggal';

export const TARGET_HARIAN = 10;

export interface Lencana {
  id: string;
  nama: string;
  Ikon: typeof Footprints;
  syarat: string;
}

export const DAFTAR_LENCANA: Lencana[] = [
  { id: 'langkah-pertama', nama: 'Langkah Pertama', Ikon: Footprints, syarat: 'Menjawab 1 soal' },
  { id: 'rajin-3', nama: 'Rajin 3 Hari', Ikon: Flame, syarat: 'Belajar 3 hari berturut-turut' },
  { id: 'rajin-7', nama: 'Rajin Seminggu', Ikon: CalendarCheck, syarat: 'Belajar 7 hari berturut-turut' },
  { id: 'nilai-sempurna', nama: 'Nilai Sempurna', Ikon: Medal, syarat: 'Nilai 100 di ujian' },
  { id: 'penakluk-bab', nama: 'Penakluk Bab', Ikon: Crown, syarat: '3 bintang di satu bab' },
  { id: 'pembasmi-salah', nama: 'Pembasmi Salah', Ikon: Eraser, syarat: '10 soal salah diperbaiki' },
  { id: 'telinga-hebat', nama: 'Telinga Hebat', Ikon: Ear, syarat: '10 soal dengar dijawab benar' },
  { id: 'seratus-soal', nama: '100 Soal', Ikon: Target, syarat: 'Menjawab 100 soal' },
];

/** Jumlah hari berturut-turut dengan target harian tercapai. */
export function hariBeruntun(harian: Record<string, number>, hariIni: string = kunciHari()): number {
  const [y, m, d] = hariIni.split('-').map(Number);
  const dasar = new Date(y, m - 1, d);
  let jumlah = 0;

  const hariIniCapai = (harian[hariIni] ?? 0) >= TARGET_HARIAN;
  let mulai = hariIniCapai ? 0 : -1;

  for (let i = mulai; i > -400; i -= 1) {
    const kunci = kunciHari(geserHari(dasar, i));
    if ((harian[kunci] ?? 0) >= TARGET_HARIAN) jumlah += 1;
    else break;
  }
  return jumlah;
}

export function totalSoalDijawab(p: ProgresProfil): number {
  return Object.values(p.soal).reduce((n, s) => n + s.benar + s.salah, 0);
}

export function evaluasiLencana(p: ProgresProfil, hariIni: string = kunciHari()): string[] {
  const total = totalSoalDijawab(p);
  const streak = hariBeruntun(p.harian, hariIni);
  const hasil: string[] = [];

  if (total >= 1) hasil.push('langkah-pertama');
  if (streak >= 3) hasil.push('rajin-3');
  if (streak >= 7) hasil.push('rajin-7');
  if (p.riwayat.some((r) => r.nilai === 100)) hasil.push('nilai-sempurna');
  if (Object.values(p.ujianBabTerbaik).some((n) => n >= 90)) hasil.push('penakluk-bab');
  if (p.hitung.salahDibersihkan >= 10) hasil.push('pembasmi-salah');
  if (p.hitung.dengarBenar >= 10) hasil.push('telinga-hebat');
  if (total >= 100) hasil.push('seratus-soal');

  return hasil;
}

export function lencanaBaru(p: ProgresProfil, hariIni: string = kunciHari()): string[] {
  return evaluasiLencana(p, hariIni).filter((id) => p.lencana[id] === undefined);
}
