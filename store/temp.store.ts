import { create } from 'zustand';

interface TempStore {
  tempID: string | null;
  setTempID: (tempID: string) => void;
  clearTempID: () => void;
}

export const useTempStore = create<TempStore>((set) => ({
  tempID: null,
  setTempID: (tempID: string) => set({ tempID }),
  clearTempID: () => set({ tempID: null }),
}));