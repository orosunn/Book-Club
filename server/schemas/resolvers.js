// find for books(just for voting)(query), user query(for posts), query for posts, query for comments
//mutations: add user, login, add post, remove post, add comment, remove comments, create vote (see MERN mini-project) 
const { Book, Post, User} = require('../models')
const resolvers = {
    Query: {
        book: async () => {
            const params = _id ? { _id } : {};
            return Book.find (params, {title, author, imageUrl})
        },
        user: async ({_id}) => {
            const params = _id ? { _id } : {};
            return User.find (params);
        },
        post: async ({}) => {
            const params = _id ? { _id } : {};
            return Post.find (params);
        },
        // comment: async () => {
        //     const params = _id ? { _id } : {};
        //     return Comment.find (params);
        // } <- comment model not built yet, leave commented out for now
    },
    Mutation: {
        addUser: async (_, { username, email, password }, context) => {
            try {
                const authResult = await addUser(username, email, password)
                return authResult
            } catch (error) {
                throw new Error(error.message);
            }
        },
    }
};


module.exports = resolvers;