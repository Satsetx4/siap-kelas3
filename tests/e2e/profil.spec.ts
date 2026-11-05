import { expect, test } from '@playwright/test';

test('buat profil lalu masuk beranda dan bertahan setelah reload', async ({ page }) => {
  await page.goto('/profil/baru');
  await page.getByRole('button', { name: 'Simpan' }).click();
  await expect(page.getByRole('alert')).toHaveText('Tulis nama dulu ya');

  await page.getByLabel('Nama kamu').fill('Ardi');
  await page.getByRole('button', { name: 'Simpan' }).click();

  await expect(page).toHaveURL(/\/beranda$/);
  await expect(page.getByRole('heading', { level: 1, name: 'Hai, Ardi!' })).toBeVisible();

  await page.reload();
  await expect(page.getByRole('heading', { level: 1, name: 'Hai, Ardi!' })).toBeVisible();
});

test('nama terlalu panjang menampilkan pesan', async ({ page }) => {
  await page.goto('/profil/baru');
  await page.getByLabel('Nama kamu').fill('Namayangsangatpanjangsekali');
  await page.getByRole('button', { name: 'Simpan' }).click();
  await expect(page.getByRole('alert')).toHaveText('Nama maksimal 20 huruf');
});
