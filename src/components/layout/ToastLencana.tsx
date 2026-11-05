import { useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Award } from 'lucide-react';
import { useApp } from '../../store/useApp';
import { DAFTAR_LENCANA } from '../../engine/lencana';

export default function ToastLencana() {
  const lencanaBaru = useApp((s) => s.lencanaBaru);
  const bersihkan = useApp((s) => s.bersihkanLencanaBaru);

  useEffect(() => {
    if (lencanaBaru.length === 0) return;
    const id = window.setTimeout(bersihkan, 3500);
    return () => window.clearTimeout(id);
  }, [lencanaBaru, bersihkan]);

  const pertama = lencanaBaru[0];
  const info = DAFTAR_LENCANA.find((l) => l.id === pertama);

  return (
    <div aria-live="polite" className="pointer-events-none fixed inset-x-0 top-3 z-40 flex justify-center px-4">
      <AnimatePresence>
        {info ? (
          <motion.div
            key={info.id}
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex items-center gap-3 rounded-2xl bg-jeruk-500 px-4 py-3 text-tinta-900 shadow-lg"
          >
            <Award size={24} aria-hidden="true" />
            <p className="text-lg font-medium">Lencana baru: {info.nama}!</p>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
