import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import BlokRenderer from '../../src/components/materi/BlokRenderer';
import TeksArab from '../../src/components/materi/TeksArab';
import KartuMateri from '../../src/components/materi/KartuMateri';
import type { Blok } from '../../src/content/types';
import { mapelUji } from '../../src/content/__uji__/mapelUji';

const daftarBlok: Blok[] = [
  { jenis: 'paragraf', teks: 'Paragraf contoh untuk pengujian.' },
  { jenis: 'poin', item: ['Poin pertama', 'Poin kedua'] },
  { jenis: 'ingat', teks: 'Ingat isi kotak ini.' },
  { jenis: 'contoh', teks: 'Contoh isi kotak.' },
  { jenis: 'arab', arab: 'بِسْمِ اللّٰهِ', latin: 'Bismillah', arti: 'Dengan nama Allah' },
  { jenis: 'kosakata', item: [{ en: 'book', id: 'buku' }, { en: 'door', id: 'pintu' }] },
  { jenis: 'gambar', src: 'data:image/gif;base64,R0lGODlhAQABAAAAACw=', alt: 'Gambar uji', keterangan: 'Keterangan gambar' },
];

describe('BlokRenderer', () => {
  it('merender semua jenis blok', () => {
    for (const blok of daftarBlok) {
      const { unmount } = render(<BlokRenderer blok={blok} />);
      if (blok.jenis === 'paragraf') expect(screen.getByText(blok.teks)).toBeVisible();
      if (blok.jenis === 'poin') expect(screen.getAllByRole('listitem')).toHaveLength(2);
      if (blok.jenis === 'ingat') expect(screen.getByText('Ingat ya!')).toBeVisible();
      if (blok.jenis === 'contoh') expect(screen.getByText('Contoh')).toBeVisible();
      if (blok.jenis === 'arab') expect(screen.getByText('Dengan nama Allah')).toBeVisible();
      if (blok.jenis === 'kosakata') expect(screen.getByRole('button', { name: 'Dengarkan book' })).toBeVisible();
      if (blok.jenis === 'gambar') expect(screen.getByRole('img', { name: 'Gambar uji' })).toBeVisible();
      unmount();
    }
  });
});

describe('TeksArab', () => {
  it('memakai dir rtl dan lang ar', () => {
    render(<TeksArab arab="بِسْمِ اللّٰهِ" latin="Bismillah" arti="Dengan nama Allah" />);
    const teks = screen.getByText('بِسْمِ اللّٰهِ');
    expect(teks).toHaveAttribute('dir', 'rtl');
    expect(teks).toHaveAttribute('lang', 'ar');
  });
});

describe('KartuMateri', () => {
  it('merender kartu dari fixture', () => {
    const kartu = mapelUji.bab[0].subBab[0].materi[0];
    render(<KartuMateri kartu={kartu} />);
    expect(screen.getByRole('heading', { name: kartu.judul })).toBeVisible();
  });
});
