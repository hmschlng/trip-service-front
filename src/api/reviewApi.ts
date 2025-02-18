// src/api/reviewApi.ts
import axiosInstance from './axiosInstance';

export interface ReviewCreateRequest {
  planId: string;
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
  imageUrls: string[];
  locationInfo: Record<string, string>;
  createdAt: string;
}

const reviewApi = {
  getReviewByPlan: (planId: string) => 
    axiosInstance.get<ReviewResponse>(`/api/reviews/plan/${planId}`),

  getMyReviews: (userId: string) => 
    axiosInstance.get<ReviewResponse[]>(`/api/reviews/my-reviews?userId=${userId}`),

  getReview: (reviewId: string) => 
    axiosInstance.get<ReviewResponse>(`/api/reviews/${reviewId}`),

  createReview: (data: ReviewCreateRequest) => 
    axiosInstance.post<ReviewResponse>('/api/reviews', data),

  updateReview: (reviewId: string, data: ReviewCreateRequest) => 
    axiosInstance.put<ReviewResponse>(`/api/reviews/${reviewId}`, data),

  deleteReview: (reviewId: string) => 
    axiosInstance.delete(`/api/reviews/${reviewId}`),

  uploadImages: (files: FormData) => 
    axiosInstance.post<string[]>('/api/reviews/images', files, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
};

export default reviewApi;