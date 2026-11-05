import { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import { Flag, Grid3x3, Lightbulb, X } from 'lucide-react';
import { useApp } from '../store/useApp';
import { cariMapel, cariSoal } from '../content/helpers';
import Seo from '../components/layout/Seo';
import SoalView from '../components/soal/SoalView';
import Pembahasan from '../components/soal/Pembahasan';
import Button from '../components/ui/Button';
import IconButton from '../components/ui/IconButton';
import Dialog from '../components/ui/Dialog';
import ProgressBar from '../components/ui/ProgressBar';
import { jawabanLengkap, jawabanBenar, periksa } from '../engine/periksa';
import { JUDUL_SESI } from '../lib/sesi';
import { goyang, pop } from '../lib/motion';
import { diam } from '../lib/tts';

function formatWaktu(detik: number): string {
  const m = Math.floor(detik / 60);
  const d = detik % 60;
  return `${String(m).padStart(2, '0')}:${String(d).padStart(2, '0')}`;
}

export default function Sesi() {
  const navigate = useNavigate();
  const profilAktifId = useApp((s) => s.profilAktifId);
  const progres = useApp((s) => (profilAktifId ? s.progres[profilAktifId] : undefined));
  const jawab = useApp((s) => s.jawab);
  const cekJawaban = useApp((s) => s.cekJawaban);
  const pindahSoal = useApp((s) => s.pindahSoal);
  const tandaiRagu = useApp((s) => s.tandaiRagu);
  const selesaikanSesi = useApp((s) => s.selesaikanSesi);

  const sesi = progres?.sesiAktif ?? null;
  const [dialogKeluar, setDialogKeluar] = useState(false);
  const [dialogPetunjuk, setDialogPetunjuk] = useState(false);
  const [dialogGrid, setDialogGrid] = useState(false);
  const [dialogKumpul, setDialogKumpul] = useState(false);
  const [keHasil, setKeHasil] = useState(false);
  const [sisa, setSisa] = useState<number | null>(null);

  const batasWaktu = sesi?.batasWaktu ?? null;
  const idSesi = sesi?.id ?? '';

  useEffect(() => () => diam(), []);

  useEffect(() => {
    if (!batasWaktu) {
      setSisa(null);
      return;
    }
    const tik = () => {
      const s = Math.max(0, Math.ceil((batasWaktu - Date.now()) / 1000));
      setSisa(s);
      if (s <= 0) {
        setKeHasil(true);
        selesaikanSesi();
      }
    };
    tik();
    const id = window.setInterval(tik, 1000);
    return () => window.clearInterval(id);
  }, [batasWaktu, idSesi, selesaikanSesi]);

  if (!sesi) return <Navigate to={keHasil ? '/hasil' : '/beranda'} replace />;

  const soal = cariSoal(sesi.soalIds[sesi.indeks]);
  if (!soal) return <Navigate to="/beranda" replace />;

  const ujian = sesi.jenis === 'ujian-bab' || sesi.jenis === 'ujian-gabungan';
  const mapel = cariMapel(sesi.mapelId);
  const jawaban = sesi.jawaban[soal.id];
  const sudahDicek = !ujian && sesi.sudahDicek.includes(soal.id);
  const hasil = sudahDicek && jawaban ? periksa(soal, jawaban) : null;
  const lengkap = jawabanLengkap(soal, jawaban);
  const terakhir = sesi.indeks === sesi.soalIds.length - 1;
  const total = sesi.soalIds.length;
  const ragu = sesi.ragu.includes(soal.id);
  const jumlahKosong = sesi.soalIds.filter((id) => !sesi.jawaban[id]).length;
  const waktuKritis = sisa !== null && sisa <= 300;

  const periksaSekarang = () => {
    if (!lengkap) return;
    cekJawaban(soal.id);
  };

  const lanjut = () => {
    if (terakhir) {
      setKeHasil(true);
      selesaikanSesi();
      return;
    }
    pindahSoal(sesi.indeks + 1);
  };

  const keluar = () => {
    setDialogKeluar(false);
    navigate(`/mapel/${sesi.mapelId}`, { replace: true });
  };

  const kumpulkan = () => {
    setDialogKumpul(false);
    setKeHasil(true);
    selesaikanSesi();
  };

  return (
    <>
      <Seo judul={JUDUL_SESI[sesi.jenis]} />
      <header className="sticky top-0 z-30 border-b border-krem-200 bg-krem-50/90 backdrop-blur dark:border-malam-800 dark:bg-malam-950/90">
        <div className="mx-auto flex h-16 max-w-[480px] items-center gap-3 px-3">
          <IconButton aria-label="Tutup sesi" onClick={() => setDialogKeluar(true)}>
            <X size={24} aria-hidden="true" />
          </IconButton>
          <div className="min-w-0 flex-1">
            <p className="truncate text-lg">{JUDUL_SESI[sesi.jenis]}</p>
            <p className="text-base text-tinta-500 dark:text-[#B8AEA3]">Soal {sesi.indeks + 1} dari {total}</p>
          </div>
          {sisa !== null ? (
            <motion.span
              animate={waktuKritis ? { opacity: [1, 0.55, 1] } : { opacity: 1 }}
              transition={waktuKritis ? { duration: 1.2, repeat: Infinity } : undefined}
              className={`rounded-xl px-3 py-2 font-display text-lg tabular-nums ${waktuKritis ? 'bg-salah-100 text-salah-500' : 'bg-krem-100 text-tinta-900 dark:bg-malam-800 dark:text-[#F5EFE6]'}`}
              aria-label={`Sisa waktu ${formatWaktu(sisa)}`}
            >
              {formatWaktu(sisa)}
            </motion.span>
          ) : null}
        </div>
        <div className="mx-auto max-w-[480px] px-3 pb-2">
          <ProgressBar persen={((sesi.indeks + 1) / total) * 100} label="Progres sesi" />
        </div>
      </header>

      <main className="mx-auto max-w-[480px] px-4 pb-40 pt-4">
        <motion.div key={soal.id} animate={sudahDicek && hasil === false ? goyang : undefined}>
          <div className="rounded-3xl border border-krem-200 bg-white p-5 dark:border-malam-800 dark:bg-malam-900">
            <SoalView
              soal={soal}
              acak={sesi.acak[soal.id] ?? []}
              jawaban={jawaban}
              sudahDicek={sudahDicek}
              onJawab={(j) => jawab(soal.id, j)}
              lang={mapel?.id === 'inggris' ? 'en-US' : 'id-ID'}
              onEnter={periksaSekarang}
            />
          </div>

          <AnimatePresence>
            {sudahDicek ? (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 space-y-3"
              >
                {hasil === true ? (
                  <motion.p animate={pop} className="rounded-2xl bg-benar-100 p-4 text-lg font-bold text-benar-500">
                    Benar! Hebat!
                  </motion.p>
                ) : null}
                {hasil === false ? (
                  <div className="rounded-2xl bg-salah-100 p-4">
                    <p className="text-lg font-bold text-salah-500">Belum tepat</p>
                    <p className="mt-1 text-lg text-tinta-900">Jawaban benar: {jawabanBenar(soal)}</p>
                  </div>
                ) : null}
                <Pembahasan soal={soal} />
              </motion.div>
            ) : null}
          </AnimatePresence>
        </motion.div>
      </main>

      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-krem-200 bg-krem-50/95 p-3 backdrop-blur dark:border-malam-800 dark:bg-malam-950/95">
        <div className="mx-auto flex max-w-[480px] items-center gap-2 pb-[env(safe-area-inset-bottom)]">
          {ujian ? (
            <>
              <Button varian="sekunder" onClick={() => pindahSoal(Math.max(0, sesi.indeks - 1))} disabled={sesi.indeks === 0}>
                Sebelumnya
              </Button>
              <Button
                varian="sekunder"
                onClick={() => tandaiRagu(soal.id)}
                ikonKiri={<Flag size={18} aria-hidden="true" />}
                className={ragu ? 'bg-ragu-500 text-tinta-900' : ''}
              >
                Ragu
              </Button>
              <IconButton aria-label="Nomor soal" onClick={() => setDialogGrid(true)}>
                <Grid3x3 size={22} aria-hidden="true" />
              </IconButton>
              {terakhir ? (
                <Button className="flex-1" onClick={() => setDialogKumpul(true)}>Selesai</Button>
              ) : (
                <Button className="flex-1" onClick={() => pindahSoal(Math.min(total - 1, sesi.indeks + 1))}>Berikutnya</Button>
              )}
            </>
          ) : !sudahDicek ? (
            <>
              {soal.petunjuk ? (
                <Button varian="sekunder" onClick={() => setDialogPetunjuk(true)} ikonKiri={<Lightbulb size={20} aria-hidden="true" />}>
                  Petunjuk
                </Button>
              ) : null}
              <Button className="flex-1" ukuran="lg" disabled={!lengkap} onClick={periksaSekarang}>
                Periksa
              </Button>
            </>
          ) : (
            <Button className="flex-1" ukuran="lg" onClick={lanjut}>
              {terakhir ? 'Lihat Hasil' : 'Lanjut'}
            </Button>
          )}
        </div>
      </div>

      <Dialog buka={dialogKeluar} judul="Simpan dan keluar?" onTutup={() => setDialogKeluar(false)} teksBatal="Lanjut Mengerjakan">
        <p className="text-lg">Progresmu sudah tersimpan otomatis. Nanti bisa dilanjutkan.</p>
        <div className="mt-4">
          <Button varian="bahaya" className="w-full" onClick={keluar}>
            Simpan & Keluar
          </Button>
        </div>
      </Dialog>

      <Dialog buka={dialogPetunjuk} judul="Petunjuk" onTutup={() => setDialogPetunjuk(false)}>
        <p className="text-lg">{soal.petunjuk}</p>
      </Dialog>

      <Dialog buka={dialogGrid} judul="Nomor Soal" onTutup={() => setDialogGrid(false)}>
        <ul className="grid grid-cols-5 gap-2">
          {sesi.soalIds.map((id, i) => {
            const dijawab = Boolean(sesi.jawaban[id]);
            const ditandai = sesi.ragu.includes(id);
            const warna = ditandai
              ? 'bg-ragu-500 text-tinta-900'
              : dijawab
                ? 'bg-benar-500 text-white'
                : 'bg-krem-100 text-tinta-700 dark:bg-malam-800 dark:text-[#B8AEA3]';
            return (
              <li key={id}>
                <button
                  type="button"
                  aria-label={`Soal ${i + 1} ${dijawab ? 'dijawab' : 'kosong'}${ditandai ? ' ragu-ragu' : ''}`}
                  onClick={() => { pindahSoal(i); setDialogGrid(false); }}
                  className={`h-12 w-full rounded-xl text-lg font-bold focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-jeruk-500 ${warna}`}
                >
                  {i + 1}
                </button>
              </li>
            );
          })}
        </ul>
        <p className="mt-3 text-base text-tinta-500 dark:text-[#B8AEA3]">Hijau sudah dijawab, kuning ragu-ragu, abu belum dijawab.</p>
      </Dialog>

      <Dialog buka={dialogKumpul} judul="Kumpulkan sekarang?" onTutup={() => setDialogKumpul(false)}>
        <p className="text-lg">
          Masih ada {jumlahKosong} soal kosong dan {sesi.ragu.length} ragu-ragu. Kumpulkan sekarang?
        </p>
        <div className="mt-4">
          <Button className="w-full" onClick={kumpulkan}>Kumpulkan</Button>
        </div>
      </Dialog>
    </>
  );
}
