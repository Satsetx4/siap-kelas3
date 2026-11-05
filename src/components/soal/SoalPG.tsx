import { Check, X } from 'lucide-react';
import type { SoalPG } from '../../content/types';

const huruf = ['A', 'B', 'C', 'D'];

interface Props {
  soal: SoalPG;
  acak: number[];
  pilih?: number;
  sudahDicek: boolean;
  onPilih: (indeks: number) => void;
  warna?: string;
}

export default function SoalPGView({ soal, acak, pilih, sudahDicek, onPilih, warna = 'jeruk' }: Props) {
  const urutan = acak.length === soal.pilihan.length ? acak : soal.pilihan.map((_, i) => i);
  const pakaiGambar = Array.isArray(soal.pilihanGambar) && soal.pilihanGambar.length === soal.pilihan.length;

  const gaya = (asli: number) => {
    const terpilih = pilih === asli;
    if (!sudahDicek) {
      return terpilih
        ? `border-2 border-${warna}-500 bg-white dark:bg-malam-900`
        : 'border border-krem-200 bg-white dark:border-malam-700 dark:bg-malam-900';
    }
    if (asli === soal.kunci) return 'border-2 border-benar-500 bg-benar-100';
    if (terpilih) return 'border-2 border-salah-500 bg-salah-100';
    return 'border border-krem-200 bg-white opacity-70 dark:border-malam-700 dark:bg-malam-900';
  };

  return (
    <ul className={pakaiGambar ? 'grid grid-cols-2 gap-3' : 'space-y-3'}>
      {urutan.map((asli) => (
        <li key={asli}>
          <button
            type="button"
            disabled={sudahDicek}
            aria-pressed={pilih === asli}
            onClick={() => onPilih(asli)}
            className={`flex w-full items-center gap-3 rounded-2xl p-4 text-left text-lg focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-jeruk-500 ${gaya(asli)}`}
          >
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-krem-100 text-base font-bold text-tinta-900 dark:bg-malam-700 dark:text-[#F5EFE6]">
              {huruf[asli]}
            </span>
            {pakaiGambar ? (
              <img src={soal.pilihanGambar![asli]} alt={`Pilihan ${huruf[asli]}`} className="h-20 w-full rounded-xl object-cover" />
            ) : (
              <span className="flex-1">{soal.pilihan[asli]}</span>
            )}
            {sudahDicek && asli === soal.kunci ? <Check size={22} className="text-benar-500" aria-label="Jawaban benar" /> : null}
            {sudahDicek && pilih === asli && asli !== soal.kunci ? <X size={22} className="text-salah-500" aria-label="Jawaban salah" /> : null}
          </button>
        </li>
      ))}
    </ul>
  );
}
