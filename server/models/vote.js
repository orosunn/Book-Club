const { Schema, model } = require('mongoose');

const voteSchema = new Schema({
    book_id: [
        {
          type: Schema.Types.ObjectId,
          ref: 'Book',
        },
    ],
    user_id: [
        {
          type: Schema.Types.ObjectId,
          ref: 'User',
        },
    ],

});

const Vote = model('Vote', voteSchema);

module.exports = Vote;