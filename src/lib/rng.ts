export type Rng = () => number;

/** mulberry32 — RNG deterministik untuk tes. */
export function buatRng(seed: number): Rng {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6D2B79F5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Fisher–Yates, mengembalikan salinan. */
export function acak<T>(arr: readonly T[], rng: Rng): T[] {
  const hasil = [...arr];
  for (let i = hasil.length - 1; i > 0; i -= 1) {
    const j = Math.floor(rng() * (i + 1));
    [hasil[i], hasil[j]] = [hasil[j], hasil[i]];
  }
  return hasil;
}

export function permutasi(n: number, rng: Rng): number[] {
  return acak(Array.from({ length: n }, (_, i) => i), rng);
}

export function samaUrutan(a: number[], b: number[]): boolean {
  return a.length === b.length && a.every((v, i) => v === b[i]);
}
