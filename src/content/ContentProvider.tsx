import { createContext, useContext, type ReactNode } from 'react';
import { SEMUA_MAPEL } from './index';
import type { Mapel } from './types';

const Konteks = createContext<Mapel[]>(SEMUA_MAPEL);

export function ContentProvider({ mapel, children }: { mapel: Mapel[]; children: ReactNode }) {
  return <Konteks.Provider value={mapel}>{children}</Konteks.Provider>;
}

export function useMapel(): Mapel[] {
  return useContext(Konteks);
}

export function useCariMapel(id: string): Mapel | undefined {
  return useMapel().find((m) => m.id === id);
}
