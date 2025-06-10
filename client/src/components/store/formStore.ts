import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {
  HouseType,
  PlaceType,
  PostStatus,
  WhoElse,
} from '../../lib/types/enums';

export interface FormState {
  // Post fields
  title: string;
  description: string;
  media: string[];
  author: string;
  houseInfo: {
    houseType: HouseType;
    placeType: PlaceType;
  };
  suites?: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  lat: number | null;
  long: number | null;
  bedroomInfo: {
    maxGuests: number;
    bedrooms: number;
    beds: number;
    lock: boolean;
  };
  bathroomInfo: {
    privateAttached: number;
    privateAccessible: number;
    shared: number;
  };
  whoElse: WhoElse[];
  amenities: {
    wifi: boolean;
    kitchen: boolean;
    laundry: boolean;
    parking: boolean;
    airConditioning: boolean;
  };
  convenience: {
    publicTransport: boolean;
    supermarket: boolean;
    disabilityFriendly: boolean;
  };
  price: number | null;
  rules: {
    noGuest: boolean;
    noParty: boolean;
    quietHours: { from: string; to: string };
    noSmoking: boolean;
    noDrug: boolean;
    noPet: boolean;
  };
  availability: {
    startDate: string;
    endDate: string;
    checkinTime: string;
    checkoutTime: string;
  };
  status: PostStatus;
  formData: any; // This will store the complete form data for submission
}

interface FormActions {
  setField: (field: string, value: any) => void;
  setPartial: (data: Partial<FormState>) => void;
  resetForm: () => void;
}

const initialState: FormState = {
  // Post fields
  title: '',
  description: '',
  media: [
    'https://res.cloudinary.com/dutej4ftp/image/upload/v1749130160/room-03_ko20bi.jpg',
    'https://res.cloudinary.com/dutej4ftp/image/upload/v1749130160/room-05_g2eowf.jpg',
    'https://res.cloudinary.com/dutej4ftp/image/upload/v1749130160/room-01_g2c1an.jpg',
    'https://res.cloudinary.com/dutej4ftp/image/upload/v1749130159/room-02_izeeim.jpg',
    'https://res.cloudinary.com/dutej4ftp/image/upload/v1749130160/room-04_d9zrvb.jpg',
  ],
  author: '683f82b39d1e4e3e40851e66',
  houseInfo: {
    houseType: HouseType.HOUSE,
    placeType: PlaceType.ENTIRE,
  },
  suites: '',
  address: '',
  city: '',
  state: '',
  zip: '',
  lat: null,
  long: null,
  bedroomInfo: {
    maxGuests: 1,
    bedrooms: 1,
    beds: 1,
    lock: false,
  },
  bathroomInfo: {
    privateAttached: 0,
    privateAccessible: 0,
    shared: 0,
  },
  whoElse: [],
  amenities: {
    wifi: false,
    kitchen: false,
    laundry: false,
    parking: false,
    airConditioning: false,
  },
  convenience: {
    publicTransport: false,
    supermarket: false,
    disabilityFriendly: false,
  },
  price: null,
  rules: {
    noGuest: false,
    noParty: false,
    quietHours: { from: '', to: '' },
    noSmoking: false,
    noDrug: false,
    noPet: false,
  },
  availability: {
    startDate: '',
    endDate: '',
    checkinTime: '',
    checkoutTime: '',
  },
  status: PostStatus.PENDING,
  formData: {},
};

export const useFormStore = create<FormState & FormActions>()(
  persist(
    (set) => ({
      ...initialState,
      setField: (field: string, value: any) =>
        set((state) => ({
          ...state,
          [field]: value,
          formData: {
            ...state.formData,
            [field]: value,
          },
        })),
      setPartial: (data) => {
        set(() => {
          console.log('Setting partial data:', data);
          return { ...initialState, ...data };
        });
      },
      resetForm: () => {
        console.log('Resetting form to initial state');
        set(initialState);
      },
    }),
    {
      name: 'subleazy-form', // localStorage key
    }
  )
);
