import houseModel from '../models/houseModel';
import { House } from '../types/houseType';

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
