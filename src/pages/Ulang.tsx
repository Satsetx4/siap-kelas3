import { useNavigate } from 'react-router-dom';
import { PartyPopper } from 'lucide-react';
import { useMapel } from '../content/ContentProvider';
import { useApp } from '../store/useApp';
import AppHeader from '../components/layout/AppHeader';
import Seo from '../components/layout/Seo';
import Button from '../components/ui/Button';
import { pilihUlang } from '../engine/pilihSoal';
import { buatRng } from '../lib/rng';
import { buatSesi } from '../lib/sesi';
import { TIPE_DINILAI } from '../content/types';

export default function Ulang() {
  const mapelSemua = useMapel();
  const navigate = useNavigate();
  const profilAktifId = useApp((s) => s.profilAktifId);
  const progres = useApp((s) => (profilAktifId ? s.progres[profilAktifId] : undefined));
  const mulaiSesi = useApp((s) => s.mulaiSesi);

  const bank = progres?.soal ?? {};
  const perMapel = mapelSemua.map((m) => {
    const soalMapel = m.bab.flatMap((b) => b.subBab.flatMap((s) => s.soal));
    const salah = soalMapel.filter((s) => bank[s.id]?.diBankSalah);
    return { mapel: m, salah };
  });
  const totalSalah = perMapel.reduce((n, x) => n + x.salah.length, 0);

  const ulangi = (mapelId: string) => {
    const baris = perMapel.find((x) => x.mapel.id === mapelId);
    if (!baris) return;
    const dipilih = pilihUlang(baris.salah, bank, buatRng(Date.now()));
    if (dipilih.length === 0) return;
    mulaiSesi(buatSesi({
      jenis: 'ulang',
      mapelId,
      babIds: [...new Set(dipilih.map((s) => s.id.slice(0, s.id.indexOf('-s'))))],
      filter: 'semua',
      soal: dipilih.filter((s) => TIPE_DINILAI.includes(s.tipe)),
    }));
    navigate('/sesi');
  };

  return (
    <>
      <Seo judul="Ulang Soal Salah" deskripsi="Kerjakan lagi soal yang pernah salah." />
      <AppHeader judul="Ulang Soal Salah" backTo="/beranda" />
      <main className="space-y-3 p-4">
        {totalSalah === 0 ? (
          <div className="flex flex-col items-center gap-3 rounded-3xl border border-krem-200 bg-white p-6 text-center dark:border-malam-800 dark:bg-malam-900">
            <PartyPopper size={48} className="text-jeruk-500" aria-hidden="true" />
            <p className="text-lg">Hebat! Tidak ada soal yang perlu diulang.</p>
            <Button onClick={() => navigate('/mapel')}>Ke Mapel</Button>
          </div>
        ) : (
          perMapel.filter((x) => x.salah.length > 0).map(({ mapel, salah }) => (
            <section key={mapel.id} className="rounded-3xl border border-krem-200 bg-white p-5 dark:border-malam-800 dark:bg-malam-900">
              <p className="text-xl">{mapel.namaPendek}</p>
              <p className="mt-1 text-lg text-tinta-500 dark:text-[#B8AEA3]">{salah.length} soal perlu diulang</p>
              <div className="mt-3">
                <Button className="w-full" onClick={() => ulangi(mapel.id)}>
                  Ulangi (maks 10 soal)
                </Button>
              </div>
            </section>
          ))
        )}
        <p className="text-base text-tinta-500 dark:text-[#B8AEA3]">
          Soal keluar dari daftar ini setelah kamu menjawabnya benar dua kali berturut-turut.
        </p>
      </main>
    </>
  );
}
