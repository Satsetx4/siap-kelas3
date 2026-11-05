import type { Mapel } from './types';
import { pai } from './pai';
import { inggris } from './inggris';
import { mapelUji } from './__uji__/mapelUji';

export const SEMUA_MAPEL: Mapel[] = import.meta.env.VITE_E2E === '1' ? [pai, inggris, mapelUji] : [pai, inggris];
