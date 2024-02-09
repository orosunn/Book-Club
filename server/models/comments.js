const { Schema, Types } = require('mongoose');

const commentSchema = new Schema(
    {
      commentId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
      },
      text: {
        type: String,
        required: true,
        maxLength: 500
      },
      author: {
        type: String,
        required: true,
      },
      date: {
          type: Date,
          default: Date.now,
          get: (date) => {
            if (date) return date.toISOString().split("T") [0];
          }
      }
    },
    {
      toJSON: {
        getters: true,
      },
    }
  );
  
  module.exports = commentSchema;