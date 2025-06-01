// import { create } from 'zustand';
// import { persist } from 'zustand/middleware';

// export type FormState = {
//   // User info
//   user: {
//     firstName: string;
//     lastName: string;
//     email: string;
//     institution: string;
//     isVerified: boolean;
//     profileImage?: string;
//     bio?: string;
//   };
//   // Post fields
//   title: string;
//   description: string;
//   media: string[];
//   houseInfo: {
//     houseType: string;
//     placeType: string;
//   };
//   suites?: string;
//   address: string;
//   city: string;
//   state: string;
//   zip: string;
//   lat: number | null;
//   long: number | null;
//   bedroomInfo: {
//     maxGuests: number;
//     bedrooms: number;
//     beds: number;
//     lock: boolean;
//   };
//   bathroomInfo: {
//     privateAttached: number;
//     privateAccessible: number;
//     shared: number;
//   };
//   whoElse: string[];
//   amenities: Record<string, boolean>;
//   convenience: Record<string, boolean>;
//   price: number | null;
//   rules: {
//     guest: {
//       noGuest: boolean;
//       noOverNight: boolean;
//       noParty: boolean;
//       noMusic: boolean;
//       quietHours: { from: string; to: string };
//     };
//     lifestyle: {
//       noSmoking: boolean;
//       allowSmokingOutside: boolean;
//       noAlcohol: boolean;
//       noDrugs: boolean;
//     };
//     cleanliness: {
//       cleanShared: boolean;
//       takeOutTrash: boolean;
//       respectPrivacy: boolean;
//     };
//     pet: {
//       noPets: boolean;
//       approval: boolean;
//     };
//     utilities: {
//       fridgeOnly: boolean;
//       ecoShower: boolean;
//       ecoElectricity: boolean;
//       limitLaundry: boolean;
//     };
//     safety: {
//       reportIssues: boolean;
//       noTamper: boolean;
//       lockDoor: boolean;
//     };
//     move: {
//       returnKeys: boolean;
//       leaveOriginal: boolean;
//     };
//   };
//   availability: {
//     startDate: string;
//     endDate: string;
//     checkinTime: string;
//     checkoutTime: string;
//   };
//   status: string;
// };

// type FormActions = {
//   setField: <K extends keyof FormState>(key: K, value: FormState[K]) => void;
//   setPartial: (data: Partial<FormState>) => void;
//   resetForm: () => void;
// };

// const initialState: FormState = {
//   // User info
//   user: undefined,
//   // Post fields
//   title: '',
//   description: '',
//   media: [],
//   houseInfo: { houseType: '', placeType: '' },
//   suites: '',
//   city: '',
//   state: '',
//   zip: '',
//   lat: null,
//   long: null,
//   bedroomInfo: { maxGuests: 1, bedrooms: 1, beds: 1, lock: false },
//   bathroomInfo: { privateAttached: 1, privateAccessible: 0, shared: 0 },
//   whoElse: [],
//   amenities: {},
//   convenience: {},
//   price: null,
//   rules: {
//     noGuest: false,
//     noParty: false,
//     quietHours: { from: '', to: '' },
//     noSmoking: false,
//     noDrug: false,
//     noPet: false,
//   },
//   availability: {
//     startDate: '',
//     endDate: '',
//     checkinTime: '',
//     checkoutTime: '',
//   },
// };

// export const useFormStore = create<FormState & FormActions>()(
//   persist(
//     (set) => ({
//       ...initialState,
//       setField: (key, value) => set({ [key]: value } as any),
//       setPartial: (data) => set(data),
//       resetForm: () => set(initialState),
//     }),
//     {
//       name: 'subleazy-form', // localStorage key
//     }
//   )
// );
