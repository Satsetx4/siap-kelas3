import type { Page } from '@playwright/test';

function dataDasar(nama: string, sesiAktif: unknown = null) {
  return {
    state: {
      profilAktifId: 'p1',
      profil: [{ id: 'p1', nama, avatar: 'Cat', dibuat: 1 }],
      progres: {
        p1: {
          soal: {}, sesiAktif, sesiTerakhir: null, riwayat: [], harian: {}, lencana: {},
          ujianBabTerbaik: {}, tabBab: {}, posisiMateri: {}, hitung: { dengarBenar: 0, salahDibersihkan: 0 },
        },
      },
    },
    version: 1,
  };
}

async function tanam(page: Page, data: unknown) {
  await page.addInitScript((isi) => {
    if (!window.localStorage.getItem('sk3:data')) {
      window.localStorage.setItem('sk3:data', isi);
    }
  }, JSON.stringify(data));
}

/** Menyiapkan satu profil aktif di localStorage sebelum halaman dimuat. */
export async function seedProfil(page: Page, nama = 'Ardi') {
  await tanam(page, dataDasar(nama));
}

/** Menyiapkan profil dengan satu soal di bank salah. */
export async function seedBankSalah(page: Page) {
  const data = dataDasar('Ardi');
  (data.state.progres.p1 as Record<string, unknown>).soal = {
    'uji-b01-s01-q001': { benar: 0, salah: 1, terakhir: 'salah', beruntunBenar: 0, diBankSalah: true, ts: 1 },
  };
  await tanam(page, data);
}

/** Menyiapkan sesi ujian yang waktunya sudah habis, untuk menguji pengumpulan otomatis. */
export async function seedSesiKedaluwarsa(page: Page) {
  const sesi = {
    id: 's-uji-lewat',
    jenis: 'ujian-bab',
    mapelId: 'uji',
    babIds: ['uji-b01'],
    filter: 'semua',
    soalIds: ['uji-b01-s01-q001', 'uji-b01-s01-q002'],
    acak: { 'uji-b01-s01-q001': [0, 1, 2, 3], 'uji-b01-s01-q002': [0, 1, 2, 3] },
    jawaban: {},
    sudahDicek: [],
    ragu: [],
    indeks: 0,
    mulai: Date.now() - 31 * 60_000,
    batasWaktu: Date.now() - 60_000,
    selesai: false,
  };
  await tanam(page, dataDasar('Ardi', sesi));
}
