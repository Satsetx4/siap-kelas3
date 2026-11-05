import { AnimatePresence, motion } from 'motion/react';
import { useLocation, useOutlet } from 'react-router-dom';
import type { ReactNode } from 'react';
import { geserHalaman } from '../../lib/motion';
import { useApp } from '../../store/useApp';
import MobileBottomNav from './MobileBottomNav';
import ToastLencana from './ToastLencana';

export default function PageShell({ children }: { children?: ReactNode }) {
  const lokasi = useLocation();
  const outlet = useOutlet();
  const profilAktifId = useApp((s) => s.profilAktifId);
  const bankSalah = useApp((s) => {
    if (!profilAktifId) return 0;
    const soal = s.progres[profilAktifId]?.soal ?? {};
    return Object.values(soal).filter((v) => v.diBankSalah).length;
  });

  return (
    <>
      <ToastLencana />
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
      <MobileBottomNav jumlahSalah={bankSalah} />
    </>
  );
}
