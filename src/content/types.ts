export type Level = 'mudah' | 'sedang' | 'menantang';
export type Sumber = 'guru' | 'buatan';

interface SoalDasar {
  id: string;
  pertanyaan: string;
  arab?: string;
  gambar?: string;
  gambarAlt?: string;
  audio?: { teks: string; lang: 'en-US' | 'id-ID' };
  petunjuk?: string;
  pembahasan: string[];
  level: Level;
  sumber: Sumber;
  rujukan?: string;
  catatanKunci?: string;
}

export interface SoalPG extends SoalDasar {
  tipe: 'pg';
  pilihan: string[];
  pilihanGambar?: string[];
  kunci: number;
}
export interface SoalBS extends SoalDasar { tipe: 'bs'; kunci: boolean; }
export interface SoalIsian extends SoalDasar {
  tipe: 'isian';
  kunci: string[];
}
export interface SoalJodohkan extends SoalDasar {
  tipe: 'jodohkan';
  pasangan: { kiri: string; kanan: string }[];
}
export interface SoalUrutkan extends SoalDasar {
  tipe: 'urutkan';
  urutanBenar: string[];
}
export interface SoalUraian extends SoalDasar {
  tipe: 'uraian';
  contohJawaban: string;
}

export type Soal = SoalPG | SoalBS | SoalIsian | SoalJodohkan | SoalUrutkan | SoalUraian;
export type TipeSoal = Soal['tipe'];

export type Blok =
  | { jenis: 'paragraf'; teks: string }
  | { jenis: 'poin'; item: string[] }
  | { jenis: 'ingat'; teks: string }
  | { jenis: 'contoh'; teks: string }
  | { jenis: 'arab'; arab: string; latin: string; arti: string }
  | { jenis: 'kosakata'; item: { en: string; id: string; gambar?: string }[] }
  | { jenis: 'gambar'; src: string; alt: string; keterangan?: string };

export interface KartuMateri { id: string; judul: string; isi: Blok[] }

export interface SubBab {
  id: string;
  judul: string;
  materi: KartuMateri[];
  soal: Soal[];
}
export interface Bab {
  id: string;
  nomor: number;
  judul: string;
  subBab: SubBab[];
}
export interface Mapel {
  id: 'pai' | 'inggris' | string;
  nama: string;
  namaPendek: string;
  ikon: 'MoonStar' | 'Languages' | string;
  warna: string;
  bab: Bab[];
}

/** Tipe yang dinilai otomatis (uraian tidak). */
export const TIPE_DINILAI: TipeSoal[] = ['pg', 'bs', 'isian', 'jodohkan', 'urutkan'];
