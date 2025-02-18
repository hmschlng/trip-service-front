// src/types/review.ts
export interface Review {
  reviewId: string;
  planId: string;
  userId: string;
  title: string;
  content: string;
  imageUrls: string[];
  locationInfo: LocationInfo;
  createdAt: string;
  updatedAt: string;
}

export interface LocationInfo {
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  category?: string;
}

export interface ReviewFilter {
  startDate?: string;
  endDate?: string;
  location?: string;
  keyword?: string;
}

export interface ImageUploadResponse {
  url: string;
  fileName: string;
}