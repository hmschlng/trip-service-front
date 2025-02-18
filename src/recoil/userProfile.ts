// src/recoil/userProfile.ts
import { atom } from 'recoil';

interface UserProfile {
  email: string;
  name: string;
  createdAt: string;
}

export const userProfileState = atom<UserProfile | null>({
  key: 'userProfileState',
  default: null
});