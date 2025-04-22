const { Schema, model } = require('mongoose');

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
        enum: ['me', 'family', 'guests', 'roommates']
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
      guest: {
        type: Boolean,
        default: false,
      },
      party: {
        type: Boolean,
        default: false,
      },
      loudMusic: {
        type: Boolean,
        default: false,
      },
      quietHours: {
        from: String,
        to: String,
      },
      smoking: {
        type: Boolean,
        default: false,
      },
      alcohol: {
        type: Boolean,
        default: false,
      },
      drug: {
        type: Boolean,
        default: false,
      },
      pet: {
        type: Boolean,
        default: false,
      },
      children: {
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
      enum: ['active', 'pending', 'closed'], // Should this be active, closed, (and expired)?
      default: 'active',
    },
  },
  { timestamps: true },
);

// Map display is optional => search by post first
postSchema.index({ createdAt: -1 });
postSchema.index({ city: 1, state: 1 });
postSchema.index({ zip: 1 });

module.exports = model('Post', postSchema);
