const { Schema, model } = require('mongoose');

const groupSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
    },
    isDM: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

module.exports = model('Group', groupSchema);
