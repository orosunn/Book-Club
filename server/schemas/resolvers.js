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

// Later add get some info from books and add it here.

        me: async (parent, args, context) => {
            if (context.user) { 
                const userData = await User.findOne({ _id: context.user._id }) 
          return userData 
            }
            throw AuthenticationError;
 
        }
        },
        getPosts: async (parent, args, context) => {
            try {
                const posts = await Post.find().sort({ createdAt: -1 }); 
                return posts;
            } catch (error) {
                console.error('Error retrieving posts:', error);
                throw error;
            }
        },
        


    },

        // me: async (parent, args, context) => {
        //     if (context.user) { 
        //         const userData = await User.findOne({ _id: context.user._id }) 
        //   return userData 
        //     }
        //     throw AuthenticationError;



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
                throw new AuthenticationError('Log in');
            }
        },

        removePost: async (_, { postId }) => {
            try {
              const removePost = await Post.findByIdAndRemove(postId);
              return removePost;
            } catch (error) {
              throw new Error('Failed to remove post');
            }
          },


          addComment: async (_, { postId, text, author }, context) => {
            try {
                console.log(postId, text, author);
              const post = await Post.findById(postId);
              if (!post) {
                throw new Error('Post not found');
              }
          
              const newComment = { text, author };
              console.log("1", post.comments)
              post.comments.push({ text, author });
              console.log("1")
          
              await post.save();
              console.log("1")
          
              return post;
            } catch (error) {
                console.log(error)
              throw new Error(error.message);
            }
          },


        //create logic to increment the upvote and downvote update the book to add the users id to it. (this will need to use context)
        upVote: async (_, args, context) => {
            console.log(context.user._id, "Flag this error")
            if (context.user) {
                const updatedBook = await Book.findOneAndUpdate(
                    { _id: args._id },
                    { 
                        $addToSet: { users: context.user._id },
                        $inc: { likes: 1 },
                    },
                    
                    { new: true } 

                )
                return updatedBook;
            }
            throw AuthenticationError;

        }
}
};



module.exports = resolvers;