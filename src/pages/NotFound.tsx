import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { MapPinOff } from 'lucide-react';
import Button from '../components/ui/Button';
import Seo from '../components/layout/Seo';

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <main className="mx-auto flex min-h-[70dvh] max-w-[480px] flex-col items-center justify-center gap-4 p-6 text-center">
      <Seo judul="Halaman tidak ditemukan" />
      <motion.span animate={{ rotate: [0, -8, 8, -5, 5, 0] }} transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}>
        <MapPinOff size={64} className="text-jeruk-500" aria-hidden="true" />
      </motion.span>
      <h1 className="text-2xl">Halaman tidak ditemukan</h1>
      <p className="text-lg text-tinta-500 dark:text-[#B8AEA3]">Halaman yang kamu cari tidak ada. Yuk kembali ke beranda.</p>
      <Button onClick={() => navigate('/beranda')}>Ke Beranda</Button>
    </main>
  );
}
