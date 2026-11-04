import { motion } from 'motion/react';

interface Props {
  persen: number;
  label?: string;
  ukuran?: number;
}

export default function ProgressRing({ persen, label, ukuran = 96 }: Props) {
  const aman = Math.max(0, Math.min(100, persen));
  const r = 40;
  const keliling = 2 * Math.PI * r;
  return (
    <div role="progressbar" aria-valuenow={Math.round(aman)} aria-valuemin={0} aria-valuemax={100} aria-label={label ?? 'Progres'} className="inline-flex">
      <svg width={ukuran} height={ukuran} viewBox="0 0 96 96">
        <circle cx="48" cy="48" r={r} fill="none" strokeWidth="10" className="stroke-krem-200 dark:stroke-malam-700" />
        <motion.circle
          cx="48"
          cy="48"
          r={r}
          fill="none"
          strokeWidth="10"
          strokeLinecap="round"
          className="stroke-jeruk-500"
          strokeDasharray={keliling}
          initial={{ strokeDashoffset: keliling }}
          whileInView={{ strokeDashoffset: keliling - (keliling * aman) / 100 }}
          viewport={{ once: true }}
          transform="rotate(-90 48 48)"
          transition={{ duration: 0.8, ease: 'easeOut' }}
          style={{ pathLength: 1 }}
        />
      </svg>
    </div>
  );
}
