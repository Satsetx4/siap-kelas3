import { describe, expect, it } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import { SEMUA_MAPEL } from '../../src/content';
import { mapelUji } from '../../src/content/__uji__/mapelUji';
import { TIPE_DINILAI, type Mapel, type Soal } from '../../src/content/types';

const PUBLIK = path.resolve(process.cwd(), 'public');
const TERLARANG = [/lorem/i, /TODO/, /xxx/i, /\?\?\?/];

function semuaTeksSoal(s: Soal): string {
  const bagian: string[] = [s.pertanyaan, s.petunjuk ?? '', s.gambarAlt ?? '', ...s.pembahasan, s.rujukan ?? ''];
  if (s.tipe === 'pg') bagian.push(...s.pilihan);
  if (s.tipe === 'isian') bagian.push(...s.kunci);
  if (s.tipe === 'jodohkan') bagian.push(...s.pasangan.flatMap((p) => [p.kiri, p.kanan]));
  if (s.tipe === 'urutkan') bagian.push(...s.urutanBenar);
  if (s.tipe === 'uraian') bagian.push(s.contohJawaban);
  return bagian.join(' | ');
}

function periksaMapel(mapel: Mapel) {
  const idBab = new Set<string>();
  const idSub = new Set<string>();
  const idSoal = new Set<string>();

  for (const bab of mapel.bab) {
    expect(bab.id, `pola id bab ${bab.id}`).toMatch(new RegExp(`^${mapel.id}-b\\d{2}$`));
    expect(idBab.has(bab.id), `id bab ganda ${bab.id}`).toBe(false);
    idBab.add(bab.id);
    expect(bab.subBab.length, `bab ${bab.id} punya sub-bab`).toBeGreaterThanOrEqual(1);

    for (const sub of bab.subBab) {
      expect(sub.id, `pola id sub-bab ${sub.id}`).toMatch(new RegExp(`^${bab.id}-s\\d{2}$`));
      expect(idSub.has(sub.id), `id sub-bab ganda ${sub.id}`).toBe(false);
      idSub.add(sub.id);

      for (const kartu of sub.materi) {
        expect(kartu.id).toMatch(new RegExp(`^${sub.id}-k\\d{2}$`));
        for (const blok of kartu.isi) {
          if (blok.jenis === 'gambar') {
            expect(blok.alt.length, `alt gambar ${kartu.id}`).toBeGreaterThan(0);
            expect(fs.existsSync(path.join(PUBLIK, blok.src)), `berkas ${blok.src}`).toBe(true);
          }
        }
      }

      for (const soal of sub.soal) {
        expect(soal.id, `pola id soal ${soal.id}`).toMatch(new RegExp(`^${sub.id}-q\\d{3}$`));
        expect(idSoal.has(soal.id), `id soal ganda ${soal.id}`).toBe(false);
        idSoal.add(soal.id);

        expect(soal.pembahasan.length).toBeGreaterThanOrEqual(1);
        expect(soal.pembahasan.every((p) => p.trim().length > 0)).toBe(true);
        expect(TIPE_DINILAI.includes(soal.tipe) || soal.tipe === 'uraian').toBe(true);

        if (soal.gambar) {
          expect(soal.gambarAlt, `gambarAlt wajib ${soal.id}`).toBeTruthy();
          expect(fs.existsSync(path.join(PUBLIK, soal.gambar)), `berkas ${soal.gambar}`).toBe(true);
        }

        if (soal.tipe === 'pg') {
          expect(soal.pilihan.length).toBeGreaterThanOrEqual(2);
          expect(soal.pilihan.length).toBeLessThanOrEqual(4);
          expect(soal.kunci).toBeGreaterThanOrEqual(0);
          expect(soal.kunci).toBeLessThan(soal.pilihan.length);
          expect(new Set(soal.pilihan).size).toBe(soal.pilihan.length);
          if (soal.pilihanGambar) {
            expect(soal.pilihanGambar.length).toBe(soal.pilihan.length);
            soal.pilihanGambar.forEach((g) => expect(fs.existsSync(path.join(PUBLIK, g)), `berkas ${g}`).toBe(true));
          }
        }
        if (soal.tipe === 'isian') expect(soal.kunci.length).toBeGreaterThanOrEqual(1);
        if (soal.tipe === 'jodohkan') {
          expect(soal.pasangan.length).toBeGreaterThanOrEqual(3);
          expect(soal.pasangan.length).toBeLessThanOrEqual(5);
          expect(new Set(soal.pasangan.map((p) => p.kanan)).size).toBe(soal.pasangan.length);
        }
        if (soal.tipe === 'urutkan') {
          expect(soal.urutanBenar.length).toBeGreaterThanOrEqual(3);
          expect(soal.urutanBenar.length).toBeLessThanOrEqual(6);
          expect(new Set(soal.urutanBenar).size).toBe(soal.urutanBenar.length);
        }
        if (soal.audio) expect(soal.tipe).toBe('pg');

        const teks = semuaTeksSoal(soal);
        for (const pola of TERLARANG) expect(pola.test(teks), `teks terlarang di ${soal.id}`).toBe(false);
      }

      if (sub.materi.length > 0) {
        const dinilai = sub.soal.filter((s) => TIPE_DINILAI.includes(s.tipe));
        expect(dinilai.length, `soal dinilai ${sub.id}`).toBeGreaterThanOrEqual(15);
        expect(dinilai.filter((s) => s.level === 'mudah').length).toBeGreaterThanOrEqual(4);
        expect(dinilai.filter((s) => s.level === 'sedang').length).toBeGreaterThanOrEqual(4);
        expect(dinilai.filter((s) => s.level === 'menantang').length).toBeGreaterThanOrEqual(2);
      } else {
        expect(sub.soal.length, `soal latihan ${sub.id}`).toBeGreaterThanOrEqual(1);
      }
    }
  }
}

describe('validasi konten', () => {
  for (const mapel of [...SEMUA_MAPEL, mapelUji]) {
    it(`mapel ${mapel.id} valid`, () => {
      periksaMapel(mapel);
    });
  }

  it('id soal unik antar semua mapel', () => {
    const semua = [...SEMUA_MAPEL, mapelUji].flatMap((m) => m.bab.flatMap((b) => b.subBab.flatMap((s) => s.soal.map((q) => q.id))));
    expect(new Set(semua).size).toBe(semua.length);
  });
});
