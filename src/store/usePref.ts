import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { safeStorage } from '../lib/safeStorage';

export type Kecepatan = 0.8 | 1 | 1.2;

interface Pref {
  suaraAktif: boolean;
  kecepatan: Kecepatan;
  setSuaraAktif: (v: boolean) => void;
  setKecepatan: (v: Kecepatan) => void;
}

export const usePref = create<Pref>()(
  persist(
    (set) => ({
      suaraAktif: true,
      kecepatan: 1,
      setSuaraAktif: (v) => set({ suaraAktif: v }),
      setKecepatan: (v) => set({ kecepatan: v }),
    }),
    {
      name: 'sk3:pref',
      storage: createJSONStorage(() => safeStorage),
      partialize: (s) => ({ suaraAktif: s.suaraAktif, kecepatan: s.kecepatan }),
    },
  ),
);
