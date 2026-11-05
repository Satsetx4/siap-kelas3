import { useState } from 'react';
import type { SoalJodohkan } from '../../content/types';

const warnaPasangan = [
  'bg-jeruk-100 border-jeruk-500',
  'bg-pai-100 border-pai-500',
  'bg-ing-100 border-ing-500',
  'bg-ragu-100 border-ragu-500',
  'bg-krem-200 border-tinta-500',
];

interface Props {
  soal: SoalJodohkan;
  acak: number[];
  pasangan: Record<number, number>;
  sudahDicek: boolean;
  onPasang: (pasangan: Record<number, number>) => void;
}

export default function SoalJodohkanView({ soal, acak, pasangan, sudahDicek, onPasang }: Props) {
  const [kiriAktif, setKiriAktif] = useState<number | null>(null);
  const kananUrut = acak.length === soal.pasangan.length ? acak : soal.pasangan.map((_, i) => i);

  const nomorPasangan = (kiri: number) => Object.keys(pasangan).map(Number).sort((a, b) => a - b).indexOf(kiri);

  const klikKiri = (i: number) => {
    if (sudahDicek) return;
    if (pasangan[i] !== undefined) {
      const salinan = { ...pasangan };
      delete salinan[i];
      onPasang(salinan);
      setKiriAktif(null);
      return;
    }
    setKiriAktif(i);
  };

  const klikKanan = (j: number) => {
    if (sudahDicek || kiriAktif === null) return;
    const salinan: Record<number, number> = {};
    Object.entries(pasangan).forEach(([k, v]) => { if (v !== j) salinan[Number(k)] = v; });
    salinan[kiriAktif] = j;
    onPasang(salinan);
    setKiriAktif(null);
  };

  return (
    <div className="grid grid-cols-2 gap-3">
      <ul className="space-y-2" aria-label="Kolom kiri">
        {soal.pasangan.map((p, i) => {
          const nomor = nomorPasangan(i);
          const terpasang = pasangan[i] !== undefined;
          return (
            <li key={p.kiri}>
              <button
                type="button"
                disabled={sudahDicek}
                onClick={() => klikKiri(i)}
                aria-pressed={kiriAktif === i}
                className={`flex w-full items-center gap-2 rounded-2xl border p-3 text-left text-base focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-jeruk-500 ${
                  terpasang ? warnaPasangan[nomor % warnaPasangan.length] : kiriAktif === i ? 'border-2 border-jeruk-500 bg-krem-100 dark:bg-malam-800' : 'border-krem-200 bg-white dark:border-malam-700 dark:bg-malam-900'
                }`}
              >
                {terpasang ? <span className="text-xs font-bold">{nomor + 1}</span> : null}
                <span className="break-words">{p.kiri}</span>
              </button>
            </li>
          );
        })}
      </ul>
      <ul className="space-y-2" aria-label="Kolom kanan">
        {kananUrut.map((j) => {
          const kiri = Object.keys(pasangan).map(Number).find((k) => pasangan[k] === j);
          const nomor = kiri !== undefined ? nomorPasangan(kiri) : -1;
          return (
            <li key={soal.pasangan[j].kanan}>
              <button
                type="button"
                disabled={sudahDicek}
                onClick={() => klikKanan(j)}
                className={`flex w-full items-center gap-2 rounded-2xl border p-3 text-left text-base focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-jeruk-500 ${
                  kiri !== undefined ? warnaPasangan[nomor % warnaPasangan.length] : 'border-krem-200 bg-white dark:border-malam-700 dark:bg-malam-900'
                }`}
              >
                {kiri !== undefined ? <span className="text-xs font-bold">{nomor + 1}</span> : null}
                <span className="break-words">{soal.pasangan[j].kanan}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
