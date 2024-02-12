// find for books(just for voting)(query), user query(for posts), query for posts, query for comments
//mutations: add user, login, add post, remove post, add comment, remove comments, (edit) create vote (see MERN mini-project) 

const { Book, Post, User } = require('../models');
const { AuthenticationError, signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        getBooks: async (parent, args) => {
            const books = await Book.find();
            return books;
        },
        //I want to check for if a user logged in
        getUser: async (parent, args, context) => {
            if (context.user) {
                return User.findOne({ _id: context.user._id });
            }
            throw AuthenticationError;
        },
        getPost: async (parent, { postId }, context) => {
            try {
                const post = await Post.findById(postId);
                
                if (!post) {
                    throw new Error('Post not found');
                }

                return post;
            } catch (error) {
                console.error('Error retrieving post:', error);
                throw error;
            }
        // comment: async () => {
        //     const params = _id ? { _id } : {};
        //     return Comment.find (params);
        // } <- comment model not built yet, leave commented out for now
        }
    },


    Mutation: {
        addUser: async (_, { username, email, password }) => {
            try {
                const authResult = await User.create({ username, email, password })
                const token = signToken(authResult)
                return { user: authResult, token }
            } catch (error) {
                throw new Error(error.message);
            }
        },
        // create login mutation

        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });
      
            if (!user) {
              throw AuthenticationError;
            }
      
            const correctPw = await user.isCorrectPassword(password);
      
            if (!correctPw) {
              throw AuthenticationError;
            }
      
            const token = signToken(user);
      
            return { token, user };
          },


        addPost: async (_, { postText, createdAt, username }, context) => {
            // Optional: Check if the user is authenticated
            // if (!context.user) {
            //     throw new AuthenticationError('You must be logged in to do this');
            // }

            try {
                const newPost = await Post.create({ postText, createdAt, username });
                await newPost.populate('username');
                console.log(newPost);
                return newPost;
            } catch (error) {
                throw new Error(error.message);
            }
        },

        removePost: async (_, { postId }) => {
            try {
              const removePost = await Post.findByIdAndRemove(postId);
              return removePost;
            } catch (error) {
              throw new Error('Failed to remove post');
            }
          }
        //create logic to increment the upvote and downvote update the book to add the users id to it. (this will need to use context)
    }

};


module.exports = resolvers;