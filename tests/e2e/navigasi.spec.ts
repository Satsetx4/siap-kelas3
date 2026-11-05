import { expect, test } from '@playwright/test';
import { seedProfil } from './bantu';

test('semua tab bottom nav bisa dibuka dan judul berubah', async ({ page }) => {
  await seedProfil(page);
  await page.goto('/beranda');
  const nav = page.getByRole('navigation').last();

  for (const [label, judul] of [
    ['Mapel', 'Mata Pelajaran'],
    ['Ulang', 'Ulang Soal Salah'],
    ['Prestasi', 'Prestasi'],
    ['Beranda', 'Hai, Ardi!'],
  ] as const) {
    await nav.getByRole('link', { name: label }).click();
    await expect(page.getByRole('heading', { level: 1, name: judul })).toBeVisible();
  }
});

test('halaman tidak ada menampilkan 404 dan tombol berfungsi', async ({ page }) => {
  await seedProfil(page);
  await page.goto('/tidak-ada');
  await expect(page.getByRole('heading', { name: 'Halaman tidak ditemukan' })).toBeVisible();
  await page.getByRole('button', { name: 'Ke Beranda' }).click();
  await expect(page).toHaveURL(/\/beranda$/);
});

test('lebar 360px tidak ada scroll horizontal', async ({ page }) => {
  await seedProfil(page);
  await page.setViewportSize({ width: 360, height: 760 });
  await page.goto('/beranda');
  const lebih = await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth);
  expect(lebih).toBe(true);
});
