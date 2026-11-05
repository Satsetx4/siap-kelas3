import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { safeStorage, bersihkanSemua } from '../lib/safeStorage';
import { dataAwal, progresKosong, type AvatarId, type DataApp, type Jawaban, type ProgresProfil, type Sesi, type StatSoal } from './types';
import { periksa } from '../engine/periksa';
import { hitungNilai } from '../engine/nilai';
import { cariSoal } from '../content/helpers';
import { TIPE_DINILAI } from '../content/types';
import { kunciHari } from '../lib/tanggal';

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
  mulaiSesi: (sesi: Sesi) => void;
  jawab: (soalId: string, jawaban: Jawaban) => void;
  cekJawaban: (soalId: string) => void;
  pindahSoal: (indeks: number) => void;
  tandaiRagu: (soalId: string) => void;
  selesaikanSesi: () => void;
  batalkanSesi: () => void;
  resetSemua: () => void;
}

function denganProgres(
  get: () => DataApp,
  ubah: (p: ProgresProfil) => ProgresProfil,
): Partial<DataApp> | null {
  const id = get().profilAktifId;
  if (!id) return null;
  const p = get().progres[id] ?? progresKosong();
  return { progres: { ...get().progres, [id]: ubah(p) } };
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

      mulaiSesi: (sesi) => {
        const perubahan = denganProgres(get, (p) => ({ ...p, sesiAktif: sesi }));
        if (perubahan) set(perubahan);
      },

      jawab: (soalId, jawaban) => {
        const perubahan = denganProgres(get, (p) => {
          if (!p.sesiAktif) return p;
          return { ...p, sesiAktif: { ...p.sesiAktif, jawaban: { ...p.sesiAktif.jawaban, [soalId]: jawaban } } };
        });
        if (perubahan) set(perubahan);
      },

      cekJawaban: (soalId) => {
        const now = Date.now();
        const perubahan = denganProgres(get, (p) => {
          const sesi = p.sesiAktif;
          if (!sesi || sesi.sudahDicek.includes(soalId)) return p;
          const soal = cariSoal(soalId);
          const jawaban = sesi.jawaban[soalId];
          if (!soal || !jawaban) return p;

          const hasil = periksa(soal, jawaban);
          const hari = kunciHari();
          const harian = { ...p.harian, [hari]: (p.harian[hari] ?? 0) + 1 };
          let soalStat = p.soal;
          let hitung = p.hitung;

          if (soal.tipe !== 'uraian') {
            const lama = p.soal[soalId];
            const baru = perbaruiStat(lama, hasil === true, now);
            soalStat = { ...p.soal, [soalId]: baru };
            if (lama?.diBankSalah && !baru.diBankSalah) {
              hitung = { ...hitung, salahDibersihkan: hitung.salahDibersihkan + 1 };
            }
            if (soal.audio && hasil === true) {
              hitung = { ...hitung, dengarBenar: hitung.dengarBenar + 1 };
            }
          }

          return {
            ...p,
            soal: soalStat,
            harian,
            hitung,
            sesiAktif: { ...sesi, sudahDicek: [...sesi.sudahDicek, soalId] },
          };
        });
        if (perubahan) set(perubahan);
      },

      pindahSoal: (indeks) => {
        const perubahan = denganProgres(get, (p) => {
          if (!p.sesiAktif) return p;
          return { ...p, sesiAktif: { ...p.sesiAktif, indeks } };
        });
        if (perubahan) set(perubahan);
      },

      tandaiRagu: (soalId) => {
        const perubahan = denganProgres(get, (p) => {
          const sesi = p.sesiAktif;
          if (!sesi) return p;
          const ragu = sesi.ragu.includes(soalId) ? sesi.ragu.filter((s) => s !== soalId) : [...sesi.ragu, soalId];
          return { ...p, sesiAktif: { ...sesi, ragu } };
        });
        if (perubahan) set(perubahan);
      },

      selesaikanSesi: () => {
        const now = Date.now();
        const perubahan = denganProgres(get, (p) => {
          const sesi = p.sesiAktif;
          if (!sesi) return p;

          const soalSesi = sesi.soalIds.map((id) => cariSoal(id)).filter((s): s is NonNullable<typeof s> => Boolean(s));
          const dinilai = soalSesi.filter((s) => TIPE_DINILAI.includes(s.tipe));

          let benar = 0;
          const soalStat = { ...p.soal };
          for (const soal of soalSesi) {
            const j = sesi.jawaban[soal.id];
            const hasil = j ? periksa(soal, j) : null;
            if (hasil === true) benar += 1;
            if (soal.tipe === 'uraian' || sesi.jenis === 'latihan' || sesi.jenis === 'ulang') continue;
            soalStat[soal.id] = perbaruiStat(p.soal[soal.id], hasil === true, now);
          }

          const nilai = hitungNilai(benar, dinilai.length);
          const ringkasan = {
            id: sesi.id,
            jenis: sesi.jenis,
            mapelId: sesi.mapelId,
            babIds: sesi.babIds,
            nilai,
            benar,
            total: dinilai.length,
            ts: now,
          };

          const ujianBabTerbaik = { ...p.ujianBabTerbaik };
          if (sesi.jenis === 'ujian-bab' && sesi.babIds[0]) {
            const lama = ujianBabTerbaik[sesi.babIds[0]] ?? -1;
            ujianBabTerbaik[sesi.babIds[0]] = Math.max(lama, nilai);
          }

          return {
            ...p,
            soal: soalStat,
            riwayat: [ringkasan, ...p.riwayat].slice(0, 50),
            ujianBabTerbaik,
            sesiTerakhir: { ...sesi, selesai: true },
            sesiAktif: null,
          };
        });
        if (perubahan) set(perubahan);
      },

      batalkanSesi: () => {
        const perubahan = denganProgres(get, (p) => ({ ...p, sesiAktif: null }));
        if (perubahan) set(perubahan);
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
