import { expect, test } from '@playwright/test';

test('halaman utama menampilkan judul', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByText('Siap Kelas 3')).toBeVisible();
});
