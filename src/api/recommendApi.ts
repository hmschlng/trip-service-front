// src/api/recommendApi.ts
import axiosInstance from './axiosInstance';

export interface PlaceResponse {
  placeId: string;
  name: string;
  description: string;
  imageUrl: string;
  category: string;
  activities: string[];
  details: Record<string, string>;
  matchingRate: number;
}

export interface PlaceDetailResponse extends PlaceResponse {
  bestVisitSeason: string;
  currentWeather: {
    condition: string;
    temperature: number;
  };
  nearbyPlaces: {
    name: string;
    description: string;
    distance: number;
  }[];
}

const recommendApi = {
  getRecommendedPlaces: (keyword: string) => 
    axiosInstance.get<PlaceResponse[]>(`/api/recommendations/places?keyword=${keyword}`),

  getPlaceDetail: (placeId: string) => 
    axiosInstance.get<PlaceDetailResponse>(`/api/recommendations/places/${placeId}`),

  getRecommendations: (userId: string) => 
    axiosInstance.get<PlaceResponse[]>(`/api/recommendations?userId=${userId}`)
};

export default recommendApi;