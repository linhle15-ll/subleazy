import { create } from 'zustand';

export interface TextSearchPlace {
  displayName?: string;
  lat: number;
  lng: number;
  googleMapsUri: string;
  photo?: string;
  query: string;
}

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
  places: TextSearchPlace[];
  colorPool: string[];
  colorMap: { [key: string]: string };
  setCenter: (center: { lat: number; lng: number }) => void;
  setPrice: (price: boolean) => void;
  setQueries: (
    queries: {
      query: string;
      selected: boolean;
    }[]
  ) => void;
  setPlaces: (places: TextSearchPlace[]) => void;
  getColor: (query: string) => string;
  releaseColor: (query: string) => void;
}

export const useSortStore = create<SortStore>((set, get) => ({
  center: {},
  queries: [],
  places: [],
  price: false,
  colorPool: ['red', 'blue', 'green', 'yellow', 'purple'],
  colorMap: {},
  setCenter: (center: { lat: number; lng: number }) => set({ center }),
  setPrice: (price: boolean) => set({ price }),
  setQueries: (
    queries: {
      query: string;
      selected: boolean;
    }[]
  ) => set({ queries }),
  setPlaces: (places: TextSearchPlace[]) => set({ places }),
  getColor: (query: string) => {
    const { colorMap, colorPool } = get();

    if (colorMap[query]) return colorMap[query];

    const color = colorPool[0];

    set({
      colorMap: {
        ...colorMap,
        [query]: color,
      },
      colorPool: colorPool.slice(1),
    });

    return color;
  },
  releaseColor: (query: string) => {
    const { colorMap, colorPool } = get();

    const color = colorMap[query];
    if (!color) return;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { [query]: _, ...remainingMap } = colorMap;

    set({
      colorMap: remainingMap,
      colorPool: [...colorPool, color],
    });
  },
}));
