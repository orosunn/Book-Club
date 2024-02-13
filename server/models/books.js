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


// bookSchema.virtual('upvoteCount')
//     .get(function () {
//         return this.upVote.length;
//     })

const Book = model('Book', bookSchema);

module.exports = Book;

// const axios = require('axios');

//add to model to include an ability to download open source books for offline reading (PWA)


//basis for how to use google books api to popualte this model:
// async function fetchBookDataFromGoogleBooks(title, author) {
//   try {
//     const response = await axios.get('https://www.googleapis.com/books/v1/volumes', {
//       params: {
//         q: `intitle:${title}+inauthor:${author}`,
//         key: 'YOUR_GOOGLE_BOOKS_API_KEY'
//       }
//     });

//     const booksData = response.data.items;

//     // Iterate over the books data and save to MongoDB
//     booksData.forEach(async (bookData) => {
//       const book = new Book({
//         title: bookData.volumeInfo.title,
//         author: bookData.volumeInfo.authors ? bookData.volumeInfo.authors.join(', ') : 'Unknown Author',
//         genre: bookData.volumeInfo.categories ? bookData.volumeInfo.categories.join(', ') : 'Unknown Genre',
//         description: bookData.volumeInfo.description || 'No description available',
//         publicationYear: bookData.volumeInfo.publishedDate ? new Date(bookData.volumeInfo.publishedDate).getFullYear() : 'Unknown',
//         pageCount: bookData.volumeInfo.pageCount || 0,
//         imageUrl: bookData.volumeInfo.imageLinks ? bookData.volumeInfo.imageLinks.thumbnail : ''
//       });

//       await book.save();
//       console.log(`Saved book: ${book.title}`);
//     });
//   } catch (error) {
//     console.error('Error fetching book data from Google Books API:', error);
//   }
// }

// // Example usage:
// fetchBookDataFromGoogleBooks('The Great Gatsby', 'F. Scott Fitzgerald');