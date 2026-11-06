import { expect, test, type Page } from '@playwright/test';
import { seedProfil, seedOrtu } from './bantu';

test.describe.configure({ timeout: 90_000 });

async function jawabGerbang(page: Page, benar: boolean) {
  const label = await page.locator('label[for="jawaban-ortu"]').innerText();
  const cocok = label.match(/(\d+)\s*×\s*(\d+)/);
  const hasil = Number(cocok![1]) * Number(cocok![2]);
  await page.getByLabel(/×/).fill(String(benar ? hasil : hasil + 1));
  await page.getByRole('button', { name: 'Masuk' }).click();
}

test('gerbang orang tua menolak jawaban salah dan menerima yang benar', async ({ page }) => {
  await seedProfil(page);
  await page.goto('/ortu');
  await expect(page.getByRole('heading', { level: 1, name: 'Area Orang Tua' })).toBeVisible();

  await jawabGerbang(page, false);
  await expect(page).toHaveURL(/\/ortu$/);
  await expect(page.getByRole('status')).toHaveText(/Belum tepat/);

  await jawabGerbang(page, true);
  await expect(page).toHaveURL(/\/ortu\/rapor$/);
  await expect(page.getByRole('heading', { level: 1, name: 'Rapor Ardi' })).toBeVisible();
  await expect(page.getByText(/Belum ada latihan/)).toBeVisible();
});

test('rapor tidak bisa dibuka tanpa gerbang', async ({ page }) => {
  await seedProfil(page);
  await page.goto('/ortu/rapor');
  await expect(page).toHaveURL(/\/ortu$/);
});

test('reset semua data lewat pengaturan', async ({ page }) => {
  await seedProfil(page);
  await seedOrtu(page);
  await page.goto('/ortu/pengaturan');
  await expect(page.getByRole('heading', { level: 1, name: 'Pengaturan' })).toBeVisible();

  const tombolReset = page.getByRole('button', { name: 'Reset Semua Data' });
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await tombolReset.click();

  const dialog = page.getByRole('dialog');
  await expect(dialog).toBeVisible();
  const tombolKonfirmasi = dialog.getByRole('button', { name: 'Reset Sekarang' });
  await expect(tombolKonfirmasi).toBeDisabled();
  await page.getByLabel('Konfirmasi HAPUS').fill('HAPUS');
  await expect(tombolKonfirmasi).toBeEnabled();
  await tombolKonfirmasi.focus();
  await page.keyboard.press('Enter');

  await expect(page).toHaveURL(/\/profil\/baru$/);
  await expect(page.getByRole('heading', { level: 1, name: 'Profil Baru' })).toBeVisible();
});
