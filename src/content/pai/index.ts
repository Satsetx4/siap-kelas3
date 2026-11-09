import type { Mapel } from '../types';
import { bab01 } from './bab-01';
import { bab02 } from './bab-02';

export const pai: Mapel = {
  id: 'pai',
  nama: 'Pendidikan Agama Islam',
  namaPendek: 'PAI',
  ikon: 'MoonStar',
  warna: 'pai',
  bab: [bab01, bab02],
};
