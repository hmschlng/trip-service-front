// src/api/reviewApi.ts
import axiosInstance from './axiosInstance';
import { ApiResponse } from '../types/api';

export interface ReviewCreateRequest {
  planId: string;
  userId: string;
  title: string;
  content: string;
  imageUrls: string[];
  locationInfo: Record<string, string>;
}

export interface ReviewResponse {
  reviewId: string;
  planId: string;
  userId: string;
  title: string;
  content: string;
  images?: string[];
  imageUrls?: string[];
  locationInfo: Record<string, string>;
  createdAt: string;
}

const reviewApi = {
  getReviewByPlan: (planId: string) => 
    axiosInstance.get<ApiResponse<ReviewResponse>>(`/api/reviews/plan/${planId}`),

  getMyReviews: (userId: string) => 
    axiosInstance.get<ApiResponse<ReviewResponse[]>>(`/api/reviews/my-reviews?userId=${userId}`),

  getReview: (reviewId: string) => 
    axiosInstance.get<ApiResponse<ReviewResponse>>(`/api/reviews/${reviewId}`),
    
  getReviewDetail: (reviewId: string) => 
    axiosInstance.get<ApiResponse<ReviewResponse>>(`/api/reviews/${reviewId}`),

  createReview: (data: ReviewCreateRequest) => 
    axiosInstance.post<ApiResponse<ReviewResponse>>('/api/reviews', data),

  updateReview: (reviewId: string, data: ReviewCreateRequest) => 
    axiosInstance.put<ApiResponse<ReviewResponse>>(`/api/reviews/${reviewId}`, data),

  deleteReview: (reviewId: string) => 
    axiosInstance.delete<ApiResponse<void>>(`/api/reviews/${reviewId}`),

  uploadImages: (file: FormData) => 
    axiosInstance.post<ApiResponse<string[]>>('/api/images', file, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }),
    
  uploadMultipleImages: (files: FormData) => 
    axiosInstance.post<ApiResponse<string[]>>('/api/images/multiple', files, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }).then(response => response.data.data)
};

export default reviewApi;