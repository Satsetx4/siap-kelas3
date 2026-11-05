import { expect, test, type Page } from '@playwright/test';
import { mapelUji } from '../../src/content/__uji__/mapelUji';

const semuaSoal = mapelUji.bab.flatMap((b) => b.subBab.flatMap((s) => s.soal));

function cariSoal(pertanyaan: string) {
  const bersih = pertanyaan.trim();
  return semuaSoal.find((s) => s.pertanyaan.trim() === bersih);
}

async function pertanyaanSekarang(page: Page): Promise<string> {
  const teks = await page.locator('[data-uji="pertanyaan"]').first().innerText();
  return teks.trim();
}

test('alur latihan lengkap: benar, salah, reload, hasil, ulangi', async ({ page }) => {
  await page.goto('/profil/baru');
  await page.getByLabel('Nama kamu').fill('Ardi');
  await page.getByRole('button', { name: 'Simpan' }).click();
  await expect(page).toHaveURL(/\/beranda$/);

  await page.goto('/mapel/uji/bab/uji-b01');
  await page.getByRole('tab', { name: 'Latihan' }).click();
  await page.getByRole('button', { name: 'Soal Guru saja' }).click();
  await page.getByRole('button', { name: 'Mulai Latihan (10 soal)' }).click();
  await expect(page).toHaveURL(/\/sesi$/);

  // Soal 1: jawab benar
  const q1 = cariSoal(await pertanyaanSekarang(page));
  expect(q1, 'soal pertama dikenali').toBeTruthy();
  if (q1!.tipe === 'pg') {
    await page.getByRole('button', { name: new RegExp(`^[A-D]\\s*${q1!.pilihan[q1!.kunci]}$`) }).click();
  }
  await page.getByRole('button', { name: 'Periksa' }).click();
  await expect(page.getByText('Benar! Hebat!')).toBeVisible();

  await page.getByRole('button', { name: 'Lanjut' }).click();

  // Soal 2: reload di tengah, soal harus tetap sama
  const q2 = await pertanyaanSekarang(page);
  await page.reload();
  await expect(page.getByText(q2, { exact: false })).toBeVisible();

  const soal2 = cariSoal(q2);
  expect(soal2, 'soal kedua dikenali').toBeTruthy();
  const salahIdx = soal2!.tipe === 'pg' ? (soal2!.kunci + 1) % soal2!.pilihan.length : 0;
  if (soal2!.tipe === 'pg') {
    await page.getByRole('button', { name: new RegExp(`^[A-D]\\s*${soal2!.pilihan[salahIdx]}$`) }).click();
  }
  await page.getByRole('button', { name: 'Periksa' }).click();
  await expect(page.getByText('Belum tepat')).toBeVisible();
  await expect(page.getByText('Cara Mengerjakan')).toBeVisible();

  await page.getByRole('button', { name: 'Lihat Hasil' }).click();
  await expect(page).toHaveURL(/\/hasil$/);
  await expect(page.getByText('Nilaimu')).toBeVisible();
  await expect(page.getByText('Benar 1 dari 2 soal')).toBeVisible();

  await page.getByRole('button', { name: 'Ulangi yang Salah' }).click();
  await expect(page).toHaveURL(/\/sesi$/);
  await expect(page.getByText('Ulang Soal Salah')).toBeVisible();
});
