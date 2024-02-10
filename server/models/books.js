const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema(
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
        // get tutor help add a field, an array of userId. the field will be votes, and the array will be referencing the user. when a user upvotes or downvotes the book. get help setting up resolver to handle upvote or downvote. find the book in the database. check to see if userId is inside the votes array. 
    }, { timestamps: true }
);

const Book = mongoose.model('Book', bookSchema);

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