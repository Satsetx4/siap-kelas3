import type { Page } from '@playwright/test';

/** Menyiapkan satu profil aktif di localStorage sebelum halaman dimuat. */
export async function seedProfil(page: Page, nama = 'Ardi') {
  const data = {
    state: {
      profilAktifId: 'p1',
      profil: [{ id: 'p1', nama, avatar: 'Cat', dibuat: 1 }],
      progres: {
        p1: {
          soal: {}, sesiAktif: null, sesiTerakhir: null, riwayat: [], harian: {}, lencana: {},
          ujianBabTerbaik: {}, tabBab: {}, posisiMateri: {}, hitung: { dengarBenar: 0, salahDibersihkan: 0 },
        },
      },
    },
    version: 1,
  };
  await page.addInitScript((isi) => {
    window.localStorage.setItem('sk3:data', isi);
  }, JSON.stringify(data));
}
