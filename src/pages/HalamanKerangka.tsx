import type { ReactNode } from 'react';
import AppHeader from '../components/layout/AppHeader';
import Seo from '../components/layout/Seo';

interface Props {
  judul: string;
  backTo?: string;
  kanan?: ReactNode;
  tanpaKembali?: boolean;
  children?: ReactNode;
}

export default function HalamanKerangka({ judul, backTo, kanan, tanpaKembali, children }: Props) {
  return (
    <>
      <Seo judul={judul} />
      <AppHeader judul={judul} backTo={backTo} kanan={kanan} tanpaKembali={tanpaKembali} />
      <main className="p-4">
        {children ?? <p className="text-lg text-tinta-500 dark:text-[#B8AEA3]">Halaman {judul} sedang disiapkan.</p>}
      </main>
    </>
  );
}
