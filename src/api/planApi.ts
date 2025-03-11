// src/api/planApi.ts
import axiosInstance from './axiosInstance';
import { ApiResponse } from '../types/api';
import { Page } from '../types/api';

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
    axiosInstance.get<ApiResponse<Page<PlanResponse>>>(`/api/plans/my-plans?userId=${userId}`),

  getPlan: (planId: string, userId: string) => 
    axiosInstance.get<ApiResponse<PlanResponse>>(`/api/plans/${planId}?userId=${userId}`),
    
  getPlanDetail: (planId: string, userId: string) => 
    axiosInstance.get<ApiResponse<PlanResponse>>(`/api/plans/${planId}?userId=${userId}`),

  createPlan: (data: PlanCreateRequest) => 
    axiosInstance.post<ApiResponse<PlanResponse>>('/api/plans', data),

  updatePlan: (planId: string, data: PlanCreateRequest) => 
    axiosInstance.put<ApiResponse<PlanResponse>>(`/api/plans/${planId}`, data),

  deletePlan: (planId: string) => 
    axiosInstance.delete<ApiResponse<void>>(`/api/plans/${planId}`)
};

export default planApi;