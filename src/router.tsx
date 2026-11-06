import { createBrowserRouter, Navigate } from 'react-router-dom';
import PageShell from './components/layout/PageShell';
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
import Ulang from './pages/Ulang';
import Prestasi from './pages/Prestasi';
import OrtuGerbang from './pages/OrtuGerbang';
import OrtuRapor from './pages/OrtuRapor';
import OrtuPengaturan from './pages/OrtuPengaturan';
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

function ButuhOrtu({ children }: { children: React.ReactNode }) {
  let lolos = false;
  try { lolos = window.sessionStorage.getItem('sk3:ortu') === '1'; } catch { lolos = false; }
  if (!lolos) return <Navigate to="/ortu" replace />;
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
      { path: '/ulang', element: <ButuhProfil><Ulang /></ButuhProfil> },
      { path: '/prestasi', element: <ButuhProfil><Prestasi /></ButuhProfil> },
      { path: '/ortu', element: <OrtuGerbang /> },
      { path: '/ortu/rapor', element: <ButuhOrtu><OrtuRapor /></ButuhOrtu> },
      { path: '/ortu/pengaturan', element: <ButuhOrtu><OrtuPengaturan /></ButuhOrtu> },
      { path: '*', element: <NotFound /> },
    ],
  },
]);
