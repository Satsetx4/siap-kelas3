import { describe, expect, it } from 'vitest';
import { hariBeruntun, evaluasiLencana, lencanaBaru, totalSoalDijawab, TARGET_HARIAN } from '../../src/engine/lencana';
import { progresKosong, type ProgresProfil, type StatSoal } from '../../src/store/types';

const stat = (benar = 1, salah = 0): StatSoal => ({ benar, salah, terakhir: 'benar', beruntunBenar: 1, diBankSalah: false, ts: 1 });

function profilDengan(ubah: Partial<ProgresProfil>): ProgresProfil {
  return { ...progresKosong(), ...ubah };
}

describe('hariBeruntun', () => {
  it('menghitung hari berturut-turut termasuk hari ini', () => {
    expect(hariBeruntun({ '2026-03-10': 10, '2026-03-11': 12, '2026-03-12': 10 }, '2026-03-12')).toBe(3);
  });

  it('lintas bulan', () => {
    expect(hariBeruntun({ '2026-02-27': 10, '2026-02-28': 11, '2026-03-01': 10 }, '2026-03-01')).toBe(3);
  });

  it('hari ini belum target tapi kemarin sudah', () => {
    expect(hariBeruntun({ '2026-03-10': 10, '2026-03-11': 10, '2026-03-12': 4 }, '2026-03-12')).toBe(2);
  });

  it('tanpa aktivitas bernilai 0', () => {
    expect(hariBeruntun({}, '2026-03-12')).toBe(0);
  });

  it('berhenti pada hari yang tidak mencapai target', () => {
    expect(hariBeruntun({ '2026-03-08': 10, '2026-03-09': 3, '2026-03-10': 10, '2026-03-11': 10 }, '2026-03-11')).toBe(2);
  });

  it('target harian adalah 10 soal', () => {
    expect(TARGET_HARIAN).toBe(10);
  });
});

describe('evaluasiLencana', () => {
  const hari = '2026-03-12';

  it('langkah-pertama setelah 1 soal', () => {
    const p = profilDengan({ soal: { a: stat(1, 0) } });
    expect(evaluasiLencana(p, hari)).toContain('langkah-pertama');
  });

  it('rajin-3 dan rajin-7 dari hari beruntun', () => {
    const tiga = profilDengan({ harian: { '2026-03-10': 10, '2026-03-11': 10, '2026-03-12': 10 } });
    expect(evaluasiLencana(tiga, hari)).toContain('rajin-3');
    expect(evaluasiLencana(tiga, hari)).not.toContain('rajin-7');

    const tujuh = profilDengan({
      harian: {
        '2026-03-06': 10, '2026-03-07': 10, '2026-03-08': 10, '2026-03-09': 10,
        '2026-03-10': 10, '2026-03-11': 10, '2026-03-12': 10,
      },
    });
    expect(evaluasiLencana(tujuh, hari)).toContain('rajin-7');
  });

  it('nilai-sempurna dari riwayat nilai 100', () => {
    const p = profilDengan({ riwayat: [{ id: 's1', jenis: 'ujian-bab', mapelId: 'pai', babIds: ['pai-b01'], nilai: 100, benar: 20, total: 20, ts: 1 }] });
    expect(evaluasiLencana(p, hari)).toContain('nilai-sempurna');
  });

  it('penakluk-bab dari ujianBabTerbaik >= 90', () => {
    const p = profilDengan({ ujianBabTerbaik: { 'pai-b01': 90 } });
    expect(evaluasiLencana(p, hari)).toContain('penakluk-bab');
    expect(evaluasiLencana(profilDengan({ ujianBabTerbaik: { 'pai-b01': 89 } }), hari)).not.toContain('penakluk-bab');
  });

  it('pembasmi-salah dan telinga-hebat dari hitungan', () => {
    const p = profilDengan({ hitung: { dengarBenar: 10, salahDibersihkan: 10 } });
    const hasil = evaluasiLencana(p, hari);
    expect(hasil).toContain('pembasmi-salah');
    expect(hasil).toContain('telinga-hebat');
  });

  it('seratus-soal dari total soal dijawab', () => {
    const soal: Record<string, StatSoal> = {};
    for (let i = 0; i < 100; i += 1) soal[`q${i}`] = stat(1, 0);
    const p = profilDengan({ soal });
    expect(totalSoalDijawab(p)).toBe(100);
    expect(evaluasiLencana(p, hari)).toContain('seratus-soal');
  });

  it('lencanaBaru hanya mengembalikan yang belum didapat', () => {
    const p = profilDengan({ soal: { a: stat(1, 0) }, lencana: { 'langkah-pertama': 1 } });
    expect(lencanaBaru(p, hari)).not.toContain('langkah-pertama');
  });
});
