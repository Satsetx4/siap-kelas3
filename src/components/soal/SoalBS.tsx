import { Check, X } from 'lucide-react';

interface Props {
  nilai?: boolean;
  sudahDicek: boolean;
  onPilih: (nilai: boolean) => void;
}

export default function SoalBSView({ nilai, sudahDicek, onPilih }: Props) {
  const dasar = 'flex flex-1 items-center justify-center gap-2 rounded-2xl p-5 text-lg focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-jeruk-500';

  return (
    <div className="flex gap-3">
      <button
        type="button"
        disabled={sudahDicek}
        aria-pressed={nilai === true}
        onClick={() => onPilih(true)}
        className={`${dasar} ${nilai === true && !sudahDicek ? 'border-2 border-jeruk-500 bg-white dark:bg-malam-900' : 'border border-krem-200 bg-white dark:border-malam-700 dark:bg-malam-900'}`}
      >
        <Check size={22} className="text-benar-500" aria-hidden="true" /> Benar
      </button>
      <button
        type="button"
        disabled={sudahDicek}
        aria-pressed={nilai === false}
        onClick={() => onPilih(false)}
        className={`${dasar} ${nilai === false && !sudahDicek ? 'border-2 border-jeruk-500 bg-white dark:bg-malam-900' : 'border border-krem-200 bg-white dark:border-malam-700 dark:bg-malam-900'}`}
      >
        <X size={22} className="text-salah-500" aria-hidden="true" /> Salah
      </button>
    </div>
  );
}
