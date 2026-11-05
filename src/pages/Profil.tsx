import { Navigate, useNavigate } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { motion } from 'motion/react';
import { useApp, MAKS_PROFIL } from '../store/useApp';
import { avatarDari } from '../lib/avatar';
import AppHeader from '../components/layout/AppHeader';
import Seo from '../components/layout/Seo';
import { tekan } from '../lib/motion';

export default function Profil() {
  const { profil, pilihProfil } = useApp();
  const navigate = useNavigate();

  if (profil.length === 0) return <Navigate to="/profil/baru" replace />;

  return (
    <>
      <Seo judul="Siapa yang belajar?" />
      <AppHeader judul="Siapa yang belajar?" backTo="/beranda" />
      <main className="p-4">
        <ul className="grid grid-cols-2 gap-3">
          {profil.map((p) => {
            const { Ikon, latar } = avatarDari(p.avatar);
            return (
              <li key={p.id}>
                <motion.button
                  {...tekan}
                  onClick={() => { pilihProfil(p.id); navigate('/beranda'); }}
                  className="flex w-full flex-col items-center gap-2 rounded-3xl border border-krem-200 bg-white p-4 dark:border-malam-800 dark:bg-malam-900 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-jeruk-500"
                >
                  <span className={`flex h-16 w-16 items-center justify-center rounded-full ${latar}`}>
                    <Ikon size={32} className="text-tinta-900" aria-hidden="true" />
                  </span>
                  <span className="text-lg">{p.nama}</span>
                </motion.button>
              </li>
            );
          })}
          {profil.length < MAKS_PROFIL && (
            <li>
              <motion.button
                {...tekan}
                onClick={() => navigate('/profil/baru')}
                className="flex h-full w-full flex-col items-center justify-center gap-2 rounded-3xl border-2 border-dashed border-krem-200 p-4 text-tinta-500 dark:border-malam-700 dark:text-[#B8AEA3] focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-jeruk-500"
              >
                <Plus size={32} aria-hidden="true" />
                <span className="text-lg">Tambah Profil</span>
              </motion.button>
            </li>
          )}
        </ul>
      </main>
    </>
  );
}
