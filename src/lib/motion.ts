import type { Transition, Variants } from 'motion/react';
export const pegas: Transition = { type: 'spring', stiffness: 380, damping: 28 };
export const pegasLembut: Transition = { type: 'spring', stiffness: 300, damping: 30 };
export const tekan = { whileTap: { scale: 0.96 }, whileHover: { y: -2 } } as const;
export const muncul: Variants = { awal: { opacity: 0, y: 12 }, tampil: { opacity: 1, y: 0, transition: pegasLembut } };
export const daftarBertingkat: Variants = { awal: {}, tampil: { transition: { staggerChildren: 0.05 } } };
export const goyang = { x: [0, -10, 10, -6, 6, 0], transition: { duration: 0.35 } };
export const pop = { scale: [1, 1.08, 1], transition: { duration: 0.3 } };
export const geserHalaman: Variants = {
  masuk: { opacity: 0, x: 24 }, tampil: { opacity: 1, x: 0, transition: pegas }, keluar: { opacity: 0, x: -24, transition: { duration: 0.15 } },
};
