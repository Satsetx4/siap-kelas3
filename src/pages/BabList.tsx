import { Link, useNavigate, useParams } from 'react-router-dom';
import { motion } from 'motion/react';
import { useCariMapel } from '../content/ContentProvider';
import { useApp } from '../store/useApp';
import AppHeader from '../components/layout/AppHeader';
import Seo from '../components/layout/Seo';
import Breadcrumbs from '../components/layout/Breadcrumbs';
import Stars from '../components/ui/Stars';
import ProgressBar from '../components/ui/ProgressBar';
import Button from '../components/ui/Button';
import NotFound from './NotFound';
import { tekan } from '../lib/motion';
import { penguasaanBab } from '../lib/ringkasan';

export default function BabList() {
  const { mapelId = '' } = useParams();
  const navigate = useNavigate();
  const mapel = useCariMapel(mapelId);
  const profilAktifId = useApp((s) => s.profilAktifId);
  const progres = useApp((s) => (profilAktifId ? s.progres[profilAktifId] : undefined));

  if (!mapel) return <NotFound />;

  return (
    <>
      <Seo judul={mapel.nama} deskripsi={`Daftar bab ${mapel.nama} kelas 3 SD.`} />
      <AppHeader judul={mapel.namaPendek} backTo="/mapel" />
      <main className="p-4">
        <Breadcrumbs item={[{ label: 'Beranda', ke: '/beranda' }, { label: mapel.namaPendek }]} />

        {mapel.bab.length === 0 ? (
          <div className="rounded-3xl border border-krem-200 bg-white p-5 text-center dark:border-malam-800 dark:bg-malam-900">
            <p className="text-lg text-tinta-900 dark:text-[#F5EFE6]">Materi sedang disiapkan.</p>
            <div className="mt-4">
              <Button onClick={() => navigate('/mapel')}>Kembali ke Mapel</Button>
            </div>
          </div>
        ) : (
          <ul className="space-y-3">
            {mapel.bab.map((b) => {
              const bintang = progres?.ujianBabTerbaik[b.id] !== undefined
                ? (progres.ujianBabTerbaik[b.id] >= 90 ? 3 : progres.ujianBabTerbaik[b.id] >= 75 ? 2 : progres.ujianBabTerbaik[b.id] >= 60 ? 1 : 0)
                : 0;
              const persen = progres ? penguasaanBab(b, progres.soal) : 0;
              return (
                <li key={b.id}>
                  <motion.div {...tekan}>
                    <Link
                      to={`/mapel/${mapel.id}/bab/${b.id}`}
                      className="block rounded-3xl border border-krem-200 bg-white p-5 shadow-[0_2px_12px_rgba(30,27,24,0.06)] dark:border-malam-800 dark:bg-malam-900 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-jeruk-500"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <p className="text-base text-tinta-500 dark:text-[#B8AEA3]">Bab {b.nomor}</p>
                          <p className="text-xl">{b.judul}</p>
                        </div>
                        <Stars jumlah={bintang} label={`${bintang} dari 3 bintang`} />
                      </div>
                      <div className="mt-3 flex items-center gap-3">
                        <div className="flex-1">
                          <ProgressBar persen={persen} label={`Penguasaan ${b.judul}`} warna={mapel.warna === 'pai' ? 'bg-pai-500' : mapel.warna === 'ing' ? 'bg-ing-500' : 'bg-jeruk-500'} />
                        </div>
                        <span className="text-base text-tinta-500 dark:text-[#B8AEA3]">{Math.round(persen)}%</span>
                      </div>
                    </Link>
                  </motion.div>
                </li>
              );
            })}
          </ul>
        )}
      </main>
    </>
  );
}
