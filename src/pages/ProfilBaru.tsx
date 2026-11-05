import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { motion } from 'motion/react';
import { useApp, MAKS_PROFIL } from '../store/useApp';
import { DAFTAR_AVATAR } from '../lib/avatar';
import type { AvatarId } from '../store/types';
import AppHeader from '../components/layout/AppHeader';
import Seo from '../components/layout/Seo';
import Button from '../components/ui/Button';
import { tekan } from '../lib/motion';

const skemaNama = z
  .string()
  .trim()
  .min(1, 'Tulis nama dulu ya')
  .max(20, 'Nama maksimal 20 huruf')
  .regex(/^[\p{L} ]+$/u, 'Pakai huruf saja ya');

export default function ProfilBaru() {
  const { profil, buatProfil } = useApp();
  const navigate = useNavigate();
  const [nama, setNama] = useState('');
  const [avatar, setAvatar] = useState<AvatarId>('Cat');
  const [pesan, setPesan] = useState('');

  const simpan = (e: React.FormEvent) => {
    e.preventDefault();
    const hasil = skemaNama.safeParse(nama);
    if (!hasil.success) {
      setPesan(hasil.error.issues[0].message);
      return;
    }
    if (profil.length >= MAKS_PROFIL) {
      setPesan('Profil sudah penuh, maksimal 5.');
      return;
    }
    const id = buatProfil(hasil.data, avatar);
    if (id) navigate('/beranda', { replace: true });
    else setPesan('Profil sudah penuh, maksimal 5.');
  };

  return (
    <>
      <Seo judul="Profil Baru" />
      <AppHeader judul="Profil Baru" backTo="/profil" />
      <main className="p-4">
        <form onSubmit={simpan} noValidate>
          <label htmlFor="nama" className="mb-2 block text-lg">Nama kamu</label>
          <input
            id="nama"
            value={nama}
            onChange={(e) => { setNama(e.target.value); setPesan(''); }}
            maxLength={30}
            autoComplete="off"
            className="h-12 w-full rounded-2xl border border-krem-200 bg-white px-4 text-lg text-tinta-900 dark:border-malam-700 dark:bg-malam-900 dark:text-[#F5EFE6] focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-jeruk-500"
          />
          {pesan ? (
            <p role="alert" className="mt-2 text-base text-salah-500">{pesan}</p>
          ) : null}

          <p className="mb-2 mt-5 text-lg">Pilih gambar kesukaanmu</p>
          <ul className="grid grid-cols-4 gap-2">
            {DAFTAR_AVATAR.map(({ id, Ikon, latar }) => {
              const dipilih = id === avatar;
              return (
                <li key={id}>
                  <motion.button
                    type="button"
                    {...tekan}
                    aria-pressed={dipilih}
                    aria-label={`Gambar ${id}`}
                    onClick={() => setAvatar(id)}
                    className={`flex h-16 w-full items-center justify-center rounded-2xl ${latar} ${dipilih ? 'ring-3 ring-jeruk-500' : ''} focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-jeruk-500`}
                  >
                    <Ikon size={28} className="text-tinta-900" aria-hidden="true" />
                  </motion.button>
                </li>
              );
            })}
          </ul>

          <div className="mt-6">
            <Button type="submit" ukuran="lg" className="w-full">Simpan</Button>
          </div>
        </form>
      </main>
    </>
  );
}
