const { Schema, Types } = require("mongoose");
const dayjs = require("dayjs");

const reactionSchema = new Schema({
  reactionId: {
    type: Schema.Types.ObjectId,
    default: () => new Types.ObjectId(),
  },
  reactionBody: {
    type: String,
    required: true,
    maxlength: 280
  },
  username: {
    type: String,
    required: true,
    ref: 'user'
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: formatDate,
  }
},
{
    toJSON: {
      getters: true,
    },
    id: false
}
);

function formatDate(date) {
    return dayjs(date).format("M/D/YYYY h:m:s A");
};

module.exports = reactionSchema;