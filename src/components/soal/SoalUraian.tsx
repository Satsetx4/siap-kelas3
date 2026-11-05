import { useState } from 'react';
import { Eye } from 'lucide-react';
import type { SoalUraian } from '../../content/types';

export default function SoalUraianView({ soal }: { soal: SoalUraian }) {
  const [lihat, setLihat] = useState(false);

  return (
    <div className="space-y-3">
      <p className="rounded-2xl bg-krem-100 p-4 text-lg dark:bg-malam-800">
        Jawab di buku atau ucapkan ke orang tua.
      </p>
      <button
        type="button"
        onClick={() => setLihat((v) => !v)}
        className="inline-flex min-h-12 items-center gap-2 rounded-2xl bg-krem-100 px-4 text-base dark:bg-malam-800 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-jeruk-500"
      >
        <Eye size={18} aria-hidden="true" /> {lihat ? 'Sembunyikan Contoh Jawaban' : 'Lihat Contoh Jawaban'}
      </button>
      {lihat ? (
        <div className="rounded-2xl border border-krem-200 bg-white p-4 dark:border-malam-700 dark:bg-malam-900">
          <p className="text-lg">{soal.contohJawaban}</p>
          <p className="mt-3 text-base text-tinta-500 dark:text-[#B8AEA3]">Jawabanmu sudah mirip?</p>
        </div>
      ) : null}
    </div>
  );
}
