import postModel from '../models/post.model';
import { CustomQuery } from '../types/common.types';
import { PostStatus } from '../types/enums';
import { PostRequestBody } from '../types/post.types';
import { Types } from 'mongoose';

const postService = {
  createPost: async (data: PostRequestBody) => {
    const post = await postModel.create(data);
    return post;
  },

  searchPosts: async (data: Partial<PostRequestBody>) => {
    const query: CustomQuery = {};

    // Location filter
    if (data.zip) {
      query['zip'] = data.zip;
    } else if (data.state) {
      query['state'] = data.state;
      if (data.city) query['city'] = data.city;
    } else if (data.lat && data.long) {
      // 0.1 degree = 11.1 km
      query['lat'] = { $gte: data.lat - 0.1, $lte: data.lat + 0.1 };
      query['long'] = { $gte: data.long - 0.1, $lte: data.long + 0.1 };
    }

    // Price filter
    if (data.minPrice && data.maxPrice)
      query['price'] = { $gte: data.minPrice, $lte: data.maxPrice };
    else if (data.minPrice) query['price'] = { $gte: data.minPrice };
    else if (data.maxPrice) query['price'] = { $lte: data.maxPrice };

    // Availability filter
    if (data.availability?.startDate)
      query['availability.startDate'] = { $lte: data.availability.startDate };
    if (data.availability?.endDate)
      query['availability.endDate'] = { $gte: data.availability.endDate };

    // Status filter
    query['status'] = PostStatus.ACTIVE;

    // House filter
    if (data.houseInfo?.houseType)
      query['houseInfo.houseType'] = data.houseInfo.houseType;
    if (data.houseInfo?.placeType)
      query['houseInfo.placeType'] = data.houseInfo.placeType;

    // Bedroom filter
    if (data.bedroomInfo?.maxGuests)
      query['bedroomInfo.maxGuests'] = { $gte: data.bedroomInfo.maxGuests };
    if (data.bedroomInfo?.bedrooms)
      query['bedroomInfo.bedrooms'] = { $gte: data.bedroomInfo.bedrooms };

    // Bathroom filter
    if (
      data.bathroomInfo?.privateAttached ||
      data.bathroomInfo?.privateAccessible
    )
      query.$expr = {
        $gte: [
          {
            $add: [
              '$bathroomInfo.privateAttached',
              '$bathroomInfo.privateAccessible',
            ],
          },
          1,
        ],
      };
    if (data.bathroomInfo?.shared)
      query['bathroomInfo.shared'] = { $gte: data.bathroomInfo.shared };

    // Amenities filter
    if (data.amenities?.wifi) query['amenities.wifi'] = data.amenities.wifi;
    if (data.amenities?.kitchen)
      query['amenities.kitchen'] = data.amenities.kitchen;
    if (data.amenities?.laundry)
      query['amenities.laundry'] = data.amenities.laundry;
    if (data.amenities?.parking)
      query['amenities.parking'] = data.amenities.parking;
    if (data.amenities?.airConditioning)
      query['amenities.airConditioning'] = data.amenities.airConditioning;

    // Convenience filter
    if (data.convenience?.publicTransport)
      query['convenience.publicTransport'] = data.convenience.publicTransport;
    if (data.convenience?.supermarket)
      query['convenience.supermarket'] = data.convenience.supermarket;
    if (data.convenience?.disabilityFriendly)
      query['convenience.disabilityFriendly'] =
        data.convenience.disabilityFriendly;

    // Rules filter
    if (data.rules?.noGuest !== undefined)
      query['rules.noGuest'] = data.rules.noGuest;
    if (data.rules?.noParty !== undefined)
      query['rules.noParty'] = data.rules.noParty;
    if (data.rules?.noSmoking !== undefined)
      query['rules.noSmoking'] = data.rules.noSmoking;
    if (data.rules?.noDrug !== undefined)
      query['rules.noDrug'] = data.rules.noDrug;
    if (data.rules?.noPet !== undefined)
      query['rules.noPet'] = data.rules.noPet;

    const posts = await postModel.find(query);
    return posts;
  },

  getPostsByUserId: async (userId: Types.ObjectId) => {
    if (!userId) {
      throw new Error('User ID is required');
    }

    const posts = await postModel.find({ author: userId }).sort({ date: -1 });
    return posts;
  },
};

export default postService;
