import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { safeStorage, bersihkanSemua } from '../lib/safeStorage';
import { dataAwal, progresKosong, type AvatarId, type DataApp, type StatSoal } from './types';

export const MAKS_PROFIL = 5;

export function perbaruiStat(lama: StatSoal | undefined, benar: boolean, now: number): StatSoal {
  const s = lama ?? { benar: 0, salah: 0, terakhir: 'salah', beruntunBenar: 0, diBankSalah: false, ts: now };
  if (benar) {
    const beruntun = s.beruntunBenar + 1;
    return { ...s, benar: s.benar + 1, terakhir: 'benar', beruntunBenar: beruntun,
             diBankSalah: s.diBankSalah && beruntun < 2, ts: now };
  }
  return { ...s, salah: s.salah + 1, terakhir: 'salah', beruntunBenar: 0, diBankSalah: true, ts: now };
}

interface Aksi {
  buatProfil: (nama: string, avatar: AvatarId) => string | null;
  pilihProfil: (id: string) => void;
  ubahProfil: (id: string, data: { nama?: string; avatar?: AvatarId }) => void;
  hapusProfil: (id: string) => void;
  setTabBab: (babId: string, tab: 'materi'|'latihan'|'ujian') => void;
  setPosisiMateri: (subBabId: string, indeks: number) => void;
  resetSemua: () => void;
}

export const useApp = create<DataApp & Aksi>()(
  persist(
    (set, get) => ({
      ...dataAwal(),

      buatProfil: (nama, avatar) => {
        const { profil } = get();
        if (profil.length >= MAKS_PROFIL) return null;
        const id = `p${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`;
        const baru = { id, nama: nama.trim(), avatar, dibuat: Date.now() };
        set({ profil: [...profil, baru], profilAktifId: id, progres: { ...get().progres, [id]: progresKosong() } });
        return id;
      },

      pilihProfil: (id) => {
        if (!get().profil.some((p) => p.id === id)) return;
        set({ profilAktifId: id, progres: { ...get().progres, [id]: get().progres[id] ?? progresKosong() } });
      },

      ubahProfil: (id, data) => set({
        profil: get().profil.map((p) => (p.id === id ? { ...p, ...(data.nama !== undefined ? { nama: data.nama.trim() } : {}), ...(data.avatar ? { avatar: data.avatar } : {}) } : p)),
      }),

      hapusProfil: (id) => {
        const sisa = get().profil.filter((p) => p.id !== id);
        const progres = { ...get().progres };
        delete progres[id];
        set({
          profil: sisa,
          progres,
          profilAktifId: get().profilAktifId === id ? (sisa[0]?.id ?? null) : get().profilAktifId,
        });
      },

      setTabBab: (babId, tab) => {
        const id = get().profilAktifId;
        if (!id) return;
        const p = get().progres[id] ?? progresKosong();
        set({ progres: { ...get().progres, [id]: { ...p, tabBab: { ...p.tabBab, [babId]: tab } } } });
      },

      setPosisiMateri: (subBabId, indeks) => {
        const id = get().profilAktifId;
        if (!id) return;
        const p = get().progres[id] ?? progresKosong();
        set({ progres: { ...get().progres, [id]: { ...p, posisiMateri: { ...p.posisiMateri, [subBabId]: indeks } } } });
      },

      resetSemua: () => {
        bersihkanSemua();
        set({ ...dataAwal() });
      },
    }),
    {
      name: 'sk3:data',
      version: 1,
      storage: createJSONStorage(() => safeStorage),
      onRehydrateStorage: () => (_s, err) => {
        if (err) safeStorage.removeItem('sk3:data');
      },
      merge: (tersimpan, awal) => {
        const s = tersimpan as Partial<DataApp> | undefined;
        if (!s || !Array.isArray(s.profil)) return awal;
        return {
          ...awal,
          profilAktifId: typeof s.profilAktifId === 'string' ? s.profilAktifId : null,
          profil: s.profil,
          progres: s.progres && typeof s.progres === 'object' ? s.progres : {},
        };
      },
    },
  ),
);
