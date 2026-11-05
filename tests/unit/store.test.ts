import { describe, expect, it, vi, beforeEach } from 'vitest';
import { perbaruiStat, useApp } from '../../src/store/useApp';
import { safeStorage, bersihkanSemua } from '../../src/lib/safeStorage';
import type { StatSoal } from '../../src/store/types';

const dasar: StatSoal = { benar: 0, salah: 0, terakhir: 'salah', beruntunBenar: 0, diBankSalah: false, ts: 0 };

describe('perbaruiStat', () => {
  it('pertama benar', () => {
    const s = perbaruiStat(undefined, true, 100);
    expect(s).toMatchObject({ benar: 1, salah: 0, terakhir: 'benar', beruntunBenar: 1, diBankSalah: false });
  });

  it('pertama salah masuk bank salah', () => {
    const s = perbaruiStat(undefined, false, 100);
    expect(s).toMatchObject({ benar: 0, salah: 1, terakhir: 'salah', diBankSalah: true });
  });

  it('salah lalu benar 1x masih di bank', () => {
    const s1 = perbaruiStat(dasar, false, 100);
    const s2 = perbaruiStat(s1, true, 200);
    expect(s2.diBankSalah).toBe(true);
    expect(s2.beruntunBenar).toBe(1);
  });

  it('salah lalu benar 2x keluar bank', () => {
    const s1 = perbaruiStat(dasar, false, 100);
    const s2 = perbaruiStat(s1, true, 200);
    const s3 = perbaruiStat(s2, true, 300);
    expect(s3.diBankSalah).toBe(false);
    expect(s3.beruntunBenar).toBe(2);
  });

  it('benar lalu salah', () => {
    const s1 = perbaruiStat(dasar, true, 100);
    const s2 = perbaruiStat(s1, false, 200);
    expect(s2).toMatchObject({ benar: 1, salah: 1, terakhir: 'salah', beruntunBenar: 0, diBankSalah: true });
  });
});

describe('safeStorage', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

  it('tetap berfungsi saat localStorage.setItem melempar error', () => {
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => { throw new Error('penuh'); });
    expect(() => safeStorage.setItem('sk3:uji', 'nilai')).not.toThrow();
    expect(safeStorage.getItem('sk3:uji')).toBe('nilai');
    safeStorage.removeItem('sk3:uji');
    expect(safeStorage.getItem('sk3:uji')).toBeNull();
  });

  it('bersihkanSemua menghapus kunci sk3', () => {
    localStorage.setItem('sk3:data', 'x');
    localStorage.setItem('lain', 'y');
    bersihkanSemua();
    expect(localStorage.getItem('sk3:data')).toBeNull();
    expect(localStorage.getItem('lain')).toBe('y');
  });
});

describe('store profil', () => {
  beforeEach(() => {
    useApp.getState().resetSemua();
    localStorage.clear();
  });

  it('buatProfil maksimal 5', () => {
    for (let i = 1; i <= 5; i += 1) {
      expect(useApp.getState().buatProfil(`Anak${i}`, 'Cat')).toBeTruthy();
    }
    expect(useApp.getState().buatProfil('Anak6', 'Dog')).toBeNull();
    expect(useApp.getState().profil).toHaveLength(5);
  });

  it('hapusProfil memindahkan profil aktif', () => {
    const a = useApp.getState().buatProfil('Ardi', 'Cat')!;
    const b = useApp.getState().buatProfil('Bila', 'Dog')!;
    expect(useApp.getState().profilAktifId).toBe(b);
    useApp.getState().hapusProfil(b);
    expect(useApp.getState().profilAktifId).toBe(a);
    expect(useApp.getState().profil).toHaveLength(1);
  });
});

describe('data rusak', () => {
  it('merge memakai state awal saat bentuk tidak valid', async () => {
    localStorage.setItem('sk3:data', JSON.stringify({ state: { profil: 'bukan array' }, version: 1 }));
    const { useApp: baru } = await import('../../src/store/useApp');
    expect(Array.isArray(baru.getState().profil)).toBe(true);
  });
});
