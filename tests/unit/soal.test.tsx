import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SoalPGView from '../../src/components/soal/SoalPG';
import SoalJodohkanView from '../../src/components/soal/SoalJodohkan';
import SoalUrutkanView from '../../src/components/soal/SoalUrutkan';
import Pembahasan from '../../src/components/soal/Pembahasan';
import type { SoalPG, SoalJodohkan, SoalUrutkan } from '../../src/content/types';

const pg: SoalPG = {
  id: 't-b01-s01-q001', tipe: 'pg', pertanyaan: '2 + 3 = ...',
  pilihan: ['4', '5', '6'], kunci: 1,
  pembahasan: ['Dua ditambah tiga sama dengan lima.'], level: 'mudah', sumber: 'guru',
};

const jodohkan: SoalJodohkan = {
  id: 't-b01-s01-q002', tipe: 'jodohkan', pertanyaan: 'Jodohkan!',
  pasangan: [{ kiri: 'satu', kanan: '1' }, { kiri: 'dua', kanan: '2' }, { kiri: 'tiga', kanan: '3' }],
  pembahasan: ['Cocokkan tiap bilangan.'], level: 'sedang', sumber: 'buatan',
};

const urutkan: SoalUrutkan = {
  id: 't-b01-s01-q003', tipe: 'urutkan', pertanyaan: 'Urutkan!',
  urutanBenar: ['satu', 'dua', 'tiga'],
  pembahasan: ['Urut dari kecil ke besar.'], level: 'sedang', sumber: 'buatan',
};

describe('SoalPG', () => {
  it('menampilkan opsi sesuai permutasi acak dan memanggil onPilih', async () => {
    const pengguna = userEvent.setup();
    const onPilih = vi.fn();
    render(<SoalPGView soal={pg} acak={[2, 0, 1]} pilih={undefined} sudahDicek={false} onPilih={onPilih} />);

    const tombol = screen.getAllByRole('button');
    expect(tombol).toHaveLength(3);
    expect(tombol[0]).toHaveTextContent('6');
    expect(tombol[1]).toHaveTextContent('4');
    expect(tombol[2]).toHaveTextContent('5');

    await pengguna.click(tombol[0]);
    expect(onPilih).toHaveBeenCalledWith(2);
  });

  it('menandai jawaban benar dan salah setelah dicek', () => {
    render(<SoalPGView soal={pg} acak={[0, 1, 2]} pilih={0} sudahDicek onPilih={() => {}} />);
    expect(screen.getByLabelText('Jawaban benar')).toBeInTheDocument();
    expect(screen.getByLabelText('Jawaban salah')).toBeInTheDocument();
  });
});

describe('SoalJodohkan', () => {
  it('memasangkan dan melepas pasangan dengan ketukan', async () => {
    const pengguna = userEvent.setup();
    const onPasang = vi.fn();
    const { rerender } = render(
      <SoalJodohkanView soal={jodohkan} acak={[0, 1, 2]} pasangan={{}} sudahDicek={false} onPasang={onPasang} />,
    );

    const kiri = screen.getByRole('button', { name: 'satu' });
    await pengguna.click(kiri);
    const kanan = screen.getByRole('button', { name: '1' });
    await pengguna.click(kanan);
    expect(onPasang).toHaveBeenCalledWith({ 0: 0 });

    rerender(<SoalJodohkanView soal={jodohkan} acak={[0, 1, 2]} pasangan={{ 0: 0 }} sudahDicek={false} onPasang={onPasang} />);
    await pengguna.click(screen.getByRole('button', { name: /satu/ }));
    expect(onPasang).toHaveBeenLastCalledWith({});
  });
});

describe('SoalUrutkan', () => {
  it('membangun urutan dengan ketukan', async () => {
    const pengguna = userEvent.setup();
    const onUbah = vi.fn();
    const { rerender } = render(
      <SoalUrutkanView soal={urutkan} acak={[2, 0, 1]} urutan={[]} sudahDicek={false} onUbah={onUbah} />,
    );

    await pengguna.click(screen.getByRole('button', { name: 'tiga' }));
    expect(onUbah).toHaveBeenCalledWith([2]);

    rerender(<SoalUrutkanView soal={urutkan} acak={[2, 0, 1]} urutan={[2]} sudahDicek={false} onUbah={onUbah} />);
    await pengguna.click(screen.getByRole('button', { name: /tiga/ }));
    expect(onUbah).toHaveBeenLastCalledWith([]);
  });
});

describe('Pembahasan', () => {
  it('menampilkan butir pembahasan tanpa catatan kunci', () => {
    render(<Pembahasan soal={{ ...pg, catatanKunci: 'Kunci guru diduga salah.' }} />);
    expect(screen.getByText('Cara Mengerjakan')).toBeVisible();
    expect(screen.getByText('Dua ditambah tiga sama dengan lima.')).toBeVisible();
    expect(screen.queryByText(/diduga salah/)).toBeNull();
  });
});
