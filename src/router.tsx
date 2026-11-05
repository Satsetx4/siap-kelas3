import { createBrowserRouter, Navigate } from 'react-router-dom';
import PageShell from './components/layout/PageShell';
import HalamanKerangka from './pages/HalamanKerangka';
import NotFound from './pages/NotFound';
import Profil from './pages/Profil';
import ProfilBaru from './pages/ProfilBaru';
import Beranda from './pages/Beranda';
import { useApp } from './store/useApp';

function Pengalih() {
  const profilAktifId = useApp((s) => s.profilAktifId);
  return <Navigate to={profilAktifId ? '/beranda' : '/profil'} replace />;
}

function ButuhProfil({ children }: { children: React.ReactNode }) {
  const profilAktifId = useApp((s) => s.profilAktifId);
  if (!profilAktifId) return <Navigate to="/profil" replace />;
  return <>{children}</>;
}

export const router = createBrowserRouter([
  {
    element: <PageShell />,
    children: [
      { path: '/', element: <Pengalih /> },
      { path: '/profil', element: <Profil /> },
      { path: '/profil/baru', element: <ProfilBaru /> },
      { path: '/beranda', element: <ButuhProfil><Beranda /></ButuhProfil> },
      { path: '/mapel', element: <HalamanKerangka judul="Mata Pelajaran" backTo="/beranda" /> },
      { path: '/mapel/:mapelId', element: <HalamanKerangka judul="Mata Pelajaran" backTo="/mapel" /> },
      { path: '/mapel/:mapelId/bab/:babId', element: <HalamanKerangka judul="Bab" backTo="/mapel" /> },
      { path: '/mapel/:mapelId/bab/:babId/materi/:subBabId', element: <HalamanKerangka judul="Materi" backTo="/mapel" /> },
      { path: '/ujian-gabungan', element: <HalamanKerangka judul="Ujian Gabungan" backTo="/mapel" /> },
      { path: '/sesi', element: <HalamanKerangka judul="Latihan" backTo="/beranda" /> },
      { path: '/hasil', element: <HalamanKerangka judul="Hasil" backTo="/beranda" /> },
      { path: '/ulang', element: <HalamanKerangka judul="Ulang Soal Salah" backTo="/beranda" /> },
      { path: '/prestasi', element: <HalamanKerangka judul="Prestasi" backTo="/beranda" /> },
      { path: '/ortu', element: <HalamanKerangka judul="Area Orang Tua" backTo="/beranda" /> },
      { path: '/ortu/rapor', element: <HalamanKerangka judul="Rapor" backTo="/ortu" /> },
      { path: '/ortu/pengaturan', element: <HalamanKerangka judul="Pengaturan" backTo="/ortu" /> },
      { path: '*', element: <NotFound /> },
    ],
  },
]);
