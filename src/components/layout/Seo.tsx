import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { SITE_URL } from '../../lib/situs';

interface Props {
  judul: string;
  deskripsi?: string;
}

export default function Seo({ judul, deskripsi }: Props) {
  const { pathname } = useLocation();

  useEffect(() => {
    document.title = `${judul} · Siap Kelas 3`;

    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('name', 'description');
      document.head.appendChild(meta);
    }
    if (deskripsi) meta.setAttribute('content', deskripsi);

    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', `${SITE_URL}${pathname}`);
  }, [judul, deskripsi, pathname]);

  return null;
}
