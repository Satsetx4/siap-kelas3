import { expect, test } from '@playwright/test';
import { seedBankSalah } from './bantu';

async function jawabBenar(page: import('@playwright/test').Page) {
  await page.getByRole('button', { name: /^[A-D]\s*5$/ }).click();
  await page.getByRole('button', { name: 'Periksa' }).click();
  await expect(page.getByText('Benar! Hebat!')).toBeVisible();
  await page.getByRole('button', { name: 'Lihat Hasil' }).click();
  await expect(page).toHaveURL(/\/hasil$/);
}

test('bank soal salah: badge, ulangi dua kali, lalu kosong', async ({ page }) => {
  await seedBankSalah(page);
  await page.goto('/ulang');
  await expect(page.getByText('1 soal perlu diulang')).toBeVisible();
  const nav = page.getByRole('navigation').last();
  await expect(nav.getByRole('link', { name: /Ulang/ })).toContainText('1');

  await page.getByRole('button', { name: 'Ulangi (maks 10 soal)' }).click();
  await expect(page).toHaveURL(/\/sesi$/);
  await jawabBenar(page);

  await page.goto('/ulang');
  await expect(page.getByText('1 soal perlu diulang')).toBeVisible();

  await page.getByRole('button', { name: 'Ulangi (maks 10 soal)' }).click();
  await jawabBenar(page);

  await page.goto('/ulang');
  await expect(page.getByText('Hebat! Tidak ada soal yang perlu diulang.')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Ke Mapel' })).toBeVisible();
});

test('halaman prestasi menampilkan target, kalender, dan lencana', async ({ page }) => {
  await seedBankSalah(page);
  await page.goto('/prestasi');
  await expect(page.getByText('Target Hari Ini')).toBeVisible();
  await expect(page.getByLabel('Kalender 14 hari')).toBeVisible();
  await expect(page.getByText('Langkah Pertama')).toBeVisible();
  await expect(page.getByText('Rajin 3 Hari')).toBeVisible();
});
