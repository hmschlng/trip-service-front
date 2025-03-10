// src/api/planApi.ts
import axiosInstance from './axiosInstance';
import { ApiResponse } from '../types/api';

export interface PlanCreateRequest {
  title: string;
  startDate: string;
  endDate: string;
  companions: string[];
  themes: string[];
  estimatedBudget: number;
  userId: string;
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
  dayNumber?: number;
  date?: string;
  time?: string;
  activity?: string;
  location?: string;
  note?: string;
  dailyBudget?: number;
}

const planApi = {
  getMyPlans: (userId: string) => 
    axiosInstance.get<ApiResponse<PlanResponse[]>>(`/plans/my-plans?userId=${userId}`),

  getPlan: (planId: string, userId: string) => 
    axiosInstance.get<ApiResponse<PlanResponse>>(`/plans/${planId}?userId=${userId}`),
    
  getPlanDetail: (planId: string, userId: string) => 
    axiosInstance.get<ApiResponse<PlanResponse>>(`/plans/${planId}?userId=${userId}`),

  createPlan: (data: PlanCreateRequest) => 
    axiosInstance.post<ApiResponse<PlanResponse>>('/plans', data),

  updatePlan: (planId: string, data: PlanCreateRequest) => 
    axiosInstance.put<ApiResponse<PlanResponse>>(`/plans/${planId}`, data),

  deletePlan: (planId: string) => 
    axiosInstance.delete<ApiResponse<void>>(`/plans/${planId}`)
};

export default planApi;