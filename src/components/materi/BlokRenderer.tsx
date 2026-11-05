import { Lightbulb, Volume2 } from 'lucide-react';
import type { Blok } from '../../content/types';
import TeksArab from './TeksArab';
import { bicara } from '../../lib/tts';

function teksKosakata(en: string) {
  return en;
}

export default function BlokRenderer({ blok }: { blok: Blok }) {
  switch (blok.jenis) {
    case 'paragraf':
      return <p className="text-lg leading-relaxed text-tinta-900 dark:text-[#F5EFE6]">{blok.teks}</p>;

    case 'poin':
      return (
        <ul className="list-disc space-y-1 pl-6 text-lg leading-relaxed text-tinta-900 dark:text-[#F5EFE6]">
          {blok.item.map((t, i) => <li key={i}>{t}</li>)}
        </ul>
      );

    case 'ingat':
      return (
        <aside className="rounded-2xl border-l-4 border-pai-500 bg-pai-100 p-4 dark:bg-pai-900/40">
          <p className="text-lg font-bold text-pai-900 dark:text-pai-100">Ingat ya!</p>
          <p className="mt-1 text-lg text-tinta-900 dark:text-[#F5EFE6]">{blok.teks}</p>
        </aside>
      );

    case 'contoh':
      return (
        <aside className="rounded-2xl border-l-4 border-jeruk-500 bg-krem-100 p-4 dark:bg-malam-800">
          <p className="flex items-center gap-2 text-lg font-bold text-jeruk-700 dark:text-jeruk-400">
            <Lightbulb size={20} aria-hidden="true" /> Contoh
          </p>
          <p className="mt-1 text-lg text-tinta-900 dark:text-[#F5EFE6]">{blok.teks}</p>
        </aside>
      );

    case 'arab':
      return <TeksArab arab={blok.arab} latin={blok.latin} arti={blok.arti} />;

    case 'kosakata':
      return (
        <ul className="space-y-2">
          {blok.item.map((k) => (
            <li key={k.en} className="flex items-center justify-between gap-3 rounded-2xl bg-krem-100 p-3 dark:bg-malam-800">
              <span className="text-lg text-tinta-900 dark:text-[#F5EFE6]">
                <strong>{k.en}</strong> — {k.id}
              </span>
              <button
                type="button"
                aria-label={`Dengarkan ${k.en}`}
                onClick={() => bicara(teksKosakata(k.en), 'en-US')}
                className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-tinta-900 dark:bg-malam-900 dark:text-[#F5EFE6] focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-jeruk-500"
              >
                <Volume2 size={20} aria-hidden="true" />
              </button>
            </li>
          ))}
        </ul>
      );

    case 'gambar':
      return (
        <figure className="my-3">
          <img src={blok.src} alt={blok.alt} loading="lazy" className="w-full rounded-2xl" />
          {blok.keterangan ? (
            <figcaption className="mt-2 text-base text-tinta-500 dark:text-[#B8AEA3]">{blok.keterangan}</figcaption>
          ) : null}
        </figure>
      );

    default:
      return null;
  }
}
