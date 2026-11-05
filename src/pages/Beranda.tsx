import { useNavigate } from 'react-router-dom';
import { ShieldCheck } from 'lucide-react';
import { useApp } from '../store/useApp';
import { avatarDari } from '../lib/avatar';
import { JUDUL_SESI } from '../lib/sesi';
import AppHeader from '../components/layout/AppHeader';
import Seo from '../components/layout/Seo';
import ThemeToggle from '../components/layout/ThemeToggle';
import Card from '../components/ui/Card';
import ProgressRing from '../components/ui/ProgressRing';
import { TARGET_HARIAN, hariBeruntun } from '../engine/lencana';
import { kunciHari } from '../lib/tanggal';

export default function Beranda() {
  const { profil, profilAktifId } = useApp();
  const progres = useApp((s) => (profilAktifId ? s.progres[profilAktifId] : undefined));
  const navigate = useNavigate();
  const aktif = profil.find((p) => p.id === profilAktifId);

  const hariIni = kunciHari();
  const jumlahHariIni = progres?.harian[hariIni] ?? 0;
  const streak = hariBeruntun(progres?.harian ?? {}, hariIni);

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
      <main className="space-y-3 p-4">
        <Card>
          <div className="flex items-center gap-4">
            <ProgressRing persen={(jumlahHariIni / TARGET_HARIAN) * 100} label="Target hari ini" ukuran={80} />
            <div>
              <h2 className="text-xl">Target Hari Ini</h2>
              <p className="text-lg text-tinta-500 dark:text-[#B8AEA3]">{jumlahHariIni} dari {TARGET_HARIAN} soal</p>
              <p className="text-base text-tinta-500 dark:text-[#B8AEA3]">Hari beruntun: {streak}</p>
            </div>
          </div>
        </Card>

        {progres?.sesiAktif ? (
          <Card onClick={() => navigate('/sesi')} interaktif>
            <p className="text-base text-tinta-500 dark:text-[#B8AEA3]">Lanjutkan</p>
            <p className="text-xl">{JUDUL_SESI[progres.sesiAktif.jenis]}</p>
            <p className="mt-1 text-lg text-tinta-500 dark:text-[#B8AEA3]">
              Soal {progres.sesiAktif.indeks + 1} dari {progres.sesiAktif.soalIds.length}
            </p>
          </Card>
        ) : null}

        <Card>
          <h2 className="text-xl">Mau belajar apa hari ini?</h2>
          <p className="mt-2 text-lg text-tinta-500 dark:text-[#B8AEA3]">Pilih menu Mapel untuk mulai.</p>
        </Card>
      </main>
    </>
  );
}
