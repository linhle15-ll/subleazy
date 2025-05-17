import { Schema, model } from 'mongoose';
import { HouseType, PlaceType, PostStatus, WhoElse } from '../types/enums';
import { Post } from '../types/post.types';

const postSchema = new Schema<Post>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    media: {
      type: [String],
      required: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    sublessees: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    house: {
      type: Schema.Types.ObjectId,
      ref: 'House',
      required: true,
    },
    houseInfo: {
      houseType: {
        type: String,
        enum: Object.values(HouseType),
        required: true,
      },
      placeType: {
        type: String,
        enum: Object.values(PlaceType),
        required: true,
      },
    },
    suites: {
      // Optional field for post-specific address
      type: String,
      trim: true,
    },

    // Denormalized duplicate fields with house for faster query
    city: {
      type: String,
      required: true,
      trim: true,
    },
    state: {
      type: String,
      required: true,
      trim: true,
    },
    zip: {
      type: String,
      required: true,
      trim: true,
    },
    lat: {
      type: Number,
      required: true,
    },
    long: {
      type: Number,
      required: true,
    },

    bedroomInfo: {
      maxGuests: {
        type: Number,
        required: true,
      },
      bedrooms: {
        type: Number,
        required: true,
      },
      beds: {
        type: Number,
        required: true,
      },
      lock: {
        type: Boolean,
        default: false,
      },
    },
    bathroomInfo: {
      privateAttached: {
        type: Number,
        required: true,
      },
      privateAccessible: {
        type: Number,
        required: true,
      },
      shared: {
        type: Number,
        required: true,
      },
    },
    whoElse: [
      {
        type: String,
        enum: Object.values(WhoElse),
      },
    ],
    amenities: {
      wifi: {
        type: Boolean,
        default: false,
      },
      kitchen: {
        type: Boolean,
        default: false,
      },
      laundry: {
        type: Boolean,
        default: false,
      },
      parking: {
        type: Boolean,
        default: false,
      },
      airConditioning: {
        type: Boolean,
        default: false,
      },
    },
    convenience: {
      publicTransport: {
        type: Boolean,
        default: false,
      },
      supermarket: {
        type: Boolean,
        default: false,
      },
      disabilityFriendly: {
        type: Boolean,
        default: false,
      },
    },
    price: {
      type: Number,
      required: true,
    },
    rules: {
      noGuest: {
        type: Boolean,
        default: false,
      },
      noParty: {
        type: Boolean,
        default: false,
      },
      quietHours: {
        from: String,
        to: String,
      },
      noSmoking: {
        type: Boolean,
        default: false,
      },
      noDrug: {
        type: Boolean,
        default: false,
      },
      noPet: {
        type: Boolean,
        default: false,
      },
    },
    availability: {
      startDate: {
        type: Date,
        required: true,
      },
      endDate: {
        type: Date,
        required: true,
      },
      checkinTime: String,
      checkoutTime: String,
    },
    status: {
      type: String,
      enum: Object.values(PostStatus),
      default: PostStatus.ACTIVE,
    },
  },
  { timestamps: true }
);

// Client always searches by posts
postSchema.index({ createdAt: -1 });
postSchema.index({ state: 1, city: 1 });
postSchema.index({ zip: 1 });

export default model<Post>('Post', postSchema);
