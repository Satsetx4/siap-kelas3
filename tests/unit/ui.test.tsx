import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Button from '../../src/components/ui/Button';
import IconButton from '../../src/components/ui/IconButton';
import ThemeToggle from '../../src/components/layout/ThemeToggle';

describe('Button', () => {
  it('merender label dan memanggil onClick', async () => {
    const pengguna = userEvent.setup();
    let diklik = 0;
    render(<Button onClick={() => { diklik += 1; }}>Mulai</Button>);
    const tombol = screen.getByRole('button', { name: 'Mulai' });
    expect(tombol).toBeVisible();
    await pengguna.click(tombol);
    expect(diklik).toBe(1);
  });
});

describe('IconButton', () => {
  it('memiliki aria-label', () => {
    render(<IconButton aria-label="Tutup">X</IconButton>);
    expect(screen.getByRole('button', { name: 'Tutup' })).toBeVisible();
  });
});

describe('ThemeToggle', () => {
  it('menulis sk3:tema dan menambah class dark', async () => {
    const pengguna = userEvent.setup();
    localStorage.clear();
    document.documentElement.classList.remove('dark');
    render(<ThemeToggle />);
    const tombol = screen.getByRole('button', { name: /mode gelap/i });
    await pengguna.click(tombol);
    expect(localStorage.getItem('sk3:tema')).toBe('gelap');
    expect(document.documentElement.classList.contains('dark')).toBe(true);
    document.documentElement.classList.remove('dark');
    localStorage.clear();
  });
});
