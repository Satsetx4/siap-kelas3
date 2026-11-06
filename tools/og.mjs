import { chromium } from 'playwright';
import path from 'node:path';

const html = `<!doctype html>
<html lang="id"><head><meta charset="utf-8" />
<style>
  * { box-sizing: border-box; margin: 0; }
  body {
    width: 1200px; height: 630px; display: flex; align-items: center; justify-content: center;
    background: #FFFBF5; font-family: system-ui, sans-serif; color: #1E1B18;
  }
  .kartu {
    width: 1040px; border: 3px solid #F6E7D3; border-radius: 48px; background: #FFFFFF;
    padding: 56px 64px; display: flex; align-items: center; gap: 48px;
    box-shadow: 0 20px 60px rgba(30,27,24,0.08);
  }
  .logo { width: 190px; height: 190px; border-radius: 50%; background: #FF7A1A; color: #fff;
    display: flex; align-items: center; justify-content: center; font-size: 120px; font-weight: 800; }
  h1 { font-size: 76px; line-height: 1.1; letter-spacing: -1px; }
  p { font-size: 34px; color: #6B625A; margin-top: 18px; }
  .chip { display: inline-block; margin-top: 28px; padding: 12px 24px; border-radius: 999px;
    background: #D1FAE5; color: #047857; font-size: 26px; font-weight: 600; }
</style></head>
<body>
  <div class="kartu">
    <div class="logo">3</div>
    <div>
      <h1>Siap Kelas 3</h1>
      <p>Latihan soal &amp; persiapan ulangan Kelas 3 SD</p>
      <span class="chip">PAI &amp; Bahasa Inggris</span>
    </div>
  </div>
</body></html>`;

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
await page.setContent(html, { waitUntil: 'load' });
await page.screenshot({ path: path.resolve('public/og.png') });
await browser.close();
console.log('public/og.png dibuat');
