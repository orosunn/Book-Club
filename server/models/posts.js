const { Schema, model } = require('mongoose');
const commentSchema =  require ('./comments')

// Schema to create post model
const postSchema = new Schema(
  {
    postText: {
      type: String,
      required: true,
      maxLength: 500,
      minLength: 1
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (date) => {
        if (date) return date.toISOString().split("T") [0];
      }
      },
    username: {
      type: String,
      required: true,
    },
    comments: [
      commentSchema
    ]
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

const Post = model('post', postSchema);

module.exports = Post;