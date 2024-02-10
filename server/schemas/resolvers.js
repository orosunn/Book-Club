// find for books(just for voting)(query), user query(for posts), query for posts, query for comments
//mutations: add user, login, add post, remove post, add comment, remove comments, (edit) create vote (see MERN mini-project) 

const { Book, Post, User } = require('../models');
const { AuthenticationError, signToken } = require('../utils/auth');

const resolvers = {
    Query: {
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
        // comment: async () => {
        //     const params = _id ? { _id } : {};
        //     return Comment.find (params);
        // } <- comment model not built yet, leave commented out for now
    },


    Mutation: {
        addUser: async (_, { username, email, password }, context) => {
            try {
                const authResult = await User.create({ username, email, password })
                const token = signToken(authResult)
                return { user: authResult, token }
            } catch (error) {
                throw new Error(error.message);
            }
        },

    addPost: async (_, {  postText, createdAt, username  }, context) => {
        // Optional: Check if the user is authenticated
        if (!context.user) {
            throw new AuthenticationError('You must be logged in to do this');
        }

        try {
            const newPost = await Post.create({ postText, createdAt, username });
            await newPost.populate('username'); 
console.log(newPost);
            return newPost;
        } catch (error) {
            throw new Error(error.message);
        }
    },
}

};


module.exports = resolvers;