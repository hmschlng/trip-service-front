// src/api/planApi.ts
import axiosInstance from './axiosInstance';

export interface PlanCreateRequest {
  title: string;
  startDate: string;
  endDate: string;
  companions: string[];
  themes: string[];
  estimatedBudget: number;
}

export interface PlanResponse {
  planId: string;
  title: string;
  startDate: string;
  endDate: string;
  companions: string[];
  themes: string[];
  estimatedBudget: number;
  timeline: TimelineItem[];
  createdAt: string;
}

export interface TimelineItem {
  date: string;
  time: string;
  activity: string;
  location: string;
  dailyBudget: number;
}

const planApi = {
  getMyPlans: (userId: string) => 
    axiosInstance.get<PlanResponse[]>(`/api/plans/my-plans?userId=${userId}`),

  getPlan: (planId: string, userId: string) => 
    axiosInstance.get<PlanResponse>(`/api/plans/${planId}?userId=${userId}`),

  createPlan: (data: PlanCreateRequest) => 
    axiosInstance.post<PlanResponse>('/api/plans', data),

  updatePlan: (planId: string, data: PlanCreateRequest) => 
    axiosInstance.put<PlanResponse>(`/api/plans/${planId}`, data),

  deletePlan: (planId: string) => 
    axiosInstance.delete(`/api/plans/${planId}`)
};

export default planApi;