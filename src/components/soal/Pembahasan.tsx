import { Lightbulb } from 'lucide-react';
import type { Soal } from '../../content/types';
import TombolBacakan from '../materi/TombolBacakan';

export default function Pembahasan({ soal }: { soal: Soal }) {
  return (
    <section
      aria-label="Cara Mengerjakan"
      className="rounded-2xl border border-krem-200 bg-white p-4 dark:border-malam-700 dark:bg-malam-900"
    >
      <h3 className="flex items-center gap-2 text-lg">
        <Lightbulb size={20} className="text-jeruk-500" aria-hidden="true" /> Cara Mengerjakan
      </h3>
      <ol className="mt-2 list-decimal space-y-1 pl-5 text-lg">
        {soal.pembahasan.map((p, i) => <li key={i}>{p}</li>)}
      </ol>
      <div className="mt-3">
        <TombolBacakan teks={soal.pembahasan.join('. ')} />
      </div>
    </section>
  );
}
