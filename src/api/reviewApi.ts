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
    axiosInstance.get<ApiResponse<ReviewResponse>>(`/reviews/plan/${planId}`),

  getMyReviews: (userId: string) => 
    axiosInstance.get<ApiResponse<ReviewResponse[]>>(`/reviews/my-reviews?userId=${userId}`),

  getReview: (reviewId: string) => 
    axiosInstance.get<ApiResponse<ReviewResponse>>(`/reviews/${reviewId}`),
    
  getReviewDetail: (reviewId: string) => 
    axiosInstance.get<ApiResponse<ReviewResponse>>(`/reviews/${reviewId}`),

  createReview: (data: ReviewCreateRequest) => 
    axiosInstance.post<ApiResponse<ReviewResponse>>('/reviews', data),

  updateReview: (reviewId: string, data: ReviewCreateRequest) => 
    axiosInstance.put<ApiResponse<ReviewResponse>>(`/reviews/${reviewId}`, data),

  deleteReview: (reviewId: string) => 
    axiosInstance.delete<ApiResponse<void>>(`/reviews/${reviewId}`),

  uploadImages: (file: FormData) => 
    axiosInstance.post<ApiResponse<string[]>>('/images', file, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }),
    
  uploadMultipleImages: (files: FormData) => 
    axiosInstance.post<ApiResponse<string[]>>('/images/multiple', files, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }).then(response => response.data.data)
};

export default reviewApi;