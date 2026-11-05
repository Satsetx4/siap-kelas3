import { expect, test } from '@playwright/test';
import { seedProfil } from './bantu';

test('mapel tanpa bab menampilkan pesan siap disiapkan dan tombol kembali', async ({ page }) => {
  await seedProfil(page);
  await page.goto('/mapel/pai');
  await expect(page.getByText('Materi sedang disiapkan.')).toBeVisible();

  await page.getByRole('button', { name: 'Kembali ke Mapel' }).click();
  await expect(page).toHaveURL(/\/mapel$/);
});

test('daftar mapel menampilkan PAI dan Inggris', async ({ page }) => {
  await seedProfil(page);
  await page.goto('/mapel');
  await expect(page.getByRole('link', { name: /PAI/ })).toBeVisible();
  await expect(page.getByRole('link', { name: /Inggris/ })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Ujian Gabungan' })).toBeVisible();
});
