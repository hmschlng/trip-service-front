// src/api/reviewApi.ts
import axiosInstance from './axiosInstance';

export interface ReviewCreateRequest {
  planId: string;
  userId: string;
  title: string;
  content: string;
  imageUrls: string[];
  locationInfo: Record<string, string>;
}

export interface ReviewUpdateRequest {
  userId: string;
  title?: string;
  content?: string;
  imageUrls?: string[];
  locationInfo?: Record<string, string>;
}

export interface ReviewResponse {
  reviewId: string;
  title: string;
}

export interface ReviewListResponse {
  reviewId: string;
  title: string;
  createdAt: string;
}

export interface ReviewDetailResponse {
  reviewId: string;
  title: string;
  content: string;
  images: string[];
  location: Record<string, string>;
}

const reviewApi = {
  getReviewByPlan: (planId: string) => 
    axiosInstance.get<ReviewDetailResponse>(`/reviews/plan/${planId}`),

  getMyReviews: (userId: string) => 
    axiosInstance.get<ReviewListResponse[]>(`/reviews/my-reviews?userId=${userId}`),

  getReviewDetail: (reviewId: string) => 
    axiosInstance.get<ReviewDetailResponse>(`/reviews/${reviewId}`),

  createReview: (data: ReviewCreateRequest) => 
    axiosInstance.post<ReviewResponse>('/reviews', data),

  updateReview: (reviewId: string, data: ReviewUpdateRequest) => 
    axiosInstance.put<ReviewResponse>(`/reviews/${reviewId}`, data),

  deleteReview: (reviewId: string) => 
    axiosInstance.delete(`/reviews/${reviewId}`),

  uploadImage: (file: FormData) => 
    axiosInstance.post<string>('/images', file, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }),
    
  uploadMultipleImages: (files: FormData) => 
    axiosInstance.post<string[]>('/images/multiple', files, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
};

export default reviewApi;