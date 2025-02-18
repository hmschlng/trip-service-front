// src/types/plan.ts
export interface Plan {
  planId: string;
  userId: string;
  title: string;
  startDate: string;
  endDate: string;
  status: 'DRAFT' | 'PUBLISHED';
  travelStyle: string;
  estimatedBudget: number;
  companions: string[];
  themes: string[];
  timeline: TimelineItem[];
  createdAt: string;
  updatedAt: string;
}

export interface TimelineItem {
  itemId: string;
  planId: string;
  date: string;
  time: string;
  activity: string;
  location: string;
  dailyBudget: number;
  createdAt: string;
}

export interface PlanFilter {
  startDate?: string;
  endDate?: string;
  themes?: string[];
  keyword?: string;
}