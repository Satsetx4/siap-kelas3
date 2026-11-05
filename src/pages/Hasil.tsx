import { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { Check, X } from 'lucide-react';
import { useApp } from '../store/useApp';
import { cariSoal } from '../content/helpers';
import AppHeader from '../components/layout/AppHeader';
import Seo from '../components/layout/Seo';
import Button from '../components/ui/Button';
import Stars from '../components/ui/Stars';
import Badge from '../components/ui/Badge';
import Pembahasan from '../components/soal/Pembahasan';
import { jawabanBenar, periksa } from '../engine/periksa';
import { hitungNilai, bintang } from '../engine/nilai';
import { TIPE_DINILAI } from '../content/types';
import { buatSesi } from '../lib/sesi';

function AngkaNaik({ nilai }: { nilai: number }) {
  const [tampil, setTampil] = useState(0);
  useEffect(() => {
    const mulai = performance.now();
    let frame = 0;
    const langkah = (t: number) => {
      const p = Math.min(1, (t - mulai) / 800);
      setTampil(Math.round(nilai * p));
      if (p < 1) frame = requestAnimationFrame(langkah);
    };
    frame = requestAnimationFrame(langkah);
    return () => cancelAnimationFrame(frame);
  }, [nilai]);
  return <span>{tampil}</span>;
}

export default function Hasil() {
  const navigate = useNavigate();
  const profilAktifId = useApp((s) => s.profilAktifId);
  const progres = useApp((s) => (profilAktifId ? s.progres[profilAktifId] : undefined));
  const mulaiSesi = useApp((s) => s.mulaiSesi);
  const [lihatPembahasan, setLihatPembahasan] = useState(false);

  const sesi = progres?.sesiTerakhir ?? null;
  if (!sesi) return <Navigate to="/beranda" replace />;

  const soalSesi = sesi.soalIds.map((id) => cariSoal(id)).filter((s): s is NonNullable<typeof s> => Boolean(s));
  const dinilai = soalSesi.filter((s) => TIPE_DINILAI.includes(s.tipe));
  const benar = soalSesi.filter((s) => {
    const j = sesi.jawaban[s.id];
    return j ? periksa(s, j) === true : false;
  }).length;
  const salah = dinilai.length - soalSesi.filter((s) => {
    const j = sesi.jawaban[s.id];
    return j && periksa(s, j) === true && TIPE_DINILAI.includes(s.tipe);
  }).length;
  const nilai = hitungNilai(benar, dinilai.length);
  const jumlahBintang = bintang(nilai);

  const ulangiSalah = () => {
    const salahIds = soalSesi.filter((s) => {
      const j = sesi.jawaban[s.id];
      return TIPE_DINILAI.includes(s.tipe) && (!j || periksa(s, j) !== true);
    });
    if (salahIds.length === 0) return;
    const baru = buatSesi({
      jenis: 'ulang',
      mapelId: sesi.mapelId,
      babIds: sesi.babIds,
      filter: 'semua',
      soal: salahIds,
    });
    mulaiSesi(baru);
    navigate('/sesi', { replace: true });
  };

  return (
    <>
      <Seo judul="Hasil" />
      <AppHeader judul="Hasil" backTo="/beranda" />
      <main className="space-y-4 p-4">
        <section className="rounded-3xl border border-krem-200 bg-white p-6 text-center dark:border-malam-800 dark:bg-malam-900">
          <p className="text-base text-tinta-500 dark:text-[#B8AEA3]">Nilaimu</p>
          <p className="font-display text-[64px] leading-none text-tinta-900 dark:text-[#F5EFE6]">
            <AngkaNaik nilai={nilai} />
          </p>
          <div className="mt-2 flex justify-center">
            <Stars jumlah={jumlahBintang} label={`${jumlahBintang} dari 3 bintang`} />
          </div>
          <p className="mt-3 text-lg">
            Benar {benar} dari {dinilai.length} soal
          </p>
          {salah > 0 ? <p className="text-base text-tinta-500 dark:text-[#B8AEA3]">Salah {salah} soal</p> : null}
          {dinilai.length === 0 ? <p className="text-base text-tinta-500 dark:text-[#B8AEA3]">Sesi ini hanya berisi soal uraian.</p> : null}
        </section>

        <div className="space-y-3">
          <Button className="w-full" ukuran="lg" onClick={() => setLihatPembahasan((v) => !v)}>
            {lihatPembahasan ? 'Sembunyikan Pembahasan' : 'Lihat Pembahasan'}
          </Button>
          <Button varian="sekunder" className="w-full" onClick={ulangiSalah} disabled={salah === 0}>
            Ulangi yang Salah
          </Button>
          <Button varian="sekunder" className="w-full" onClick={() => navigate(`/mapel/${sesi.mapelId}/bab/${sesi.babIds[0] ?? ''}`)}>
            Kembali ke Bab
          </Button>
          <Button varian="hantu" className="w-full" onClick={() => navigate('/beranda')}>
            Ke Beranda
          </Button>
        </div>

        {lihatPembahasan ? (
          <section className="space-y-3" aria-label="Daftar pembahasan">
            {soalSesi.map((s, i) => {
              const j = sesi.jawaban[s.id];
              const hasilSoal = j ? periksa(s, j) : null;
              return (
                <article key={s.id} className="rounded-3xl border border-krem-200 bg-white p-4 dark:border-malam-800 dark:bg-malam-900">
                  <div className="mb-2 flex items-center justify-between gap-2">
                    <p className="text-base text-tinta-500 dark:text-[#B8AEA3]">Soal {i + 1}</p>
                    {hasilSoal === true ? <Badge warna="benar">Benar</Badge> : null}
                    {hasilSoal === false ? <Badge warna="salah">Salah</Badge> : null}
                    {hasilSoal === null ? <Badge>Uraian</Badge> : null}
                  </div>
                  <p className="text-lg">{s.pertanyaan}</p>
                  <p className="mt-2 flex items-center gap-2 text-lg">
                    {hasilSoal === true ? <Check size={18} className="text-benar-500" aria-hidden="true" /> : <X size={18} className="text-salah-500" aria-hidden="true" />}
                    Jawabanmu: {jawabanAnak(s, j)}
                  </p>
                  <p className="text-base text-tinta-500 dark:text-[#B8AEA3]">Kunci: {jawabanBenar(s)}</p>
                  <div className="mt-3">
                    <Pembahasan soal={s} />
                  </div>
                </article>
              );
            })}
          </section>
        ) : null}
      </main>
    </>
  );
}

function jawabanAnak(s: ReturnType<typeof cariSoal>, j: { tipe: string } & Record<string, unknown>): string {
  if (!s || !j) return 'tidak dijawab';
  switch (j.tipe) {
    case 'pg': return s.tipe === 'pg' ? (s.pilihan[Number(j.pilih)] ?? '') : '';
    case 'bs': return j.nilai ? 'Benar' : 'Salah';
    case 'isian': return String(j.teks ?? '');
    case 'jodohkan': {
      if (s.tipe !== 'jodohkan') return '';
      const p = j.pasangan as Record<number, number>;
      return s.pasangan.map((pas, i) => `${pas.kiri} → ${s.pasangan[p[i]]?.kanan ?? '-'}`).join(', ');
    }
    case 'urutkan': {
      if (s.tipe !== 'urutkan') return '';
      return (j.urutan as number[]).map((i) => s.urutanBenar[i]).join(' → ');
    }
    default: return 'dijawab di buku';
  }
}
