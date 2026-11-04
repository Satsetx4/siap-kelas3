import { motion } from 'motion/react';
import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { tekan } from '../../lib/motion';

type Varian = 'primer' | 'sekunder' | 'hantu' | 'bahaya';
type Ukuran = 'md' | 'lg';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  varian?: Varian;
  ukuran?: Ukuran;
  ikonKiri?: ReactNode;
}

const gayaVarian: Record<Varian, string> = {
  primer: 'bg-jeruk-500 text-tinta-900 hover:bg-jeruk-400 dark:bg-jeruk-400 dark:text-malam-950 dark:hover:bg-jeruk-500',
  sekunder: 'bg-krem-100 text-tinta-900 border border-krem-200 dark:bg-malam-800 dark:text-[#F5EFE6] dark:border-malam-700',
  hantu: 'bg-transparent text-tinta-700 dark:text-[#B8AEA3]',
  bahaya: 'bg-salah-500 text-white hover:bg-salah-500/90',
};

const gayaUkuran: Record<Ukuran, string> = {
  md: 'h-12 px-5 text-lg',
  lg: 'h-14 px-6 text-lg',
};

export default function Button({ varian = 'primer', ukuran = 'md', ikonKiri, children, className = '', disabled, ...sisa }: Props) {
  return (
    <motion.button
      {...tekan}
      animate={undefined}
      className={`inline-flex items-center justify-center gap-2 rounded-2xl font-display font-medium focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-jeruk-500 ${gayaVarian[varian]} ${gayaUkuran[ukuran]} ${disabled ? 'opacity-50' : ''} ${className}`}
      disabled={disabled}
      {...(sisa as object)}
    >
      {ikonKiri}
      {children}
    </motion.button>
  );
}
