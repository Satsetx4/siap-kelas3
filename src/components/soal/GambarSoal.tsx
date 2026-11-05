import { useState } from 'react';
import Dialog from '../ui/Dialog';

export default function GambarSoal({ src, alt }: { src: string; alt: string }) {
  const [buka, setBuka] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setBuka(true)}
        className="my-3 block w-full rounded-2xl focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-jeruk-500"
      >
        <img src={src} alt={alt} loading="lazy" className="w-full rounded-2xl" style={{ aspectRatio: '4 / 3', objectFit: 'contain' }} />
      </button>
      <Dialog buka={buka} judul="Gambar Soal" onTutup={() => setBuka(false)}>
        <img src={src} alt={alt} className="w-full rounded-2xl" />
      </Dialog>
    </>
  );
}
