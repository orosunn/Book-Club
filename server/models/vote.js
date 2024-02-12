const { Schema, model } = require('mongoose');

const voteSchema = new Schema({
 
  upvote: {
    type: Number,
    default: 0,
  },
  downvote: {
    type: Number,
    default: 0,
  },
  rating: {
    type: Number,
    defualt: 0,
  },
});

const Vote = model('Vote', voteSchema);

module.exports = Vote;