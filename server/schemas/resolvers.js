// find for books(just for voting)(query), user query(for posts), query for posts, query for comments
//mutations: add user, login, add post, remove post, add comment, remove comments, (edit) create vote (see MERN mini-project) 

const { Book, Post, User } = require('../models');
const { AuthenticationError, signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        getBooks: async (parent, args, context) => {
            const books = await Book.find();
            return books;
        },
        book: async (parent, args) => {
            const book = await Book.findOne({_id:args._id})
            return book;
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
        // comment: async () => {
        //     const params = _id ? { _id } : {};
        //     return Comment.find (params);
        // } <- comment model not built yet, leave commented out for now
// Later add get some info from books and add it here.
        me: async (parent, args, context) => {
            if (context.user) { 
                const userData = await User.findOne({ _id: context.user._id }) 
          return userData 
            }
            throw AuthenticationError;
 
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
        //create logic to increment the upvote and downvote update the book to add the users id to it. (this will need to use context)
        upVote: async (_, args, context) => {
            console.log(context.user._id, "Flag this error")
            if (context.user) {
                const updatedBook = await Book.findOneAndUpdate(
                    { _id: args._id },
                    { $addToSet: { users: context.user._id }},
                    { new: true } 
                

                )
                return updatedBook;
            }
            throw AuthenticationError;

        }
    }
};


module.exports = resolvers;