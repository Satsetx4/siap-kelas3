import { createBrowserRouter, Navigate } from 'react-router-dom';
import PageShell from './components/layout/PageShell';
import HalamanKerangka from './pages/HalamanKerangka';
import NotFound from './pages/NotFound';
import Profil from './pages/Profil';
import ProfilBaru from './pages/ProfilBaru';
import Beranda from './pages/Beranda';
import MapelList from './pages/MapelList';
import BabList from './pages/BabList';
import BabDetail from './pages/BabDetail';
import Materi from './pages/Materi';
import Sesi from './pages/Sesi';
import Hasil from './pages/Hasil';
import UjianGabungan from './pages/UjianGabungan';
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
      { path: '/mapel', element: <MapelList /> },
      { path: '/mapel/:mapelId', element: <BabList /> },
      { path: '/mapel/:mapelId/bab/:babId', element: <BabDetail /> },
      { path: '/mapel/:mapelId/bab/:babId/materi/:subBabId', element: <Materi /> },
      { path: '/ujian-gabungan', element: <ButuhProfil><UjianGabungan /></ButuhProfil> },
      { path: '/sesi', element: <ButuhProfil><Sesi /></ButuhProfil> },
      { path: '/hasil', element: <ButuhProfil><Hasil /></ButuhProfil> },
      { path: '/ulang', element: <HalamanKerangka judul="Ulang Soal Salah" backTo="/beranda" /> },
      { path: '/prestasi', element: <HalamanKerangka judul="Prestasi" backTo="/beranda" /> },
      { path: '/ortu', element: <HalamanKerangka judul="Area Orang Tua" backTo="/beranda" /> },
      { path: '/ortu/rapor', element: <HalamanKerangka judul="Rapor" backTo="/ortu" /> },
      { path: '/ortu/pengaturan', element: <HalamanKerangka judul="Pengaturan" backTo="/ortu" /> },
      { path: '*', element: <NotFound /> },
    ],
  },
]);
