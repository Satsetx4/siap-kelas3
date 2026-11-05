import { Link, useNavigate } from 'react-router-dom';
import { Languages, MoonStar, Star } from 'lucide-react';
import { motion } from 'motion/react';
import { useMapel } from '../content/ContentProvider';
import AppHeader from '../components/layout/AppHeader';
import Seo from '../components/layout/Seo';
import Button from '../components/ui/Button';
import { tekan } from '../lib/motion';

const ikonMapel = { MoonStar, Languages, Star } as const;

export default function MapelList() {
  const mapel = useMapel();
  const navigate = useNavigate();

  return (
    <>
      <Seo judul="Mata Pelajaran" deskripsi="Pilih mata pelajaran untuk mulai belajar." />
      <AppHeader judul="Mata Pelajaran" backTo="/beranda" />
      <main className="space-y-3 p-4">
        {mapel.map((m) => {
          const Ikon = ikonMapel[m.ikon as keyof typeof ikonMapel] ?? Star;
          const warna = m.warna === 'pai' ? 'border-pai-500' : m.warna === 'ing' ? 'border-ing-500' : 'border-jeruk-500';
          const latar = m.warna === 'pai' ? 'bg-pai-100' : m.warna === 'ing' ? 'bg-ing-100' : 'bg-krem-100';
          return (
            <motion.div key={m.id} {...tekan}>
              <Link
                to={`/mapel/${m.id}`}
                className={`flex items-center gap-4 rounded-3xl border-l-4 ${warna} bg-white p-5 shadow-[0_2px_12px_rgba(30,27,24,0.06)] dark:bg-malam-900 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-jeruk-500`}
              >
                <span className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl ${latar}`}>
                  <Ikon size={28} className="text-tinta-900" aria-hidden="true" />
                </span>
                <span className="min-w-0">
                  <span className="block text-xl">{m.namaPendek}</span>
                  <span className="block text-base text-tinta-500 dark:text-[#B8AEA3]">{m.nama}</span>
                </span>
              </Link>
            </motion.div>
          );
        })}

        <div className="pt-2">
          <Button varian="sekunder" className="w-full" onClick={() => navigate('/ujian-gabungan')}>
            Ujian Gabungan
          </Button>
        </div>
      </main>
    </>
  );
}
