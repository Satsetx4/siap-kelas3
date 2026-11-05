import { useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import type { ReactNode } from 'react';
import IconButton from '../ui/IconButton';

interface Props {
  judul: string;
  backTo?: string;
  kanan?: ReactNode;
  tanpaKembali?: boolean;
}

export default function AppHeader({ judul, backTo = '/beranda', kanan, tanpaKembali = false }: Props) {
  const navigate = useNavigate();
  const lokasi = useLocation();
  const judulRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    judulRef.current?.focus?.();
  }, [lokasi.pathname]);

  const kembali = () => {
    const idx = (window.history.state as { idx?: number } | null)?.idx ?? 0;
    if (idx > 0) navigate(-1);
    else navigate(backTo);
  };

  return (
    <header className="sticky top-0 z-30 border-b border-krem-200 bg-krem-50/85 backdrop-blur dark:border-malam-800 dark:bg-malam-950/85">
      <div className="mx-auto flex h-16 max-w-[480px] items-center gap-3 px-3">
        {tanpaKembali ? (
          <span className="flex h-12 w-12 items-center justify-center">
            <img src="/favicon.svg" alt="Siap Kelas 3" width={36} height={36} />
          </span>
        ) : (
          <IconButton aria-label="Kembali" onClick={kembali}>
            <ArrowLeft size={24} />
          </IconButton>
        )}
        <h1 ref={judulRef} tabIndex={-1} className="flex-1 truncate text-xl outline-none">
          {judul}
        </h1>
        {kanan ? <div className="flex items-center gap-2">{kanan}</div> : null}
      </div>
    </header>
  );
}
