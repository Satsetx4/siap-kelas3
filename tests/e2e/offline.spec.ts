import { expect, test } from '@playwright/test';
import { seedProfil } from './bantu';

test('app tetap tampil saat offline setelah kunjungan pertama', async ({ page, context }) => {
  await seedProfil(page);
  await page.goto('/beranda');
  await expect(page.getByRole('heading', { level: 1, name: 'Hai, Ardi!' })).toBeVisible();

  await page.evaluate(async () => {
    if ('serviceWorker' in navigator) await navigator.serviceWorker.ready;
  });
  await page.waitForTimeout(1500);

  await context.setOffline(true);
  await page.reload();

  await expect(page.getByRole('heading', { level: 1, name: 'Hai, Ardi!' })).toBeVisible();
  await context.setOffline(false);
});

test('manifest, robots, dan sitemap tersedia', async ({ page, request }) => {
  await page.goto('/');
  const manifestHref = await page.getAttribute('link[rel="manifest"]', 'href');
  expect(manifestHref).toBeTruthy();

  const manifest = await request.get(manifestHref!);
  expect(manifest.ok()).toBe(true);
  const isi = await manifest.json();
  expect(isi.name).toBe('Siap Kelas 3');
  expect(isi.display).toBe('standalone');

  const robots = await request.get('/robots.txt');
  expect(robots.ok()).toBe(true);
  expect(await robots.text()).toContain('Disallow: /ortu');

  const sitemap = await request.get('/sitemap.xml');
  expect(sitemap.ok()).toBe(true);
  expect(await sitemap.text()).toContain('/mapel/pai');
});
