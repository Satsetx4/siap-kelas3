import { motion } from 'motion/react';

interface Props {
  persen: number;
  label?: string;
  warna?: string;
}

export default function ProgressBar({ persen, label, warna = 'bg-jeruk-500' }: Props) {
  const aman = Math.max(0, Math.min(100, persen));
  return (
    <div role="progressbar" aria-valuenow={Math.round(aman)} aria-valuemin={0} aria-valuemax={100} aria-label={label ?? 'Progres'}>
      <div className="h-3 overflow-hidden rounded-full bg-krem-200 dark:bg-malam-700">
        <motion.div
          className={`h-full rounded-full ${warna}`}
          initial={{ width: 0 }}
          whileInView={{ width: `${aman}%` }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 120, damping: 20 }}
        />
      </div>
    </div>
  );
}
