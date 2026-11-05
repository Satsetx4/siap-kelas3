import { useNavigate } from 'react-router-dom';
import { ShieldCheck } from 'lucide-react';
import { useApp } from '../store/useApp';
import { avatarDari } from '../lib/avatar';
import AppHeader from '../components/layout/AppHeader';
import Seo from '../components/layout/Seo';
import ThemeToggle from '../components/layout/ThemeToggle';
import Card from '../components/ui/Card';

export default function Beranda() {
  const { profil, profilAktifId } = useApp();
  const navigate = useNavigate();
  const aktif = profil.find((p) => p.id === profilAktifId);

  if (!aktif) return null;
  const { Ikon, latar } = avatarDari(aktif.avatar);

  return (
    <>
      <Seo judul="Beranda" />
      <AppHeader
        judul={`Hai, ${aktif.nama}!`}
        tanpaKembali
        kanan={
          <>
            <ThemeToggle />
            <button
              type="button"
              aria-label="Area Orang Tua"
              onClick={() => navigate('/ortu')}
              className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-krem-100 text-tinta-900 dark:bg-malam-800 dark:text-[#F5EFE6] focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-jeruk-500"
            >
              <ShieldCheck size={24} aria-hidden="true" />
            </button>
            <button
              type="button"
              aria-label="Ganti profil"
              onClick={() => navigate('/profil')}
              className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl ${latar} focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-jeruk-500`}
            >
              <Ikon size={24} className="text-tinta-900" aria-hidden="true" />
            </button>
          </>
        }
      />
      <main className="p-4">
        <Card>
          <h2 className="text-xl">Mau belajar apa hari ini?</h2>
          <p className="mt-2 text-lg text-tinta-500 dark:text-[#B8AEA3]">Pilih menu Mapel untuk mulai.</p>
        </Card>
      </main>
    </>
  );
}
