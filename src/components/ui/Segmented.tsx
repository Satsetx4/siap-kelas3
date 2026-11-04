import { motion } from 'motion/react';

interface Opsi {
  id: string;
  label: string;
}

interface Props {
  opsi: Opsi[];
  aktif: string;
  onPilih: (id: string) => void;
  label?: string;
}

export default function Segmented({ opsi, aktif, onPilih, label }: Props) {
  return (
    <div role={label ? 'group' : undefined} aria-label={label} className="flex gap-1 rounded-2xl bg-krem-100 p-1 dark:bg-malam-800">
      {opsi.slice(0, 3).map((o) => {
        const nyala = o.id === aktif;
        return (
          <button
            key={o.id}
            type="button"
            aria-pressed={nyala}
            onClick={() => onPilih(o.id)}
            className={`relative flex-1 rounded-xl px-3 py-3 text-lg focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-jeruk-500 ${nyala ? 'text-tinta-900 dark:text-malam-950' : 'text-tinta-500 dark:text-[#B8AEA3]'}`}
          >
            {nyala && (
              <motion.span
                layoutId="segmenAktif"
                className="absolute inset-0 rounded-xl bg-white shadow dark:bg-jeruk-400"
                transition={{ type: 'spring', stiffness: 380, damping: 32 }}
              />
            )}
            <span className="relative">{o.label}</span>
          </button>
        );
      })}
    </div>
  );
}
