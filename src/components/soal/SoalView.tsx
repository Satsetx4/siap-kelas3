import { Volume2 } from 'lucide-react';
import type { Soal } from '../../content/types';
import type { Jawaban } from '../../store/types';
import Badge from '../ui/Badge';
import TeksArab from '../materi/TeksArab';
import TombolBacakan from '../materi/TombolBacakan';
import GambarSoal from './GambarSoal';
import SoalPGView from './SoalPG';
import SoalBSView from './SoalBS';
import SoalIsian from './SoalIsian';
import SoalJodohkanView from './SoalJodohkan';
import SoalUrutkanView from './SoalUrutkan';
import SoalUraianView from './SoalUraian';
import { bicara } from '../../lib/tts';
import { usePref } from '../../store/usePref';

interface Props {
  soal: Soal;
  acak: number[];
  jawaban?: Jawaban;
  sudahDicek: boolean;
  onJawab: (j: Jawaban) => void;
  lang?: 'id-ID' | 'en-US';
  onEnter?: () => void;
}

const labelLevel: Record<Soal['level'], string> = { mudah: 'Mudah', sedang: 'Sedang', menantang: 'Menantang' };

export default function SoalView({ soal, acak, jawaban, sudahDicek, onJawab, lang = 'id-ID', onEnter }: Props) {
  const kecepatan = usePref((s) => s.kecepatan);
  const teksBacaan = [soal.pertanyaan, soal.tipe === 'pg' ? soal.pilihan.join(', ') : ''].filter(Boolean).join('. ');

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-2">
        {soal.sumber === 'guru' ? <Badge>Soal Guru</Badge> : null}
        <Badge warna="netral">{labelLevel[soal.level]}</Badge>
      </div>

      {soal.pertanyaan ? <p className="text-lg leading-relaxed">{soal.pertanyaan}</p> : null}
      {soal.arab ? <TeksArab arab={soal.arab} /> : null}
      {soal.gambar ? <GambarSoal src={soal.gambar} alt={soal.gambarAlt ?? 'Gambar soal'} /> : null}

      {soal.audio ? (
        <div className="flex flex-col items-center gap-2 py-2">
          <button
            type="button"
            onClick={() => bicara(soal.audio!.teks, soal.audio!.lang, kecepatan)}
            className="flex h-20 w-20 items-center justify-center rounded-full bg-jeruk-500 text-tinta-900 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-jeruk-500"
            aria-label="Dengarkan"
          >
            <Volume2 size={32} aria-hidden="true" />
          </button>
          <span className="text-base text-tinta-500 dark:text-[#B8AEA3]">Dengarkan</span>
          {sudahDicek ? (
            <p className="text-base italic text-tinta-700 dark:text-[#F5EFE6]">Teks: {soal.audio.teks}</p>
          ) : null}
        </div>
      ) : null}

      {!soal.audio ? (
        <div>
          <TombolBacakan teks={teksBacaan} lang={lang} />
        </div>
      ) : null}

      <div className="pt-1">
        {soal.tipe === 'pg' && (
          <SoalPGView
            soal={soal}
            acak={acak}
            pilih={jawaban?.tipe === 'pg' ? jawaban.pilih : undefined}
            sudahDicek={sudahDicek}
            onPilih={(i) => onJawab({ tipe: 'pg', pilih: i })}
          />
        )}
        {soal.tipe === 'bs' && (
          <SoalBSView
            nilai={jawaban?.tipe === 'bs' ? jawaban.nilai : undefined}
            sudahDicek={sudahDicek}
            onPilih={(v) => onJawab({ tipe: 'bs', nilai: v })}
          />
        )}
        {soal.tipe === 'isian' && (
          <SoalIsian
            teks={jawaban?.tipe === 'isian' ? jawaban.teks : ''}
            sudahDicek={sudahDicek}
            onUbah={(t) => onJawab({ tipe: 'isian', teks: t })}
            onEnter={onEnter}
          />
        )}
        {soal.tipe === 'jodohkan' && (
          <SoalJodohkanView
            soal={soal}
            acak={acak}
            pasangan={jawaban?.tipe === 'jodohkan' ? jawaban.pasangan : {}}
            sudahDicek={sudahDicek}
            onPasang={(p) => onJawab({ tipe: 'jodohkan', pasangan: p })}
          />
        )}
        {soal.tipe === 'urutkan' && (
          <SoalUrutkanView
            soal={soal}
            acak={acak}
            urutan={jawaban?.tipe === 'urutkan' ? jawaban.urutan : []}
            sudahDicek={sudahDicek}
            onUbah={(u) => onJawab({ tipe: 'urutkan', urutan: u })}
          />
        )}
        {soal.tipe === 'uraian' && <SoalUraianView soal={soal} />}
      </div>
    </div>
  );
}
