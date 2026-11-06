import { useEffect, useRef, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
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
  const panel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!buka) return;
    pemicu.current = document.activeElement;
    panel.current?.focus();
    const kunci = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onTutup();
    };
    document.addEventListener('keydown', kunci);
    return () => {
      document.removeEventListener('keydown', kunci);
      (pemicu.current as HTMLElement | null)?.focus?.();
    };
  }, [buka, onTutup]);

  if (!buka) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 sm:items-center sm:p-4"
      onClick={onTutup}
      role="presentation"
    >
      <div
        ref={panel}
        role="dialog"
        aria-modal="true"
        aria-label={judul}
        tabIndex={-1}
        className="max-h-[90dvh] w-full max-w-md overflow-y-auto rounded-t-3xl bg-white p-5 outline-none dark:bg-malam-900 sm:rounded-3xl"
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
    </div>,
    document.body,
  );
}
