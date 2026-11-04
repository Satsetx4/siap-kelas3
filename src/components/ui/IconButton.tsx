import { motion } from 'motion/react';
import type { ButtonHTMLAttributes } from 'react';
import { tekan } from '../../lib/motion';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  'aria-label': string;
}

export default function IconButton({ children, className = '', ...sisa }: Props) {
  return (
    <motion.button
      {...tekan}
      className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-krem-100 text-tinta-900 border border-krem-200 dark:bg-malam-800 dark:text-[#F5EFE6] dark:border-malam-700 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-jeruk-500 ${className}`}
      {...(sisa as object)}
    >
      {children}
    </motion.button>
  );
}
