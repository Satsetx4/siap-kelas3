import { expect, test } from '@playwright/test';
import { seedProfil } from './bantu';

test('toggle tema bertahan setelah reload dan tanpa kedip', async ({ page }) => {
  await seedProfil(page);
  await page.goto('/beranda');
  const tombol = page.getByRole('button', { name: /mode gelap/i });
  await tombol.click();
  await expect(page.locator('html.dark')).toBeAttached();
  await page.reload();
  await expect(page.locator('html.dark')).toBeAttached();

  await page.goto('/beranda', { waitUntil: 'domcontentloaded' });
  const gelapSaatMuat = await page.evaluate(() => document.documentElement.classList.contains('dark'));
  expect(gelapSaatMuat).toBe(true);

  await page.getByRole('button', { name: /mode terang/i }).click();
});
