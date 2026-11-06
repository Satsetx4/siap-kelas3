import { expect, test } from '@playwright/test';
import { seedProfil } from './bantu';
import { pai } from '../../src/content/pai';
import { inggris } from '../../src/content/inggris';

const semuaBab = [pai, inggris].flatMap((m) => m.bab.map((b) => ({ mapel: m, bab: b })));

for (const { mapel, bab } of semuaBab) {
  test(`bab ${bab.id} bisa dibuka dan latihan dimulai`, async ({ page }) => {
    await seedProfil(page);
    await page.goto(`/mapel/${mapel.id}/bab/${bab.id}`);
    await expect(page.getByRole('heading', { level: 1, name: bab.judul })).toBeVisible();

    await page.getByRole('tab', { name: 'Latihan' }).click();
    await page.getByRole('button', { name: 'Mulai Latihan (10 soal)' }).click();
    await expect(page).toHaveURL(/\/sesi$/);
    await expect(page.locator('[data-uji="pertanyaan"]').first()).toBeVisible();
  });
}
