// src/recoil/recommendFilter.ts
import { atom } from 'recoil';

interface RecommendFilterState {
  categories: string[];
  season: string | null;
  priceRange: [number, number];
}

export const recommendFilterState = atom<RecommendFilterState>({
  key: 'recommendFilterState',
  default: {
    categories: [],
    season: null,
    priceRange: [0, 1000000]
  }
});