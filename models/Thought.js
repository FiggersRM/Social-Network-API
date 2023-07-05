const { Schema, model } = require("mongoose");
const reactionSchema = require('./Reaction');
const dayjs = require("dayjs");

const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: formatDate,
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    }
  }
);

function formatDate(date) {
  return dayjs(date).format("M/D/YYYY");
};

thoughtSchema
.virtuals('reactionCount')
.get(function () {
    return this.reactions.length;
});

const Thought = model('thought', thoughtSchema);

module.exports = Thought;