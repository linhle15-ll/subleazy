const { Schema, model } = require('mongoose');

const messageSchema = new Schema(
  {
    content: {
      type: String,
      trim: true,
      required: true,
    },
    sender: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    group: {
      type: Schema.Types.ObjectId,
      ref: 'Group',
      required: true,
    },
  },
  { timestamps: true },
);

messageSchema.index({ group: 1, createdAt: -1 });

module.exports = model('Message', messageSchema);
