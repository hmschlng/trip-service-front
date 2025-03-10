// src/recoil/loading.ts
import { atom } from 'recoil';

export const loadingState = atom<boolean>({
  key: 'loadingState',
  default: false
});