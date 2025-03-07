// src/api/recommendApi.ts
import axiosInstance from './axiosInstance';

export interface PlaceListResponse {
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
}

export interface RecommendationResponse {
  placeId: string;
  name: string;
  category: string;
  preferenceType: string;
  matchingPercentage: number;
}

export interface PopularKeywordResponse {
  popularKeywords: string[];
  recommendedKeywords: string[];
}

const recommendApi = {
  getRecommendedPlaces: (keyword: string, userId?: string) => 
    axiosInstance.get<PlaceListResponse[]>(`/recommendations/places?keyword=${keyword}${userId ? `&userId=${userId}` : ''}`),

  getMoreRecommendedPlaces: (keyword: string, offset: number, limit: number, userId?: string) => 
    axiosInstance.get<PlaceListResponse[]>(`/recommendations/places/more?keyword=${keyword}&offset=${offset}&limit=${limit}${userId ? `&userId=${userId}` : ''}`),

  getPlaceDetail: (placeId: string) => 
    axiosInstance.get<PlaceDetailResponse>(`/recommendations/places/${placeId}`),

  getRecommendationPage: (userId: string) => 
    axiosInstance.get<RecommendationResponse[]>(`/recommendations?userId=${userId}`),
    
  getKeywords: () =>
    axiosInstance.get<PopularKeywordResponse>('/recommendations/keywords')
};

export default recommendApi;