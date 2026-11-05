/** Kunci hari lokal: YYYY-MM-DD */
export function kunciHari(d: Date = new Date()): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const t = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${t}`;
}

export function geserHari(d: Date, delta: number): Date {
  const salinan = new Date(d.getFullYear(), d.getMonth(), d.getDate());
  salinan.setDate(salinan.getDate() + delta);
  return salinan;
}

export function formatTanggal(iso: string): string {
  const [y, m, d] = iso.split('-').map(Number);
  const nama = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
  return `${d} ${nama[m - 1]} ${y}`;
}
