import { motion } from 'motion/react';
import { NavLink, useLocation } from 'react-router-dom';
import { BookOpen, Home, RotateCcw, Trophy } from 'lucide-react';

const tab = [
  { ke: '/beranda', label: 'Beranda', Ikon: Home },
  { ke: '/mapel', label: 'Mapel', Ikon: BookOpen },
  { ke: '/ulang', label: 'Ulang', Ikon: RotateCcw },
  { ke: '/prestasi', label: 'Prestasi', Ikon: Trophy },
];

export default function MobileBottomNav({ jumlahSalah = 0 }: { jumlahSalah?: number }) {
  const lokasi = useLocation();
  if (lokasi.pathname === '/sesi' || lokasi.pathname === '/profil' || lokasi.pathname === '/profil/baru') return null;

  return (
    <nav className="fixed inset-x-0 bottom-0 z-30 border-t border-krem-200 bg-krem-50/95 backdrop-blur dark:border-malam-800 dark:bg-malam-950/95">
      <div className="mx-auto flex max-w-[480px] items-stretch justify-around pb-[env(safe-area-inset-bottom)]">
        {tab.map(({ ke, label, Ikon }) => (
          <NavLink
            key={ke}
            to={ke}
            className={({ isActive }) =>
              `relative flex min-h-[56px] flex-1 flex-col items-center justify-center gap-1 px-2 py-2 text-sm focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-jeruk-500 ${isActive ? 'text-tinta-900 dark:text-[#F5EFE6]' : 'text-tinta-500 dark:text-[#B8AEA3]'}`
            }
          >
            {({ isActive }) => (
              <>
                {isActive && (
                  <motion.span
                    layoutId="navAktif"
                    className="absolute inset-x-2 inset-y-1 rounded-2xl bg-krem-100 dark:bg-malam-800"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                  />
                )}
                <span className="relative">
                  <motion.span whileTap={{ scale: 0.85 }} className="inline-flex">
                    <Ikon size={24} aria-hidden="true" />
                  </motion.span>
                  {label === 'Ulang' && jumlahSalah > 0 ? (
                    <span className="absolute -right-2 -top-1 min-w-5 rounded-full bg-salah-500 px-1 text-center text-xs font-bold text-white">
                      {jumlahSalah}
                    </span>
                  ) : null}
                </span>
                <span className="relative">{label}</span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
