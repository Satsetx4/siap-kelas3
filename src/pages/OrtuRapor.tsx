import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../store/useApp';
import { useMapel } from '../content/ContentProvider';
import { cariSoal } from '../content/helpers';
import AppHeader from '../components/layout/AppHeader';
import Seo from '../components/layout/Seo';
import ProgressBar from '../components/ui/ProgressBar';
import Badge from '../components/ui/Badge';
import { penguasaanBab } from '../lib/ringkasan';
import { formatTanggal, geserHari, kunciHari } from '../lib/tanggal';

export default function OrtuRapor() {
  const navigate = useNavigate();
  const mapelSemua = useMapel();
  const profil = useApp((s) => s.profil);
  const profilAktifId = useApp((s) => s.profilAktifId);
  const pilihProfil = useApp((s) => s.pilihProfil);
  const progresSemua = useApp((s) => s.progres);

  const [dipilih, setDipilih] = useState(profilAktifId ?? profil[0]?.id ?? '');
  const anak = profil.find((p) => p.id === dipilih);
  const progres = progresSemua[dipilih];

  const adaAktivitas = Boolean(progres && (Object.keys(progres.soal).length > 0 || progres.riwayat.length > 0));

  const soalSeringSalah = progres
    ? Object.entries(progres.soal)
        .filter(([, s]) => s.salah > 0)
        .sort((a, b) => b[1].salah - a[1].salah)
        .slice(0, 10)
        .map(([id, s]) => ({ id, salah: s.salah, soal: cariSoal(id) }))
        .filter((x) => x.soal)
    : [];

  const empatBelas = Array.from({ length: 14 }, (_, i) => {
    const kunci = kunciHari(geserHari(new Date(), i - 13));
    return { kunci, jumlah: progres?.harian[kunci] ?? 0 };
  });

  return (
    <>
      <Seo judul={`Rapor ${anak?.nama ?? ''}`} />
      <AppHeader judul={`Rapor ${anak?.nama ?? ''}`} backTo="/ortu" />
      <main className="space-y-4 p-4">
        <div className="flex flex-wrap items-center gap-2">
          <label htmlFor="pilih-anak" className="text-lg">Pilih anak</label>
          <select
            id="pilih-anak"
            value={dipilih}
            onChange={(e) => { setDipilih(e.target.value); pilihProfil(e.target.value); }}
            className="h-12 rounded-2xl border border-krem-200 bg-white px-3 text-lg dark:border-malam-700 dark:bg-malam-900 dark:text-[#F5EFE6]"
          >
            {profil.map((p) => <option key={p.id} value={p.id}>{p.nama}</option>)}
          </select>
          <button
            type="button"
            onClick={() => navigate('/ortu/pengaturan')}
            className="ml-auto h-12 rounded-2xl bg-krem-100 px-4 text-base dark:bg-malam-800 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-jeruk-500"
          >
            Pengaturan
          </button>
        </div>

        {!adaAktivitas ? (
          <p className="rounded-3xl border border-krem-200 bg-white p-5 text-lg dark:border-malam-800 dark:bg-malam-900">
            Belum ada latihan. Ajak {anak?.nama ?? 'anak'} mulai dari menu Mapel.
          </p>
        ) : (
          <>
            {mapelSemua.map((m) => {
              if (m.bab.length === 0) return null;
              return (
                <section key={m.id} className="rounded-3xl border border-krem-200 bg-white p-5 dark:border-malam-800 dark:bg-malam-900">
                  <h2 className="text-xl">{m.namaPendek}</h2>
                  <ul className="mt-3 space-y-4">
                    {m.bab.map((b) => {
                      const persen = progres ? penguasaanBab(b, progres.soal) : 0;
                      const nilai = progres?.ujianBabTerbaik[b.id];
                      return (
                        <li key={b.id}>
                          <div className="flex items-center justify-between gap-2">
                            <p className="text-base">Bab {b.nomor} · {b.judul}</p>
                            {persen < 70 ? <Badge warna="ragu">Perlu diulang</Badge> : <Badge warna="benar">Baik</Badge>}
                          </div>
                          <div className="mt-2 flex items-center gap-3">
                            <div className="flex-1">
                              <ProgressBar persen={persen} label={`Penguasaan ${b.judul}`} />
                            </div>
                            <span className="text-base text-tinta-500 dark:text-[#B8AEA3]">{Math.round(persen)}%</span>
                          </div>
                          <p className="mt-1 text-base text-tinta-500 dark:text-[#B8AEA3]">
                            Nilai ujian terbaik: {nilai !== undefined ? nilai : 'belum ada'}
                          </p>
                        </li>
                      );
                    })}
                  </ul>
                </section>
              );
            })}

            <section className="rounded-3xl border border-krem-200 bg-white p-5 dark:border-malam-800 dark:bg-malam-900">
              <h2 className="text-xl">10 Soal Paling Sering Salah</h2>
              {soalSeringSalah.length === 0 ? (
                <p className="mt-2 text-lg text-tinta-500 dark:text-[#B8AEA3]">Belum ada soal yang salah.</p>
              ) : (
                <ul className="mt-3 space-y-2">
                  {soalSeringSalah.map(({ id, salah, soal }) => (
                    <li key={id} className="rounded-2xl bg-krem-100 p-3 dark:bg-malam-800">
                      <p className="text-base">{soal?.pertanyaan || '(soal bergambar)'}</p>
                      <p className="text-sm text-tinta-500 dark:text-[#B8AEA3]">Salah {salah} kali</p>
                    </li>
                  ))}
                </ul>
              )}
            </section>

            <section className="rounded-3xl border border-krem-200 bg-white p-5 dark:border-malam-800 dark:bg-malam-900">
              <h2 className="text-xl">Riwayat 20 Sesi Terakhir</h2>
              {progres.riwayat.length === 0 ? (
                <p className="mt-2 text-lg text-tinta-500 dark:text-[#B8AEA3]">Belum ada sesi selesai.</p>
              ) : (
                <ul className="mt-3 space-y-2">
                  {progres.riwayat.slice(0, 20).map((r) => (
                    <li key={`${r.id}-${r.ts}`} className="flex items-center justify-between gap-2 rounded-2xl bg-krem-100 p-3 text-base dark:bg-malam-800">
                      <span>{r.jenis} · {r.total} soal</span>
                      <span className="font-bold">{r.nilai}</span>
                    </li>
                  ))}
                </ul>
              )}
            </section>

            <section className="rounded-3xl border border-krem-200 bg-white p-5 dark:border-malam-800 dark:bg-malam-900">
              <h2 className="text-xl">Aktivitas 14 Hari</h2>
              <ul className="mt-3 flex flex-wrap gap-2">
                {empatBelas.map((h) => (
                  <li key={h.kunci} className="text-center">
                    <span
                      aria-label={`${formatTanggal(h.kunci)}: ${h.jumlah} soal`}
                      className={`block h-7 w-7 rounded-lg ${h.jumlah === 0 ? 'bg-krem-100 dark:bg-malam-800' : h.jumlah < 10 ? 'bg-jeruk-400' : 'bg-pai-500'}`}
                    />
                  </li>
                ))}
              </ul>
            </section>
          </>
        )}
      </main>
    </>
  );
}
