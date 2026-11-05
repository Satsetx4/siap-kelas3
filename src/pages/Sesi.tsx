import { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import { Lightbulb, X } from 'lucide-react';
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

export default function Sesi() {
  const navigate = useNavigate();
  const profilAktifId = useApp((s) => s.profilAktifId);
  const progres = useApp((s) => (profilAktifId ? s.progres[profilAktifId] : undefined));
  const jawab = useApp((s) => s.jawab);
  const cekJawaban = useApp((s) => s.cekJawaban);
  const pindahSoal = useApp((s) => s.pindahSoal);
  const selesaikanSesi = useApp((s) => s.selesaikanSesi);

  const sesi = progres?.sesiAktif ?? null;
  const [dialogKeluar, setDialogKeluar] = useState(false);
  const [dialogPetunjuk, setDialogPetunjuk] = useState(false);
  const [keHasil, setKeHasil] = useState(false);

  useEffect(() => () => diam(), []);

  if (!sesi) return <Navigate to={keHasil ? '/hasil' : '/beranda'} replace />;

  const soal = cariSoal(sesi.soalIds[sesi.indeks]);
  if (!soal) return <Navigate to="/beranda" replace />;

  const mapel = cariMapel(sesi.mapelId);
  const jawaban = sesi.jawaban[soal.id];
  const sudahDicek = sesi.sudahDicek.includes(soal.id);
  const hasil = sudahDicek && jawaban ? periksa(soal, jawaban) : null;
  const lengkap = jawabanLengkap(soal, jawaban);
  const terakhir = sesi.indeks === sesi.soalIds.length - 1;
  const total = sesi.soalIds.length;

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
        <div className="mx-auto flex max-w-[480px] gap-3 pb-[env(safe-area-inset-bottom)]">
          {!sudahDicek ? (
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
    </>
  );
}
