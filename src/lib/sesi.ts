import type { Soal } from '../content/types';
import type { JenisSesi, Sesi } from '../store/types';
import { buatAcak } from '../engine/pilihSoal';
import { buatRng } from './rng';

interface Masukan {
  jenis: JenisSesi;
  mapelId: string;
  babIds: string[];
  filter: 'semua' | 'guru';
  soal: Soal[];
  durasiMenit?: number | null;
}

export function buatSesi({ jenis, mapelId, babIds, filter, soal, durasiMenit = null }: Masukan): Sesi {
  const rng = buatRng(Date.now() + soal.length);
  const mulai = Date.now();
  return {
    id: `s${mulai.toString(36)}${Math.random().toString(36).slice(2, 6)}`,
    jenis,
    mapelId,
    babIds,
    filter,
    soalIds: soal.map((s) => s.id),
    acak: buatAcak(soal, rng),
    jawaban: {},
    sudahDicek: [],
    ragu: [],
    indeks: 0,
    mulai,
    batasWaktu: durasiMenit ? mulai + durasiMenit * 60_000 : null,
    selesai: false,
  };
}

export const JUDUL_SESI: Record<JenisSesi, string> = {
  latihan: 'Latihan',
  'ujian-bab': 'Ujian Bab',
  'ujian-gabungan': 'Ujian Gabungan',
  ulang: 'Ulang Soal Salah',
};
