import { Star } from 'lucide-react';

interface Props {
  jumlah: number;
  maksimal?: number;
  label?: string;
}

export default function Stars({ jumlah, maksimal = 3, label }: Props) {
  return (
    <div role="img" aria-label={label ?? `${jumlah} dari ${maksimal} bintang`} className="flex gap-1">
      {Array.from({ length: maksimal }, (_, i) => (
        <Star
          key={i}
          size={24}
          className={i < jumlah ? 'fill-jeruk-500 text-jeruk-500' : 'text-tinta-500 dark:text-[#B8AEA3]'}
        />
      ))}
    </div>
  );
}
