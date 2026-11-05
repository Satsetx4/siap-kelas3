import { AnimatePresence, motion } from 'motion/react';
import { useLocation, useOutlet } from 'react-router-dom';
import type { ReactNode } from 'react';
import { geserHalaman } from '../../lib/motion';
import MobileBottomNav from './MobileBottomNav';

export default function PageShell({ children }: { children?: ReactNode }) {
  const lokasi = useLocation();
  const outlet = useOutlet();

  return (
    <>
      <div className="mx-auto min-h-dvh w-full max-w-[480px] pb-[calc(56px+env(safe-area-inset-bottom)+16px)]">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={lokasi.pathname}
            variants={geserHalaman}
            initial="masuk"
            animate="tampil"
            exit="keluar"
          >
            {children ?? outlet}
          </motion.div>
        </AnimatePresence>
      </div>
      <MobileBottomNav />
    </>
  );
}
