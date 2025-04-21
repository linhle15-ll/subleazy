import { Schema, model } from 'mongoose';

const postSchema = new Schema(
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
        enum: ['house', 'apartment'],
        required: true,
      },
      placeType: {
        type: String,
        enum: ['entire', 'private', 'shared'],
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
        enum: ['me', 'family', 'guests', 'roommates'],
      },
    ],
    amenities: {
      wifi: Boolean,
      kitchen: Boolean,
      laundry: Boolean,
      parking: Boolean,
      airConditioner: Boolean,
    },
    convenience: {
      publicTransport: Boolean,
      supermarket: Boolean,
      disabilityFriendly: Boolean,
    },
    price: {
      type: Number,
      required: true,
    },
    rules: {
      guest: Boolean,
      party: Boolean,
      loudMusic: Boolean,
      quietHours: {
        from: String,
        to: String,
      },
      smoking: Boolean,
      alcohol: Boolean,
      drug: Boolean,
      pet: Boolean,
      children: Boolean,
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
      checkinTime: {
        type: String,
        required: true,
      },
      checkoutTime: {
        type: String,
        required: true,
      },
    },
    status: {
      type: String,
      enum: ['active', 'pending', 'closed'], // Should this be active, closed, (and expired)?
      default: 'active',
    },
  },
  { timestamps: true },
);

// Map display is optional => search by post first
postSchema.index({ city: 1, state: 1 });
postSchema.index({ zip: 1 });

export default model('Post', postSchema);
