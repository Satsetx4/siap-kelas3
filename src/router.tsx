import { createBrowserRouter, Navigate, Outlet } from 'react-router-dom';
import type { ComponentType } from 'react';
import PageShell from './components/layout/PageShell';
import Beranda from './pages/Beranda';
import Profil from './pages/Profil';
import ProfilBaru from './pages/ProfilBaru';
import { useApp } from './store/useApp';

function Pengalih() {
  const profilAktifId = useApp((s) => s.profilAktifId);
  return <Navigate to={profilAktifId ? '/beranda' : '/profil'} replace />;
}

function ButuhProfil() {
  const profilAktifId = useApp((s) => s.profilAktifId);
  if (!profilAktifId) return <Navigate to="/profil" replace />;
  return <Outlet />;
}

function ButuhOrtu() {
  let lolos = false;
  try { lolos = window.sessionStorage.getItem('sk3:ortu') === '1'; } catch { lolos = false; }
  if (!lolos) return <Navigate to="/ortu" replace />;
  return <Outlet />;
}

type Halaman = () => Promise<{ default: ComponentType }>;

function halaman(muat: Halaman) {
  return async () => {
    const mod = await muat();
    return { Component: mod.default };
  };
}

const h = (muat: Halaman) => ({ lazy: halaman(muat) });

export const router = createBrowserRouter([
  {
    element: <PageShell />,
    hydrateFallbackElement: <div className="min-h-dvh" />,
    children: [
      { path: '/', element: <Pengalih /> },
      { path: '/profil', element: <Profil /> },
      { path: '/profil/baru', element: <ProfilBaru /> },
      {
        element: <ButuhProfil />,
        children: [
          { path: '/beranda', element: <Beranda /> },
          { path: '/mapel', ...h(() => import('./pages/MapelList')) },
          { path: '/mapel/:mapelId', ...h(() => import('./pages/BabList')) },
          { path: '/mapel/:mapelId/bab/:babId', ...h(() => import('./pages/BabDetail')) },
          { path: '/mapel/:mapelId/bab/:babId/materi/:subBabId', ...h(() => import('./pages/Materi')) },
          { path: '/ujian-gabungan', ...h(() => import('./pages/UjianGabungan')) },
          { path: '/sesi', ...h(() => import('./pages/Sesi')) },
          { path: '/hasil', ...h(() => import('./pages/Hasil')) },
          { path: '/ulang', ...h(() => import('./pages/Ulang')) },
          { path: '/prestasi', ...h(() => import('./pages/Prestasi')) },
        ],
      },
      { path: '/ortu', ...h(() => import('./pages/OrtuGerbang')) },
      {
        element: <ButuhOrtu />,
        children: [
          { path: '/ortu/rapor', ...h(() => import('./pages/OrtuRapor')) },
          { path: '/ortu/pengaturan', ...h(() => import('./pages/OrtuPengaturan')) },
        ],
      },
      { path: '*', ...h(() => import('./pages/NotFound')) },
    ],
  },
]);
