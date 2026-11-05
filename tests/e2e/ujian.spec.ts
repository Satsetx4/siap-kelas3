import { expect, test } from '@playwright/test';
import { seedProfil, seedSesiKedaluwarsa } from './bantu';

test('ujian bab: ragu-ragu, grid nomor, kumpulkan, hasil dan bintang', async ({ page }) => {
  await seedProfil(page);
  await page.goto('/mapel/uji/bab/uji-b01');
  await page.getByRole('tab', { name: 'Ujian' }).click();
  await page.getByRole('button', { name: 'Mulai Ujian Bab' }).click();
  await expect(page).toHaveURL(/\/sesi$/);
  await expect(page.getByLabel(/Sisa waktu/)).toBeVisible();

  await page.getByRole('button', { name: 'Ragu' }).click();
  await page.getByRole('button', { name: 'Nomor soal' }).click();
  await expect(page.getByRole('button', { name: /Soal 1 kosong ragu-ragu/ })).toBeVisible();

  const nomorSoal = page.getByRole('dialog').getByRole('button', { name: /^Soal \d+ / });
  const jumlahSoal = await nomorSoal.count();
  await nomorSoal.nth(1).click();
  await expect(page.getByText('Soal 2 dari', { exact: false })).toBeVisible();

  await page.getByRole('button', { name: 'Nomor soal' }).click();
  await page.getByRole('dialog').getByRole('button', { name: /^Soal \d+ / }).last().click();
  await expect(page.getByText(`Soal ${jumlahSoal} dari`, { exact: false })).toBeVisible();

  await page.getByRole('button', { name: 'Selesai' }).click();
  await expect(page.getByText(/Masih ada \d+ soal kosong dan 1 ragu-ragu/)).toBeVisible();
  await page.getByRole('button', { name: 'Kumpulkan' }).click();

  await expect(page).toHaveURL(/\/hasil$/);
  await expect(page.getByText('Nilaimu')).toBeVisible();

  await page.goto('/mapel/uji');
  await expect(page.getByRole('img', { name: /dari 3 bintang/ }).first()).toBeVisible();
});

test('waktu habis mengumpulkan otomatis', async ({ page }) => {
  await seedSesiKedaluwarsa(page);
  await page.goto('/sesi');
  await expect(page).toHaveURL(/\/hasil$/, { timeout: 10_000 });
  await expect(page.getByText('Nilaimu')).toBeVisible();
});
