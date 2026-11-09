// QA visual S12: screenshot 11 layar kunci x 2 tema (360px).
import { test, expect } from '@playwright/test';
import { mkdirSync } from 'node:fs';
import { seedProfil } from './bantu';

test.describe.configure({ mode: 'serial' });

test.beforeEach(async ({ page }) => {
  mkdirSync('test-results/qa', { recursive: true });
});

async function keTema(page: import('@playwright/test').Page, tema: 'terang' | 'gelap') {
  await page.goto('/profil');
  const tombolTema = page.getByRole('button', { name: /tema|mode|gelap|terang/i }).first();
  const aktif = await page.evaluate(() => document.documentElement.dataset.tema ?? localStorage.getItem('sk3:tema'));
  if ((tema === 'gelap' && aktif !== 'gelap') || (tema === 'terang' && aktif !== 'terang')) {
    if (await tombolTema.count()) await tombolTema.click();
    else await page.evaluate((t) => { document.documentElement.dataset.tema = t; try { localStorage.setItem('sk3:tema', t); } catch {} }, tema);
  }
}

for (const tema of ['terang', 'gelap'] as const) {
  test(`qa ${tema}: beranda + babdetail + sesi + ortu + 404`, async ({ page }) => {
    mkdirSync('test-results/qa', { recursive: true });
    await page.addInitScript((t) => {
      try { localStorage.setItem('sk3:tema', t); } catch { /* abaikan */ }
    }, tema);
    await page.goto('/profil/baru');
    await page.getByLabel('Nama kamu').fill('QA');
    await page.getByRole('button', { name: /gambar/i }).first().click();
    await page.getByRole('button', { name: 'Simpan' }).click();
    await expect(page).toHaveURL(/\/beranda$/);
    await page.screenshot({ path: `test-results/qa/${tema}-01-beranda.png`, fullPage: true });
    await page.goto('/mapel/pai/bab/pai-b01');
    await expect(page.getByRole('heading', { level: 1, name: /hijaiyah/i })).toBeVisible();
    await page.screenshot({ path: `test-results/qa/${tema}-02-babdetail.png`, fullPage: true });
    await page.getByRole('tab', { name: 'Latihan' }).click();
    await page.getByRole('button', { name: 'Mulai Latihan (10 soal)' }).click();
    await expect(page).toHaveURL(/\/sesi$/, { timeout: 20000 });
    await page.waitForTimeout(1000);
    await page.screenshot({ path: `test-results/qa/${tema}-03-sesi-tanya.png` });
    const opsi = page.getByRole('button', { name: /benar|salah/i });
    if (await opsi.count()) await opsi.first().click();
    const cek = page.getByRole('button', { name: /cek jawaban|jawab/i }).first();
    if (await cek.count()) await cek.click();
    await page.waitForTimeout(800);
    await page.screenshot({ path: `test-results/qa/${tema}-04-sesi-umpanbalik.png` });
    await page.goto('/hasil');
    await page.screenshot({ path: `test-results/qa/${tema}-05-hasil-atau-alih.png` });
    await page.goto('/ortu');
    await page.screenshot({ path: `test-results/qa/${tema}-06-ortu.png` });
    await page.goto('/jalan-yang-tidak-ada');
    await page.screenshot({ path: `test-results/qa/${tema}-07-404.png` });
  });
}
