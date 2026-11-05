import { SEMUA_MAPEL } from './index';
import { TIPE_DINILAI, type Bab, type Mapel, type Soal, type SubBab } from './types';

export function cariMapel(id: string): Mapel | undefined {
  return SEMUA_MAPEL.find((m) => m.id === id);
}

export function cariBab(mapelId: string, babId: string): Bab | undefined {
  return cariMapel(mapelId)?.bab.find((b) => b.id === babId);
}

export function cariSubBab(subBabId: string): SubBab | undefined {
  for (const m of SEMUA_MAPEL) {
    for (const b of m.bab) {
      const s = b.subBab.find((x) => x.id === subBabId);
      if (s) return s;
    }
  }
  return undefined;
}

const petaSoal: Map<string, Soal> = new Map(
  SEMUA_MAPEL.flatMap((m) => m.bab.flatMap((b) => b.subBab.flatMap((s) => s.soal.map((q) => [q.id, q] as const)))),
);

export function cariSoal(soalId: string): Soal | undefined {
  return petaSoal.get(soalId);
}

export function soalBab(bab: Bab, filter: 'semua' | 'guru'): Soal[] {
  const semua = bab.subBab.flatMap((s) => s.soal);
  return filter === 'guru' ? semua.filter((s) => s.sumber === 'guru') : semua;
}

export function soalDinilai(soal: Soal[]): Soal[] {
  return soal.filter((s) => TIPE_DINILAI.includes(s.tipe));
}

export function mapelDariSoalId(soalId: string): string {
  return soalId.split('-b')[0] ?? '';
}

export function babIdDariSoalId(soalId: string): string {
  const i = soalId.indexOf('-s');
  return i === -1 ? '' : soalId.slice(0, i);
}
