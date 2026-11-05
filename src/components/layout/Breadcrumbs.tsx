import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

export interface Remah {
  label: string;
  ke?: string;
}

export default function Breadcrumbs({ item }: { item: Remah[] }) {
  return (
    <nav aria-label="Remah roti" className="mb-3 flex flex-wrap items-center gap-1 text-base text-tinta-500 dark:text-[#B8AEA3]">
      {item.map((r, i) => (
        <span key={`${r.label}-${i}`} className="flex items-center gap-1">
          {r.ke ? (
            <Link to={r.ke} className="underline underline-offset-2 hover:text-tinta-900 dark:hover:text-[#F5EFE6]">
              {r.label}
            </Link>
          ) : (
            <span aria-current="page">{r.label}</span>
          )}
          {i < item.length - 1 ? <ChevronRight size={16} aria-hidden="true" /> : null}
        </span>
      ))}
    </nav>
  );
}
