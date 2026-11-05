import type { KartuMateri as Kart } from '../../content/types';
import BlokRenderer from './BlokRenderer';
import TombolBacakan from './TombolBacakan';

function teksKartu(kartu: Kart): string {
  return kartu.isi
    .map((b) => {
      switch (b.jenis) {
        case 'paragraf': return b.teks;
        case 'poin': return b.item.join('. ');
        case 'ingat': return `Ingat ya. ${b.teks}`;
        case 'contoh': return `Contoh. ${b.teks}`;
        case 'kosakata': return b.item.map((k) => `${k.en}, ${k.id}`).join('. ');
        case 'gambar': return b.keterangan ?? '';
        case 'arab': return '';
        default: return '';
      }
    })
    .filter(Boolean)
    .join(' ');
}

export default function KartuMateri({ kartu }: { kartu: Kart }) {
  const punyaArab = kartu.isi.some((b) => b.jenis === 'arab');
  const teks = teksKartu(kartu);

  return (
    <article className="rounded-3xl border border-krem-200 bg-white p-5 shadow-[0_2px_12px_rgba(30,27,24,0.06)] dark:border-malam-800 dark:bg-malam-900">
      <h2 className="text-xl">{kartu.judul}</h2>
      <div className="mt-3 space-y-3">
        {kartu.isi.map((b, i) => <BlokRenderer key={i} blok={b} />)}
      </div>
      {teks.trim() && !punyaArab ? (
        <div className="mt-4">
          <TombolBacakan teks={teks} />
        </div>
      ) : null}
      {teks.trim() && punyaArab ? (
        <div className="mt-4">
          <TombolBacakan teks={teks} />
        </div>
      ) : null}
    </article>
  );
}
