const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
  {
    type: {
      type: String,
    },
    firstNname: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      require: true,
      trim: true,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model('User', UserSchema);
