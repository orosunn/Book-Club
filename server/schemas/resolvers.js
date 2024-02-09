// find for books(just for voting)(query), user query(for posts), query for posts, query for comments
//mutations: add user, login, add post, remove post, add comment, remove comments, create vote (see MERN mini-project) 

const { Book, Post, User} = require('../models');
const { AuthenticationError, signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        getBooks: async () => {
    
            return Book.find()
        },
        //I want to check for if a user logged in
        getUser: async (parent, args, context) => {
            if (context.user) {
              return User.findOne({ _id: context.user._id });
            }
            throw AuthenticationError;
          },
        getPost: async () => {
         
            return await Post.find({}).populate('user');
        },
        getComment: async () => {
            return await Comment.find ({}).populate('post');
        } 
    },
    Mutation: {
        addUser: async (_, { username, email, password }, context) => {
            try {
                const authResult = await User.create({username, email, password})
                const token = signToken(authResult)
                return { user: authResult, token }
            } catch (error) {
                throw new Error(error.message);
            }
        },
    }
};


module.exports = resolvers;