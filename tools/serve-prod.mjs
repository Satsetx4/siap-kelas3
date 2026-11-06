import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';

const ROOT = path.resolve('dist');
const PORT = Number(process.argv[2] ?? 4176);

const tipe = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.json': 'application/json',
  '.webmanifest': 'application/manifest+json',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml',
  '.ico': 'image/x-icon',
};

const kompres = new Set(['.html', '.js', '.css', '.svg', '.json', '.webmanifest', '.txt', '.xml']);

http.createServer((req, res) => {
  const url = decodeURIComponent((req.url ?? '/').split('?')[0]);
  let berkas = path.join(ROOT, url);
  if (!fs.existsSync(berkas) || fs.statSync(berkas).isDirectory()) {
    berkas = path.join(ROOT, 'index.html');
  }
  const ext = path.extname(berkas);
  const isi = fs.readFileSync(berkas);
  res.setHeader('Content-Type', tipe[ext] ?? 'application/octet-stream');
  res.setHeader('Cache-Control', ext === '.html' ? 'no-cache' : 'public, max-age=31536000, immutable');
  const terima = String(req.headers['accept-encoding'] ?? '');
  if (kompres.has(ext) && terima.includes('gzip')) {
    res.setHeader('Content-Encoding', 'gzip');
    res.end(zlib.gzipSync(isi));
    return;
  }
  res.end(isi);
}).listen(PORT, () => console.log(`siap di http://localhost:${PORT}`));
