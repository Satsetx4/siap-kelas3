import { useMapel } from '../content/ContentProvider';
import { useApp } from '../store/useApp';
import AppHeader from '../components/layout/AppHeader';
import Seo from '../components/layout/Seo';
import ProgressRing from '../components/ui/ProgressRing';
import ProgressBar from '../components/ui/ProgressBar';
import Stars from '../components/ui/Stars';
import { DAFTAR_LENCANA, TARGET_HARIAN, hariBeruntun } from '../engine/lencana';
import { bintangDariNilai, penguasaanBab } from '../lib/ringkasan';
import { geserHari, kunciHari, formatTanggal } from '../lib/tanggal';

export default function Prestasi() {
  const mapelSemua = useMapel();
  const profilAktifId = useApp((s) => s.profilAktifId);
  const progres = useApp((s) => (profilAktifId ? s.progres[profilAktifId] : undefined));

  const harian = progres?.harian ?? {};
  const hariIni = kunciHari();
  const hariIniJumlah = harian[hariIni] ?? 0;
  const streak = hariBeruntun(harian, hariIni);

  const empatBelasHari = Array.from({ length: 14 }, (_, i) => {
    const tanggal = geserHari(new Date(), i - 13);
    const kunci = kunciHari(tanggal);
    return { kunci, jumlah: harian[kunci] ?? 0 };
  });

  const warnaKotak = (jumlah: number) => {
    if (jumlah === 0) return 'bg-krem-100 dark:bg-malam-800';
    if (jumlah < 5) return 'bg-jeruk-400';
    if (jumlah < TARGET_HARIAN) return 'bg-jeruk-500';
    return 'bg-pai-500';
  };

  return (
    <>
      <Seo judul="Prestasi" deskripsi="Bintang, lencana, dan target harianmu." />
      <AppHeader judul="Prestasi" backTo="/beranda" />
      <main className="space-y-4 p-4">
        <section className="flex items-center gap-4 rounded-3xl border border-krem-200 bg-white p-5 dark:border-malam-800 dark:bg-malam-900">
          <ProgressRing persen={(hariIniJumlah / TARGET_HARIAN) * 100} label="Target hari ini" />
          <div>
            <p className="text-xl">Target Hari Ini</p>
            <p className="text-lg text-tinta-500 dark:text-[#B8AEA3]">{hariIniJumlah} dari {TARGET_HARIAN} soal</p>
            <p className="mt-1 text-base text-tinta-500 dark:text-[#B8AEA3]">Hari beruntun: {streak}</p>
          </div>
        </section>

        <section className="rounded-3xl border border-krem-200 bg-white p-5 dark:border-malam-800 dark:bg-malam-900">
          <h2 className="text-xl">14 Hari Terakhir</h2>
          <ul className="mt-3 flex flex-wrap gap-2" aria-label="Kalender 14 hari">
            {empatBelasHari.map((h) => (
              <li key={h.kunci} className="text-center">
                <span
                  aria-label={`${formatTanggal(h.kunci)}: ${h.jumlah} soal`}
                  className={`block h-7 w-7 rounded-lg ${warnaKotak(h.jumlah)}`}
                />
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-3xl border border-krem-200 bg-white p-5 dark:border-malam-800 dark:bg-malam-900">
          <h2 className="text-xl">Lencana</h2>
          <ul className="mt-3 space-y-2">
            {DAFTAR_LENCANA.map((l) => {
              const dapat = progres?.lencana[l.id] !== undefined;
              return (
                <li key={l.id} className={`flex items-center gap-3 rounded-2xl p-3 ${dapat ? 'bg-krem-100 dark:bg-malam-800' : 'opacity-60'}`}>
                  <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${dapat ? 'bg-jeruk-500 text-tinta-900' : 'bg-krem-200 text-tinta-500 dark:bg-malam-700'}`}>
                    <l.Ikon size={22} aria-hidden="true" />
                  </span>
                  <span>
                    <span className="block text-lg">{l.nama}</span>
                    <span className="block text-base text-tinta-500 dark:text-[#B8AEA3]">{dapat ? 'Sudah didapat' : l.syarat}</span>
                  </span>
                </li>
              );
            })}
          </ul>
        </section>

        <section className="rounded-3xl border border-krem-200 bg-white p-5 dark:border-malam-800 dark:bg-malam-900">
          <h2 className="text-xl">Bintang per Mapel</h2>
          <ul className="mt-3 space-y-4">
            {mapelSemua.map((m) => {
              const babs = m.bab;
              if (babs.length === 0) {
                return (
                  <li key={m.id}>
                    <p className="text-lg">{m.namaPendek}</p>
                    <p className="text-base text-tinta-500 dark:text-[#B8AEA3]">Belum ada bab.</p>
                  </li>
                );
              }
              return (
                <li key={m.id}>
                  <p className="text-lg">{m.namaPendek}</p>
                  <ul className="mt-1 space-y-2">
                    {babs.map((b) => {
                      const nilai = progres?.ujianBabTerbaik[b.id];
                      const persen = progres ? penguasaanBab(b, progres.soal) : 0;
                      return (
                        <li key={b.id} className="flex items-center justify-between gap-3">
                          <span className="min-w-0 flex-1">
                            <span className="block text-base">Bab {b.nomor} · {b.judul}</span>
                            <ProgressBar persen={persen} label={`Penguasaan ${b.judul}`} />
                          </span>
                          <Stars jumlah={bintangDariNilai(nilai)} label={`${bintangDariNilai(nilai)} dari 3 bintang`} />
                        </li>
                      );
                    })}
                  </ul>
                </li>
              );
            })}
          </ul>
        </section>
      </main>
    </>
  );
}
