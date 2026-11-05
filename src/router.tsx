import { createBrowserRouter, Navigate } from 'react-router-dom';
import PageShell from './components/layout/PageShell';
import HalamanKerangka from './pages/HalamanKerangka';
import NotFound from './pages/NotFound';

export const router = createBrowserRouter([
  {
    element: <PageShell />,
    children: [
      { path: '/', element: <Navigate to="/beranda" replace /> },
      { path: '/profil', element: <HalamanKerangka judul="Siapa yang belajar?" /> },
      { path: '/profil/baru', element: <HalamanKerangka judul="Profil Baru" backTo="/profil" /> },
      { path: '/beranda', element: <HalamanKerangka judul="Beranda" tanpaKembali /> },
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
