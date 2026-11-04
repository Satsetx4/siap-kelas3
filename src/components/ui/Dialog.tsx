import { useEffect, useRef, type ReactNode } from 'react';
import { X } from 'lucide-react';
import IconButton from './IconButton';
import Button from './Button';

interface Props {
  buka: boolean;
  judul: string;
  onTutup: () => void;
  children: ReactNode;
  teksBatal?: string;
}

export default function Dialog({ buka, judul, onTutup, children, teksBatal = 'Batal' }: Props) {
  const pemicu = useRef<Element | null>(null);

  useEffect(() => {
    if (!buka) return;
    pemicu.current = document.activeElement;
    const kunci = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onTutup();
    };
    document.addEventListener('keydown', kunci);
    try {
      document.getElementById('root')?.setAttribute('inert', '');
    } catch { /* abaikan */ }
    return () => {
      document.removeEventListener('keydown', kunci);
      try {
        document.getElementById('root')?.removeAttribute('inert');
      } catch { /* abaikan */ }
      (pemicu.current as HTMLElement | null)?.focus?.();
    };
  }, [buka, onTutup]);

  if (!buka) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 sm:items-center sm:p-4"
      onClick={onTutup}
      role="presentation"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={judul}
        className="w-full max-w-md rounded-t-3xl bg-white p-5 dark:bg-malam-900 sm:rounded-3xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-2xl">{judul}</h2>
          <IconButton aria-label="Tutup" onClick={onTutup}>
            <X size={24} />
          </IconButton>
        </div>
        {children}
        <div className="mt-4">
          <Button varian="hantu" onClick={onTutup}>
            {teksBatal}
          </Button>
        </div>
      </div>
    </div>
  );
}
