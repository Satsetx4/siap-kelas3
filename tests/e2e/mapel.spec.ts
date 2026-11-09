import { expect, test } from '@playwright/test';
import { seedProfil } from './bantu';

test('mapel yang tidak ada menampilkan halaman tidak ditemukan', async ({ page }) => {
  await seedProfil(page);
  // Semua mapel rilis sudah punya bab, jadi cabang "Materi sedang disiapkan"
  // tidak terjangkau; yang diuji adalah mapel fiktif → NotFound.
  await page.goto('/mapel/tidak-ada-mapel');
  await expect(page.getByText('Halaman tidak ditemukan')).toBeVisible();
});

test('daftar mapel menampilkan PAI dan Inggris', async ({ page }) => {
  await seedProfil(page);
  await page.goto('/mapel');
  await expect(page.getByRole('link', { name: /PAI/ })).toBeVisible();
  await expect(page.getByRole('link', { name: /Inggris/ })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Ujian Gabungan' })).toBeVisible();
});
