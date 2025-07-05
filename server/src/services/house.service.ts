import { ObjectId } from 'mongoose';
import houseModel from '../models/house.model';
import { House } from '../types/house.types';

const houseService = {
  getOrCreateHouse: async (data: House) => {
    const house = await houseModel.findOneAndUpdate(
      { address: data.address, zip: data.zip },
      { $setOnInsert: data },
      { upsert: true, new: true }
    );
    return house;
  },

  updateHouse: async (houseId: string | ObjectId, data: Partial<House>) => {
    const house = await houseModel.findByIdAndUpdate(houseId, data, {
      new: true,
    });
    return house;
  },

  fetchNearbyPlaces: async (
    lat: number,
    long: number,
    isSupermarket: boolean
  ) => {
    const requestOptions = isSupermarket
      ? {
          includedTypes: ['supermarket', 'grocery_store'],
          rankPreference: 'POPULARITY',
          excludedPrimaryTypes: ['restaurant'],
        }
      : {
          includedTypes: ['bus_station', 'subway_station'],
          rankPreference: 'DISTANCE',
        };

    const res = await fetch(
      'https://places.googleapis.com/v1/places:searchNearby',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Goog-Api-Key': process.env.GOOGLE_MAPS_API_KEY as string,
          'X-Goog-FieldMask':
            'places.shortFormattedAddress,places.displayName,places.location,places.googleMapsUri',
        },
        body: JSON.stringify({
          locationRestriction: {
            circle: {
              center: {
                latitude: lat,
                longitude: long,
              },
              radius: 8000, // 8000 m = 5 miles
            },
          },
          regionCode: 'us',
          ...requestOptions,
        }),
      }
    );

    const data = await res.json();
    return data.places;
  },
};

export default houseService;
