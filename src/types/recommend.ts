// src/types/recommend.ts
export interface Place {
  placeId: string;
  name: string;
  description: string;
  imageUrl: string;
  category: PlaceCategory;
  activities: string[];
  details: PlaceDetails;
  matchingRate: number;
}

export interface PlaceDetails {
  address: string;
  bestVisitSeason: string;
  openingHours: string;
  admissionFee: string;
  contact: string;
  facilities: string[];
}

export type PlaceCategory = 
  | 'NATURE'
  | 'CULTURE'
  | 'HISTORY'
  | 'ACTIVITY'
  | 'FOOD'
  | 'SHOPPING';

export interface Weather {
  condition: string;
  temperature: number;
  humidity: number;
  windSpeed: number;
  precipitation: number;
}

export interface NearbyPlace {
  placeId: string;
  name: string;
  description: string;
  distance: number;
  category: PlaceCategory;
}