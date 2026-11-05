import { RotateCcw } from 'lucide-react';
import type { SoalUrutkan } from '../../content/types';

interface Props {
  soal: SoalUrutkan;
  acak: number[];
  urutan: number[];
  sudahDicek: boolean;
  onUbah: (urutan: number[]) => void;
}

export default function SoalUrutkanView({ soal, acak, urutan, sudahDicek, onUbah }: Props) {
  const kolam = (acak.length === soal.urutanBenar.length ? acak : soal.urutanBenar.map((_, i) => i)).filter((i) => !urutan.includes(i));

  return (
    <div className="space-y-4">
      <div>
        <p className="mb-2 text-base text-tinta-500 dark:text-[#B8AEA3]">Jawabanmu (ketuk untuk mengembalikan)</p>
        <ol className="space-y-2" aria-label="Urutan jawaban">
          {urutan.length === 0 ? (
            <li className="rounded-2xl border border-dashed border-krem-200 p-4 text-center text-base text-tinta-500 dark:border-malam-700 dark:text-[#B8AEA3]">
              Belum ada urutan.
            </li>
          ) : null}
          {urutan.map((asli, posisi) => (
            <li key={asli}>
              <button
                type="button"
                disabled={sudahDicek}
                onClick={() => onUbah(urutan.filter((v) => v !== asli))}
                className="flex w-full items-center gap-3 rounded-2xl border border-krem-200 bg-white p-3 text-left text-lg dark:border-malam-700 dark:bg-malam-900 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-jeruk-500"
              >
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-jeruk-500 text-sm font-bold text-tinta-900">{posisi + 1}</span>
                <span className="break-words">{soal.urutanBenar[asli]}</span>
              </button>
            </li>
          ))}
        </ol>
      </div>

      {kolam.length > 0 ? (
        <div>
          <p className="mb-2 text-base text-tinta-500 dark:text-[#B8AEA3]">Pilihan (ketuk untuk memasukkan)</p>
          <ul className="flex flex-wrap gap-2">
            {kolam.map((asli) => (
              <li key={asli}>
                <button
                  type="button"
                  disabled={sudahDicek}
                  onClick={() => onUbah([...urutan, asli])}
                  className="rounded-2xl border border-krem-200 bg-krem-100 px-4 py-3 text-lg dark:border-malam-700 dark:bg-malam-800 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-jeruk-500"
                >
                  {soal.urutanBenar[asli]}
                </button>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {urutan.length > 0 && !sudahDicek ? (
        <button
          type="button"
          onClick={() => onUbah([])}
          className="inline-flex min-h-12 items-center gap-2 rounded-2xl bg-krem-100 px-4 text-base dark:bg-malam-800 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-jeruk-500"
        >
          <RotateCcw size={18} aria-hidden="true" /> Ulang
        </button>
      ) : null}
    </div>
  );
}
