import { useEffect, useState } from 'react';
import { Square, Volume2 } from 'lucide-react';
import { bicara, bisaBicara, diam } from '../../lib/tts';
import { usePref } from '../../store/usePref';

interface Props {
  teks: string;
  lang?: 'id-ID' | 'en-US';
  label?: string;
}

export default function TombolBacakan({ teks, lang = 'id-ID', label = 'Bacakan' }: Props) {
  const suaraAktif = usePref((s) => s.suaraAktif);
  const kecepatan = usePref((s) => s.kecepatan);
  const [sedang, setSedang] = useState(false);
  const [tersedia, setTersedia] = useState(false);

  useEffect(() => {
    setTersedia(bisaBicara());
    return () => diam();
  }, []);

  if (!tersedia || !suaraAktif) return null;

  const tekan = () => {
    if (sedang) {
      diam();
      setSedang(false);
      return;
    }
    bicara(teks, lang, kecepatan);
    setSedang(true);
    window.setTimeout(() => setSedang(false), Math.max(1200, teks.length * 70));
  };

  return (
    <button
      type="button"
      onClick={tekan}
      className="inline-flex min-h-12 items-center gap-2 rounded-2xl bg-krem-100 px-4 text-lg text-tinta-900 dark:bg-malam-800 dark:text-[#F5EFE6] focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-jeruk-500"
    >
      {sedang ? <Square size={20} aria-hidden="true" /> : <Volume2 size={20} aria-hidden="true" />}
      {sedang ? 'Stop' : label}
    </button>
  );
}
