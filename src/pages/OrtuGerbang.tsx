import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ShieldCheck } from 'lucide-react';
import AppHeader from '../components/layout/AppHeader';
import Seo from '../components/layout/Seo';
import Button from '../components/ui/Button';
import { goyang } from '../lib/motion';

function soalBaru(): { a: number; b: number } {
  const a = 12 + Math.floor(Math.random() * 18);
  const b = 3 + Math.floor(Math.random() * 7);
  return { a, b };
}

export default function OrtuGerbang() {
  const navigate = useNavigate();
  const [soal, setSoal] = useState(soalBaru);
  const [jawab, setJawab] = useState('');
  const [salah, setSalah] = useState(0);
  const input = useRef<HTMLInputElement>(null);

  const kunci = useMemo(() => soal.a * soal.b, [soal]);

  useEffect(() => {
    input.current?.focus();
  }, [soal]);

  const periksa = useCallback(() => {
    if (Number(jawab) === kunci) {
      try { window.sessionStorage.setItem('sk3:ortu', '1'); } catch { /* abaikan */ }
      navigate('/ortu/rapor', { replace: true });
      return;
    }
    setSalah((n) => n + 1);
    setJawab('');
    setSoal(soalBaru());
  }, [jawab, kunci, navigate]);

  return (
    <>
      <Seo judul="Area Orang Tua" />
      <AppHeader judul="Area Orang Tua" backTo="/beranda" />
      <main className="p-4">
        <div className="rounded-3xl border border-krem-200 bg-white p-5 dark:border-malam-800 dark:bg-malam-900">
          <div className="flex items-center gap-2 text-jeruk-600 dark:text-jeruk-400">
            <ShieldCheck size={22} aria-hidden="true" />
            <p className="text-base">Khusus orang tua</p>
          </div>
          <p className="mt-2 text-lg">Untuk melanjutkan, jawab perkalian ini.</p>

          <motion.form
            key={`${soal.a}-${soal.b}-${salah}`}
            animate={salah > 0 ? goyang : undefined}
            onSubmit={(e) => { e.preventDefault(); periksa(); }}
            className="mt-4"
          >
            <label htmlFor="jawaban-ortu" className="block font-display text-3xl">
              {soal.a} × {soal.b} = ?
            </label>
            <input
              id="jawaban-ortu"
              ref={input}
              value={jawab}
              onChange={(e) => setJawab(e.target.value.replace(/[^0-9]/g, ''))}
              inputMode="numeric"
              autoComplete="off"
              className="mt-3 h-14 w-full rounded-2xl border border-krem-200 bg-white px-4 text-lg text-tinta-900 dark:border-malam-700 dark:bg-malam-950 dark:text-[#F5EFE6] focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-jeruk-500"
            />
            <div className="mt-4">
              <Button type="submit" ukuran="lg" className="w-full" disabled={jawab.trim() === ''}>
                Masuk
              </Button>
            </div>
          </motion.form>

          {salah > 0 ? (
            <p role="status" className="mt-3 text-base text-salah-500">Belum tepat. Coba soal yang baru ya.</p>
          ) : null}
        </div>
      </main>
    </>
  );
}
