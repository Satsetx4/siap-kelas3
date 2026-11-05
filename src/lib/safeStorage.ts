import type { StateStorage } from 'zustand/middleware';

const memori = new Map<string, string>();

function ls(): Storage | null {
  try { const s = window.localStorage; const k = '__sk3_tes__'; s.setItem(k, '1'); s.removeItem(k); return s; }
  catch { return null; }
}

export const safeStorage: StateStorage = {
  getItem: (key) => { try { return ls()?.getItem(key) ?? memori.get(key) ?? null; } catch { return memori.get(key) ?? null; } },
  setItem: (key, value) => { memori.set(key, value); try { ls()?.setItem(key, value); } catch { /* penuh/privat: tetap di memori */ } },
  removeItem: (key) => { memori.delete(key); try { ls()?.removeItem(key); } catch { /* abaikan */ } },
};

export function bersihkanSemua(): void {
  memori.clear();
  try {
    const s = ls(); if (!s) return;
    Object.keys(s).filter((k) => k.startsWith('sk3:')).forEach((k) => s.removeItem(k));
  } catch { /* abaikan */ }
  try { window.sessionStorage.removeItem('sk3:ortu'); } catch { /* abaikan */ }
}
