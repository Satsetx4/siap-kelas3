import { expect, test } from '@playwright/test';

test('halaman utama mengarah ke profil saat belum ada profil', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveURL(/\/profil\/baru$/);
  await expect(page.getByRole('heading', { level: 1, name: 'Profil Baru' })).toBeVisible();
});
