import { describe, expect, it } from 'vitest';
import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const DIST = path.resolve(process.cwd(), 'dist/assets');
const perintahBuild = process.platform === 'win32' ? 'npm.cmd run build' : 'npm run build';

function isiBundel(): string {
  if (!fs.existsSync(DIST)) return '';
  return fs.readdirSync(DIST)
    .filter((f: string) => f.endsWith('.js'))
    .map((f: string) => fs.readFileSync(path.join(DIST, f), 'utf8'))
    .join('\n');
}

describe('build produksi bersih dari data uji', () => {
  it('tidak memuat id mapel uji', () => {
    if (!isiBundel() || isiBundel().includes('uji-b01')) {
      execSync(perintahBuild, { stdio: 'ignore' });
    }
    expect(fs.existsSync(DIST)).toBe(true);
    expect(isiBundel()).not.toContain('uji-b01');
  }, 180_000);
});
