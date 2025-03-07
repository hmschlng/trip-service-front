// src/api/planApi.ts
import axiosInstance from './axiosInstance';

export interface PlanCreateRequest {
  userId: string;
  title: string;
  startDate: string;
  endDate: string;
  companions: string[];
  themes: string[];
  estimatedBudget: number;
}

export interface PlanUpdateRequest extends PlanCreateRequest {
  status?: string;
}

export interface PlanResponse {
  planId: string;
  title: string;
}

export interface PlanListResponse {
  planId: string;
  title: string;
  startDate: string;
  endDate: string;
  themes: string[];
  createdAt: string;
}

export interface TimelineItem {
  dayNumber: number;
  time: string;
  activity: string;
  location: string;
  note: string;
}

export interface PlanDetailResponse {
  planId: string;
  title: string;
  startDate: string;
  endDate: string;
  companions: string[];
  themes: string[];
  estimatedBudget: number;
  timeline: TimelineItem[];
}

const planApi = {
  getMyPlans: (userId: string) => 
    axiosInstance.get<PlanListResponse[]>(`/plans/my-plans?userId=${userId}`),

  getPlanDetail: (planId: string, userId: string) => 
    axiosInstance.get<PlanDetailResponse>(`/plans/${planId}?userId=${userId}`),

  createPlan: (data: PlanCreateRequest) => 
    axiosInstance.post<PlanResponse>('/plans', data),

  updatePlan: (planId: string, data: PlanUpdateRequest) => 
    axiosInstance.put<PlanResponse>(`/plans/${planId}`, data),

  deletePlan: (planId: string) => 
    axiosInstance.delete(`/plans/${planId}`),
    
  saveDraft: (data: PlanCreateRequest) => 
    axiosInstance.post<PlanResponse>('/plans/draft', data)
};

export default planApi;