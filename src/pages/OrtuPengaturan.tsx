import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../store/useApp';
import { usePref, type Kecepatan } from '../store/usePref';
import { useMapel } from '../content/ContentProvider';
import { DAFTAR_AVATAR } from '../lib/avatar';
import { VERSI_APP, NAMA_APP } from '../lib/versi';
import AppHeader from '../components/layout/AppHeader';
import Seo from '../components/layout/Seo';
import Button from '../components/ui/Button';
import Dialog from '../components/ui/Dialog';
import Segmented from '../components/ui/Segmented';
import type { AvatarId } from '../store/types';

export default function OrtuPengaturan() {
  const navigate = useNavigate();
  const mapelSemua = useMapel();
  const profil = useApp((s) => s.profil);
  const profilAktifId = useApp((s) => s.profilAktifId);
  const ubahProfil = useApp((s) => s.ubahProfil);
  const hapusProfil = useApp((s) => s.hapusProfil);
  const resetSemua = useApp((s) => s.resetSemua);

  const suaraAktif = usePref((s) => s.suaraAktif);
  const setSuaraAktif = usePref((s) => s.setSuaraAktif);
  const kecepatan = usePref((s) => s.kecepatan);
  const setKecepatan = usePref((s) => s.setKecepatan);

  const anak = profil.find((p) => p.id === profilAktifId) ?? profil[0];
  const [nama, setNama] = useState(anak?.nama ?? '');
  const [dialogHapus, setDialogHapus] = useState(false);
  const [dialogReset, setDialogReset] = useState(false);
  const [konfirmasi, setKonfirmasi] = useState('');
  const [gelap, setGelap] = useState(() => {
    try { return localStorage.getItem('sk3:tema') === 'gelap'; } catch { return false; }
  });

  const kunciPerluDicek = useMemo(
    () => mapelSemua.flatMap((m) => m.bab.flatMap((b) => b.subBab.flatMap((s) => s.soal)))
      .filter((s) => Boolean(s.catatanKunci)),
    [mapelSemua],
  );

  const gantiTema = (nilai: boolean) => {
    setGelap(nilai);
    try { localStorage.setItem('sk3:tema', nilai ? 'gelap' : 'terang'); } catch { /* abaikan */ }
    document.documentElement.classList.toggle('dark', nilai);
    try { document.documentElement.style.colorScheme = nilai ? 'dark' : 'light'; } catch { /* abaikan */ }
  };

  const simpanNama = () => {
    if (anak && nama.trim()) ubahProfil(anak.id, { nama });
  };

  const gantiAvatar = (avatar: AvatarId) => {
    if (anak) ubahProfil(anak.id, { avatar });
  };

  const hapus = () => {
    if (!anak) return;
    hapusProfil(anak.id);
    setDialogHapus(false);
    navigate('/profil', { replace: true });
  };

  const reset = () => {
    resetSemua();
    setDialogReset(false);
    navigate('/profil', { replace: true });
  };

  return (
    <>
      <Seo judul="Pengaturan" />
      <AppHeader judul="Pengaturan" backTo="/ortu/rapor" />
      <main className="space-y-4 p-4">
        <section className="rounded-3xl border border-krem-200 bg-white p-5 dark:border-malam-800 dark:bg-malam-900">
          <h2 className="text-xl">Profil Anak</h2>
          <label htmlFor="nama-anak" className="mt-3 block text-base">Nama</label>
          <div className="mt-1 flex gap-2">
            <input
              id="nama-anak"
              value={nama}
              onChange={(e) => setNama(e.target.value)}
              maxLength={20}
              className="h-12 flex-1 rounded-2xl border border-krem-200 bg-white px-3 text-lg dark:border-malam-700 dark:bg-malam-950 dark:text-[#F5EFE6]"
            />
            <Button onClick={simpanNama}>Simpan</Button>
          </div>

          <p className="mt-4 text-base">Gambar</p>
          <ul className="mt-2 grid grid-cols-6 gap-2">
            {DAFTAR_AVATAR.map(({ id, Ikon, latar }) => (
              <li key={id}>
                <button
                  type="button"
                  aria-label={`Pilih gambar ${id}`}
                  aria-pressed={anak?.avatar === id}
                  onClick={() => gantiAvatar(id)}
                  className={`flex h-12 w-full items-center justify-center rounded-xl ${latar} ${anak?.avatar === id ? 'ring-3 ring-jeruk-500' : ''}`}
                >
                  <Ikon size={20} className="text-tinta-900" aria-hidden="true" />
                </button>
              </li>
            ))}
          </ul>

          <div className="mt-4">
            <Button varian="bahaya" onClick={() => setDialogHapus(true)}>Hapus Profil</Button>
          </div>
        </section>

        <section className="rounded-3xl border border-krem-200 bg-white p-5 dark:border-malam-800 dark:bg-malam-900">
          <h2 className="text-xl">Suara</h2>
          <p className="mt-2 text-base">Tombol Bacakan</p>
          <div className="mt-2">
            <Segmented
              label="Tombol bacakan"
              opsi={[{ id: 'aktif', label: 'Aktif' }, { id: 'mati', label: 'Nonaktif' }]}
              aktif={suaraAktif ? 'aktif' : 'mati'}
              onPilih={(id) => setSuaraAktif(id === 'aktif')}
            />
          </div>
          <p className="mt-4 text-base">Kecepatan suara</p>
          <div className="mt-2">
            <Segmented
              label="Kecepatan suara"
              opsi={[
                { id: '0.8', label: 'Lambat' },
                { id: '1', label: 'Sedang' },
                { id: '1.2', label: 'Cepat' },
              ]}
              aktif={String(kecepatan)}
              onPilih={(id) => setKecepatan(Number(id) as Kecepatan)}
            />
          </div>
        </section>

        <section className="rounded-3xl border border-krem-200 bg-white p-5 dark:border-malam-800 dark:bg-malam-900">
          <h2 className="text-xl">Tampilan</h2>
          <div className="mt-2">
            <Segmented
              label="Tema"
              opsi={[{ id: 'terang', label: 'Terang' }, { id: 'gelap', label: 'Gelap' }]}
              aktif={gelap ? 'gelap' : 'terang'}
              onPilih={(id) => gantiTema(id === 'gelap')}
            />
          </div>
        </section>

        <section className="rounded-3xl border border-krem-200 bg-white p-5 dark:border-malam-800 dark:bg-malam-900">
          <h2 className="text-xl">Kunci Perlu Dicek</h2>
          {kunciPerluDicek.length === 0 ? (
            <p className="mt-2 text-base text-tinta-500 dark:text-[#B8AEA3]">Tidak ada kunci yang perlu dicek.</p>
          ) : (
            <ul className="mt-3 space-y-2">
              {kunciPerluDicek.map((s) => (
                <li key={s.id} className="rounded-2xl bg-krem-100 p-3 dark:bg-malam-800">
                  <p className="text-base">{s.pertanyaan || '(soal bergambar)'}</p>
                  <p className="text-sm text-tinta-500 dark:text-[#B8AEA3]">{s.catatanKunci}</p>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="rounded-3xl border border-krem-200 bg-white p-5 dark:border-malam-800 dark:bg-malam-900">
          <h2 className="text-xl">Reset Semua Data</h2>
          <p className="mt-2 text-base text-tinta-500 dark:text-[#B8AEA3]">Semua profil dan progres akan dihapus dari perangkat ini.</p>
          <div className="mt-3">
            <Button varian="bahaya" onClick={() => { setKonfirmasi(''); setDialogReset(true); }}>Reset Semua Data</Button>
          </div>
        </section>

        <p className="text-center text-base text-tinta-500 dark:text-[#B8AEA3]">{NAMA_APP} versi {VERSI_APP}</p>
      </main>

      <Dialog buka={dialogHapus} judul="Hapus profil ini?" onTutup={() => setDialogHapus(false)}>
        <p className="text-lg">Progres {anak?.nama} akan hilang dan tidak bisa dikembalikan.</p>
        <div className="mt-4">
          <Button varian="bahaya" className="w-full" onClick={hapus}>Hapus Profil</Button>
        </div>
      </Dialog>

      <Dialog buka={dialogReset} judul="Reset Semua Data" onTutup={() => setDialogReset(false)}>
        <p className="text-lg">Ketik HAPUS untuk mengonfirmasi.</p>
        <input
          aria-label="Konfirmasi HAPUS"
          value={konfirmasi}
          onChange={(e) => setKonfirmasi(e.target.value)}
          className="mt-3 h-12 w-full rounded-2xl border border-krem-200 bg-white px-3 text-lg dark:border-malam-700 dark:bg-malam-950 dark:text-[#F5EFE6]"
        />
        <div className="mt-4">
          <Button varian="bahaya" className="w-full" disabled={konfirmasi !== 'HAPUS'} onClick={reset}>
            Reset Sekarang
          </Button>
        </div>
      </Dialog>
    </>
  );
}
