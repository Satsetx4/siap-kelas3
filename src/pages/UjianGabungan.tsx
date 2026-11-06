import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check } from 'lucide-react';
import { useMapel } from '../content/ContentProvider';
import { useApp } from '../store/useApp';
import AppHeader from '../components/layout/AppHeader';
import Seo from '../components/layout/Seo';
import Button from '../components/ui/Button';
import Segmented from '../components/ui/Segmented';
import { pilihUjianGabungan } from '../engine/pilihSoal';
import { buatRng } from '../lib/rng';
import { buatSesi } from '../lib/sesi';
import { TIPE_DINILAI } from '../content/types';
import { track } from '../lib/analytics';

export default function UjianGabungan() {
  const mapelSemua = useMapel();
  const navigate = useNavigate();
  const mulaiSesi = useApp((s) => s.mulaiSesi);
  const [mapelId, setMapelId] = useState(mapelSemua[0]?.id ?? '');
  const mapel = mapelSemua.find((m) => m.id === mapelId);
  const [dipilih, setDipilih] = useState<string[]>([]);

  const babBerisi = useMemo(
    () => (mapel?.bab ?? []).filter((b) => b.subBab.some((s) => s.soal.some((q) => TIPE_DINILAI.includes(q.tipe)))),
    [mapel],
  );

  const gantiMapel = (id: string) => {
    setMapelId(id);
    setDipilih([]);
  };

  const toggle = (id: string) => {
    setDipilih((lama) => (lama.includes(id) ? lama.filter((x) => x !== id) : [...lama, id]));
  };

  const mulai = () => {
    if (!mapel || dipilih.length === 0) return;
    const babs = babBerisi.filter((b) => dipilih.includes(b.id));
    const soal = pilihUjianGabungan(babs, buatRng(Date.now()));
    if (soal.length === 0) return;
    mulaiSesi(buatSesi({
      jenis: 'ujian-gabungan',
      mapelId: mapel.id,
      babIds: babs.map((b) => b.id),
      filter: 'semua',
      soal,
      durasiMenit: 30,
    }));
    track({ nama: 'mulai_sesi', jenis: 'ujian-gabungan', mapel: mapel.id });
    navigate('/sesi');
  };

  return (
    <>
      <Seo judul="Ujian Gabungan" deskripsi="Pilih bab lalu kerjakan ujian gabungan 25 soal." />
      <AppHeader judul="Ujian Gabungan" backTo="/mapel" />
      <main className="space-y-4 p-4">
        {mapelSemua.length > 1 ? (
          <Segmented
            label="Pilih mata pelajaran"
            opsi={mapelSemua.slice(0, 3).map((m) => ({ id: m.id, label: m.namaPendek }))}
            aktif={mapelId}
            onPilih={gantiMapel}
          />
        ) : null}

        {babBerisi.length === 0 ? (
          <p className="rounded-3xl border border-krem-200 bg-white p-5 text-lg dark:border-malam-800 dark:bg-malam-900">
            Belum ada bab yang bisa diujikan.
          </p>
        ) : (
          <ul className="space-y-2">
            {babBerisi.map((b) => {
              const aktif = dipilih.includes(b.id);
              return (
                <li key={b.id}>
                  <button
                    type="button"
                    aria-pressed={aktif}
                    onClick={() => toggle(b.id)}
                    className={`flex w-full items-center gap-3 rounded-2xl border p-4 text-left text-lg focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-jeruk-500 ${
                      aktif ? 'border-2 border-jeruk-500 bg-white dark:bg-malam-900' : 'border-krem-200 bg-white dark:border-malam-700 dark:bg-malam-900'
                    }`}
                  >
                    <span className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-md border ${aktif ? 'border-jeruk-500 bg-jeruk-500' : 'border-krem-200 dark:border-malam-700'}`}>
                      {aktif ? <Check size={16} className="text-tinta-900" aria-hidden="true" /> : null}
                    </span>
                    <span>Bab {b.nomor} · {b.judul}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        )}

        <p className="text-lg text-tinta-500 dark:text-[#B8AEA3]">25 soal · 30 menit</p>
        <Button ukuran="lg" className="w-full" disabled={dipilih.length === 0} onClick={mulai}>
          Mulai
        </Button>
      </main>
    </>
  );
}
