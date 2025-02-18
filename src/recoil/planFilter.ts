// src/recoil/planFilter.ts
import { atom } from 'recoil';

interface PlanFilterState {
  startDate: Date | null;
  endDate: Date | null;
  themes: string[];
}

export const planFilterState = atom<PlanFilterState>({
  key: 'planFilterState',
  default: {
    startDate: null,
    endDate: null,
    themes: []
  }
});