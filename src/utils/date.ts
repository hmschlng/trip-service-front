// src/utils/date.ts
import { format, parseISO } from 'date-fns';

export const formatDate = (date: string) => {
  return format(parseISO(date), 'yyyy.MM.dd');
};

export const formatDateTime = (date: string) => {
  return format(parseISO(date), 'yyyy.MM.dd HH:mm');
};
