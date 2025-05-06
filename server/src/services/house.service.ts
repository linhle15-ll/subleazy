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
};

export default houseService;
