type Peristiwa =
  | { nama: 'profil_dibuat' }
  | { nama: 'mulai_sesi'; jenis: string; mapel: string }
  | { nama: 'selesai_sesi'; jenis: string; nilai: number }
  | { nama: 'klik_cta'; nama_cta: string };

interface JendelaAnalitik {
  va?: (peristiwa: string, data?: Record<string, string | number>) => void;
}

/** Mengirim peristiwa analitik tanpa pernah mengirim nama anak. */
export function track(p: Peristiwa): void {
  try {
    const va = (window as unknown as JendelaAnalitik).va;
    if (typeof va !== 'function') return;
    const { nama, ...data } = p;
    va(nama, data as Record<string, string | number>);
  } catch { /* abaikan */ }
}
