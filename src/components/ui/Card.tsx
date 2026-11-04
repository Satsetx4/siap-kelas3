import { motion } from 'motion/react';
import type { ReactNode } from 'react';
import { tekan } from '../../lib/motion';

interface Props {
  children: ReactNode;
  interaktif?: boolean;
  className?: string;
  onClick?: () => void;
}

export default function Card({ children, interaktif = false, className = '', onClick }: Props) {
  const Tag = onClick ? motion.button : motion.div;
  return (
    <Tag
      {...(interaktif ? tekan : {})}
      onClick={onClick}
      className={`rounded-3xl border border-krem-200 bg-white p-5 shadow-[0_2px_12px_rgba(30,27,24,0.06)] dark:border-malam-800 dark:bg-malam-900 ${onClick ? 'w-full text-left' : ''} ${className}`}
    >
      {children}
    </Tag>
  );
}
