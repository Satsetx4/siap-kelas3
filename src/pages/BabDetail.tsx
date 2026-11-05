import { useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { motion } from 'motion/react';
import { BookOpen, ClipboardCheck, FileText } from 'lucide-react';
import { useCariMapel } from '../content/ContentProvider';
import { useApp } from '../store/useApp';
import AppHeader from '../components/layout/AppHeader';
import Seo from '../components/layout/Seo';
import Breadcrumbs from '../components/layout/Breadcrumbs';
import Button from '../components/ui/Button';
import Segmented from '../components/ui/Segmented';
import NotFound from './NotFound';
import { soalBab, soalDinilai } from '../content/helpers';
import { bintangDariNilai } from '../lib/ringkasan';
import { pilihLatihan } from '../engine/pilihSoal';
import { buatRng } from '../lib/rng';
import { buatSesi } from '../lib/sesi';

type Tab = 'materi' | 'latihan' | 'ujian';

export default function BabDetail() {
  const { mapelId = '', babId = '' } = useParams();
  const navigate = useNavigate();
  const mapel = useCariMapel(mapelId);
  const bab = mapel?.bab.find((b) => b.id === babId);
  const profilAktifId = useApp((s) => s.profilAktifId);
  const progres = useApp((s) => (profilAktifId ? s.progres[profilAktifId] : undefined));
  const setTabBab = useApp((s) => s.setTabBab);
  const mulaiSesi = useApp((s) => s.mulaiSesi);
  const [filter, setFilter] = useState<'semua' | 'guru'>('semua');

  const tab: Tab = progres?.tabBab[babId] ?? 'materi';
  const nilaiTerbaik = progres?.ujianBabTerbaik[babId];

  const jumlah = useMemo(() => {
    if (!bab) return { semua: 0, guru: 0, dinilai: 0 };
    return {
      semua: soalBab(bab, 'semua').length,
      guru: soalBab(bab, 'guru').length,
      dinilai: soalDinilai(soalBab(bab, 'semua')).length,
    };
  }, [bab]);

  if (!mapel || !bab) return <NotFound />;

  const warna = mapel.warna === 'pai' ? 'pai' : mapel.warna === 'ing' ? 'ing' : 'jeruk';

  const mulaiLatihan = () => {
    const kumpulan = soalBab(bab, filter);
    const dipilih = pilihLatihan(kumpulan, progres?.soal ?? {}, buatRng(Date.now()));
    if (dipilih.length === 0) return;
    mulaiSesi(buatSesi({
      jenis: 'latihan',
      mapelId: mapel.id,
      babIds: [bab.id],
      filter,
      soal: dipilih,
    }));
    navigate('/sesi');
  };
  const tanpaSoal = jumlah.dinilai === 0;

  return (
    <>
      <Seo judul={bab.judul} deskripsi={`Bab ${bab.nomor} ${bab.judul} — ${mapel.nama}.`} />
      <AppHeader judul={bab.judul} backTo={`/mapel/${mapel.id}`} />
      <main className="p-4">
        <Breadcrumbs
          item={[
            { label: 'Beranda', ke: '/beranda' },
            { label: mapel.namaPendek, ke: `/mapel/${mapel.id}` },
            { label: `Bab ${bab.nomor}` },
          ]}
        />

        <div className="mb-4 flex gap-1 rounded-2xl bg-krem-100 p-1 dark:bg-malam-800" role="tablist" aria-label="Bagian bab">
          {([
            { id: 'materi', label: 'Materi', Ikon: BookOpen },
            { id: 'latihan', label: 'Latihan', Ikon: FileText },
            { id: 'ujian', label: 'Ujian', Ikon: ClipboardCheck },
          ] as const).map(({ id, label, Ikon }) => (
            <button
              key={id}
              type="button"
              role="tab"
              aria-selected={tab === id}
              onClick={() => setTabBab(babId, id)}
              className={`relative flex flex-1 items-center justify-center gap-2 rounded-xl px-3 py-3 text-base focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-jeruk-500 ${tab === id ? 'text-tinta-900 dark:text-malam-950' : 'text-tinta-500 dark:text-[#B8AEA3]'}`}
            >
              {tab === id && (
                <motion.span layoutId="tabBabAktif" className="absolute inset-0 rounded-xl bg-white shadow dark:bg-jeruk-400" transition={{ type: 'spring', stiffness: 380, damping: 32 }} />
              )}
              <span className="relative flex items-center gap-2">
                <Ikon size={18} aria-hidden="true" /> {label}
              </span>
            </button>
          ))}
        </div>

        {tanpaSoal ? (
          <div className="rounded-3xl border border-krem-200 bg-white p-5 text-center dark:border-malam-800 dark:bg-malam-900">
            <p className="text-lg">Soal untuk bab ini belum tersedia.</p>
            <div className="mt-4">
              <Button onClick={() => history.back()}>Kembali</Button>
            </div>
          </div>
        ) : null}

        {tab === 'materi' && (
          <section aria-label="Daftar materi">
            {bab.subBab.filter((s) => s.materi.length > 0).length === 0 ? (
              <p className="rounded-3xl border border-krem-200 bg-white p-5 text-lg dark:border-malam-800 dark:bg-malam-900">
                Materi untuk bab ini belum tersedia. Kamu bisa langsung berlatih soal.
              </p>
            ) : (
              <ul className="space-y-3">
                {bab.subBab.filter((s) => s.materi.length > 0).map((s) => (
                  <li key={s.id}>
                    <Link
                      to={`/mapel/${mapel.id}/bab/${bab.id}/materi/${s.id}`}
                      className="flex items-center justify-between gap-3 rounded-3xl border border-krem-200 bg-white p-5 dark:border-malam-800 dark:bg-malam-900 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-jeruk-500"
                    >
                      <span className="text-lg">{s.judul}</span>
                      <span className="text-base text-tinta-500 dark:text-[#B8AEA3]">{s.materi.length} kartu</span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </section>
        )}

        {tab === 'latihan' && !tanpaSoal && (
          <section aria-label="Latihan" className="space-y-4">
            <Segmented
              label="Pilih jenis soal"
              opsi={[{ id: 'semua', label: 'Semua soal' }, { id: 'guru', label: 'Soal Guru saja' }]}
              aktif={filter}
              onPilih={(id) => setFilter(id === 'guru' ? 'guru' : 'semua')}
            />
            <p className="text-lg text-tinta-500 dark:text-[#B8AEA3]">
              Tersedia {filter === 'guru' ? jumlah.guru : jumlah.semua} soal.
            </p>
            <Button ukuran="lg" className="w-full" onClick={mulaiLatihan}>
              Mulai Latihan (10 soal)
            </Button>
          </section>
        )}

        {tab === 'ujian' && !tanpaSoal && (
          <section aria-label="Ujian" className="space-y-4">
            <p className="text-lg text-tinta-500 dark:text-[#B8AEA3]">20 soal · 30 menit</p>
            <p className="text-lg">
              Nilai terbaik: {nilaiTerbaik !== undefined ? `${nilaiTerbaik} (${bintangDariNilai(nilaiTerbaik)} bintang)` : 'belum ada'}
            </p>
            <Button ukuran="lg" className={`w-full ${warna === 'pai' ? 'bg-pai-500 text-white' : ''}`} disabled>
              Mulai Ujian Bab
            </Button>
          </section>
        )}
      </main>
    </>
  );
}
