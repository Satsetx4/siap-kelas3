import { Footprints, Flame, CalendarCheck, Medal, Crown, Eraser, Ear, Target } from 'lucide-react';

export const IKON_LENCANA: Record<string, typeof Footprints> = {
  'langkah-pertama': Footprints,
  'rajin-3': Flame,
  'rajin-7': CalendarCheck,
  'nilai-sempurna': Medal,
  'penakluk-bab': Crown,
  'pembasmi-salah': Eraser,
  'telinga-hebat': Ear,
  'seratus-soal': Target,
};

export function ikonLencana(id: string) {
  return IKON_LENCANA[id] ?? Footprints;
}
