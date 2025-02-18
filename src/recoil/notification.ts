// src/recoil/notification.ts
import { atom } from 'recoil';

interface NotificationState {
  open: boolean;
  message: string;
  severity: 'success' | 'error' | 'warning' | 'info';
}

export const notificationState = atom<NotificationState>({
  key: 'notificationState',
  default: {
    open: false,
    message: '',
    severity: 'info'
  }
});