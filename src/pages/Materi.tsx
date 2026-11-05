import { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useCariMapel } from '../content/ContentProvider';
import { useApp } from '../store/useApp';
import AppHeader from '../components/layout/AppHeader';
import Seo from '../components/layout/Seo';
import Breadcrumbs from '../components/layout/Breadcrumbs';
import KartuMateri from '../components/materi/KartuMateri';
import Button from '../components/ui/Button';
import IconButton from '../components/ui/IconButton';
import NotFound from './NotFound';
import { pilihLatihan } from '../engine/pilihSoal';
import { buatRng } from '../lib/rng';
import { buatSesi } from '../lib/sesi';

export default function Materi() {
  const { mapelId = '', babId = '', subBabId = '' } = useParams();
  const navigate = useNavigate();
  const mapel = useCariMapel(mapelId);
  const bab = mapel?.bab.find((b) => b.id === babId);
  const sub = bab?.subBab.find((s) => s.id === subBabId);

  const profilAktifId = useApp((s) => s.profilAktifId);
  const posisiTersimpan = useApp((s) => (profilAktifId ? s.progres[profilAktifId]?.posisiMateri[subBabId] : undefined));
  const setPosisiMateri = useApp((s) => s.setPosisiMateri);
  const mulaiSesi = useApp((s) => s.mulaiSesi);
  const soalStat = useApp((s) => (profilAktifId ? s.progres[profilAktifId]?.soal : undefined));
  const [indeks, setIndeks] = useState(0);

  const kartu = useMemo(() => sub?.materi ?? [], [sub]);
  const awal = Math.min(posisiTersimpan ?? 0, Math.max(0, kartu.length - 1));
  const posisi = Math.min(Math.max(indeks || awal, 0), Math.max(0, kartu.length - 1));

  if (!mapel || !bab || !sub) return <NotFound />;

  if (kartu.length === 0) {
    return (
      <>
        <Seo judul={sub.judul} />
        <AppHeader judul={sub.judul} backTo={`/mapel/${mapel.id}/bab/${bab.id}`} />
        <main className="p-4">
          <p className="rounded-3xl border border-krem-200 bg-white p-5 text-lg dark:border-malam-800 dark:bg-malam-900">
            Materi untuk bagian ini belum tersedia.
          </p>
        </main>
      </>
    );
  }

  const pindah = (ke: number) => {
    const baru = Math.min(Math.max(ke, 0), kartu.length - 1);
    setIndeks(baru);
    setPosisiMateri(sub.id, baru);
  };

  const terakhir = posisi === kartu.length - 1;

  return (
    <>
      <Seo judul={sub.judul} deskripsi={`Materi ${sub.judul} — ${mapel.nama}.`} />
      <AppHeader judul={sub.judul} backTo={`/mapel/${mapel.id}/bab/${bab.id}`} />
      <main className="p-4">
        <Breadcrumbs
          item={[
            { label: 'Beranda', ke: '/beranda' },
            { label: mapel.namaPendek, ke: `/mapel/${mapel.id}` },
            { label: `Bab ${bab.nomor}`, ke: `/mapel/${mapel.id}/bab/${bab.id}` },
            { label: `Kartu ${posisi + 1}` },
          ]}
        />

        <motion.div
          key={kartu[posisi].id}
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        >
          <KartuMateri kartu={kartu[posisi]} />
        </motion.div>

        <div className="mt-4 flex items-center justify-between gap-3">
          <IconButton aria-label="Kartu sebelumnya" onClick={() => pindah(posisi - 1)} disabled={posisi === 0}>
            <ChevronLeft size={24} aria-hidden="true" />
          </IconButton>

          <ol className="flex gap-2" aria-label={`Kartu ${posisi + 1} dari ${kartu.length}`}>
            {kartu.map((k, i) => (
              <li key={k.id}>
                <span className={`block h-2.5 w-2.5 rounded-full ${i === posisi ? 'bg-jeruk-500' : 'bg-krem-200 dark:bg-malam-700'}`} />
              </li>
            ))}
          </ol>

          <IconButton aria-label="Kartu berikutnya" onClick={() => pindah(posisi + 1)} disabled={terakhir}>
            <ChevronRight size={24} aria-hidden="true" />
          </IconButton>
        </div>

        {terakhir ? (
          <div className="mt-5 space-y-3">
            <Button
              ukuran="lg"
              className="w-full"
              disabled={sub.soal.length === 0}
              onClick={() => {
                const dipilih = pilihLatihan(sub.soal, soalStat ?? {}, buatRng(Date.now()));
                if (dipilih.length === 0) return;
                mulaiSesi(buatSesi({
                  jenis: 'latihan',
                  mapelId: mapel.id,
                  babIds: [bab.id],
                  filter: 'semua',
                  soal: dipilih,
                }));
                navigate('/sesi');
              }}
            >
              Latihan Sub-bab Ini
            </Button>
            <Button varian="sekunder" className="w-full" onClick={() => navigate(`/mapel/${mapel.id}/bab/${bab.id}`)}>
              Kembali ke Bab
            </Button>
          </div>
        ) : null}
      </main>
    </>
  );
}
