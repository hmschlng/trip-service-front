// src/api/recommendApi.ts
import axiosInstance from './axiosInstance';
import { ApiResponse } from '../types/api';

export interface PlaceResponse {
  placeId: string;
  name: string;
  description: string;
  imageUrl: string;
  category: string;
  preferenceType: string;
  matchingPercentage: number;
  matchingReason: string;
}

export interface PlaceDetailResponse {
  placeId: string;
  name: string;
  description: string;
  imageUrl: string;
  activities: string[];
  details: Record<string, string>;
  weatherInfo: {
    location: string;
    temperature: number;
    description: string;
    humidity: number;
    windSpeed: number;
    iconUrl: string;
    timestamp: number;
  };
  nearbyPlaces: {
    name: string;
    description: string;
    distance: number;
  }[];
}

export interface KeywordsResponse {
  popularKeywords: string[];
  recommendedKeywords: string[];
}

const recommendApi = {
  getRecommendedPlaces: (keyword: string, userId?: string) => 
    axiosInstance.get<ApiResponse<PlaceResponse[]>>(`/recommendations/places?keyword=${keyword}${userId ? `&userId=${userId}` : ''}`),

  getMoreRecommendedPlaces: (keyword: string, offset: number = 0, limit: number = 5, userId?: string) => 
    axiosInstance.get<ApiResponse<PlaceResponse[]>>(`/recommendations/places/more?keyword=${keyword}&offset=${offset}&limit=${limit}${userId ? `&userId=${userId}` : ''}`),

  getPlaceDetail: (placeId: string) => 
    axiosInstance.get<ApiResponse<PlaceDetailResponse>>(`/recommendations/places/${placeId}`),

  getRecommendations: (userId: string) => 
    axiosInstance.get<ApiResponse<PlaceResponse[]>>(`/recommendations?userId=${userId}`),
    
  getKeywords: () => 
    axiosInstance.get<ApiResponse<KeywordsResponse>>(`/recommendations/keywords`)
};

export default recommendApi;