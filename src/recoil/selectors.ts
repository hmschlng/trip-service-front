// src/recoil/selectors.ts
import { selector } from 'recoil';
import { authState } from './auth';
import { planFilterState } from './planFilter';
import { recommendFilterState } from './recommendFilter'

export const isLoggedInSelector = selector({
  key: 'isLoggedInSelector',
  get: ({ get }) => {
    const auth = get(authState);
    return auth.isAuthenticated;
  }
});

export const activeFiltersCountSelector = selector({
  key: 'activeFiltersCountSelector',
  get: ({ get }) => {
    const planFilter = get(planFilterState);
    const recommendFilter = get(recommendFilterState);

    let count = 0;
    if (planFilter.startDate) count++;
    if (planFilter.endDate) count++;
    count += planFilter.themes.length;
    count += recommendFilter.categories.length;
    if (recommendFilter.season) count++;
    
    return count;
  }
});

export const hasActiveFiltersSelector = selector({
  key: 'hasActiveFiltersSelector',
  get: ({ get }) => {
    const count = get(activeFiltersCountSelector);
    return count > 0;
  }
});