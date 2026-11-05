export interface Profil { id: string; nama: string; avatar: AvatarId; dibuat: number }
export type AvatarId = 'Cat'|'Dog'|'Rabbit'|'Bird'|'Fish'|'Turtle'|'Rocket'|'Star'|'Sun'|'Moon'|'Flower2'|'TreePine';

export interface StatSoal {
  benar: number;
  salah: number;
  terakhir: 'benar' | 'salah';
  beruntunBenar: number;
  diBankSalah: boolean;
  ts: number;
}

export type JenisSesi = 'latihan' | 'ujian-bab' | 'ujian-gabungan' | 'ulang';

export type Jawaban =
  | { tipe: 'pg'; pilih: number }
  | { tipe: 'bs'; nilai: boolean }
  | { tipe: 'isian'; teks: string }
  | { tipe: 'jodohkan'; pasangan: Record<number, number> }
  | { tipe: 'urutkan'; urutan: number[] }
  | { tipe: 'uraian'; cocok: boolean | null };

export interface Sesi {
  id: string;
  jenis: JenisSesi;
  mapelId: string;
  babIds: string[];
  filter: 'semua' | 'guru';
  soalIds: string[];
  acak: Record<string, number[]>;
  jawaban: Record<string, Jawaban>;
  sudahDicek: string[];
  ragu: string[];
  indeks: number;
  mulai: number;
  batasWaktu: number | null;
  selesai: boolean;
}

export interface RingkasanSesi {
  id: string; jenis: JenisSesi; mapelId: string; babIds: string[];
  nilai: number; benar: number; total: number; ts: number;
}

export interface ProgresProfil {
  soal: Record<string, StatSoal>;
  sesiAktif: Sesi | null;
  sesiTerakhir: Sesi | null;
  riwayat: RingkasanSesi[];
  harian: Record<string, number>;
  lencana: Record<string, number>;
  ujianBabTerbaik: Record<string, number>;
  tabBab: Record<string, 'materi'|'latihan'|'ujian'>;
  posisiMateri: Record<string, number>;
  hitung: { dengarBenar: number; salahDibersihkan: number };
}

export interface DataApp {
  profilAktifId: string | null;
  profil: Profil[];
  progres: Record<string, ProgresProfil>;
}

export function progresKosong(): ProgresProfil {
  return {
    soal: {},
    sesiAktif: null,
    sesiTerakhir: null,
    riwayat: [],
    harian: {},
    lencana: {},
    ujianBabTerbaik: {},
    tabBab: {},
    posisiMateri: {},
    hitung: { dengarBenar: 0, salahDibersihkan: 0 },
  };
}

export function dataAwal(): DataApp {
  return { profilAktifId: null, profil: [], progres: {} };
}
