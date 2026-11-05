import { expect, test } from '@playwright/test';

test('halaman utama mengarah ke beranda', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveURL(/\/beranda$/);
  await expect(page.getByRole('heading', { name: 'Beranda' })).toBeVisible();
});
