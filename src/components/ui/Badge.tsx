import type { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  warna?: 'netral' | 'benar' | 'salah' | 'ragu';
}

const gaya: Record<NonNullable<Props['warna']>, string> = {
  netral: 'bg-krem-100 text-tinta-700 dark:bg-malam-800 dark:text-[#F5EFE6]',
  benar: 'bg-benar-100 text-benar-500',
  salah: 'bg-salah-100 text-salah-500',
  ragu: 'bg-ragu-100 text-ragu-500',
};

export default function Badge({ children, warna = 'netral' }: Props) {
  return <span className={`inline-flex items-center rounded-full px-3 py-1 text-base font-medium ${gaya[warna]}`}>{children}</span>;
}
