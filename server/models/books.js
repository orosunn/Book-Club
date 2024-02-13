const { Schema, model } = require('mongoose');

const bookSchema = new Schema(
    {
        title: {
            type: String,
            required: true
        },
        author: {
            type: String,
            required: true
        },
        genre: {
            type: String,
            required: true
        },
        imageUrl: {
            type: String
        },
        users: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ],
        likes: 
        {
            type: Schema.Types.Number,
            default: 0
        }
    
    },
    {
        toJSON: {
            virtuals: true
        },
        // id: false
    }
);

//When the user click the upvote they are added to the array
bookSchema.virtual('upvoteCount')
    .get(function () {
        return this.users.length;
    })



const Book = model('Book', bookSchema);

module.exports = Book;
