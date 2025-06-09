import { create } from 'zustand';

interface SortStore {
  center: {
    lat?: number;
    lng?: number;
  };
  price: boolean;
  queries: {
    query: string;
    selected: boolean;
  }[];
  places: {
    displayName?: string;
    lat: number;
    lng: number;
    googleMapsUri: string;
    photo?: string;
    query: string;
  }[];
  setCenter: (center: { lat: number; lng: number }) => void;
  setPrice: (price: boolean) => void;
  setQueries: (
    queries: {
      query: string;
      selected: boolean;
    }[]
  ) => void;
  setPlaces: (
    places: {
      displayName?: string;
      lat: number;
      lng: number;
      googleMapsUri: string;
      photo?: string;
      query: string;
    }[]
  ) => void;
}

export const useSortStore = create<SortStore>((set) => ({
  center: {},
  queries: [],
  places: [],
  price: false,
  setCenter: (center: { lat: number; lng: number }) => set({ center }),
  setPrice: (price: boolean) => set({ price }),
  setQueries: (
    queries: {
      query: string;
      selected: boolean;
    }[]
  ) => set({ queries }),
  setPlaces: (
    places: {
      displayName?: string;
      lat: number;
      lng: number;
      googleMapsUri: string;
      photo?: string;
      query: string;
    }[]
  ) => set({ places }),
}));
