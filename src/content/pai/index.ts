import type { Mapel } from '../types';
import { bab01 } from './bab-01';
import { bab02 } from './bab-02';
import { bab03 } from './bab-03';
import { bab04 } from './bab-04';
import { bab05 } from './bab-05';
import { bab06 } from './bab-06';
import { bab07 } from './bab-07';
import { bab08 } from './bab-08';

export const pai: Mapel = {
  id: 'pai',
  nama: 'Pendidikan Agama Islam',
  namaPendek: 'PAI',
  ikon: 'MoonStar',
  warna: 'pai',
  bab: [bab01, bab02, bab03, bab04, bab05, bab06, bab07, bab08],
};
