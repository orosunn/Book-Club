const axios = require('axios');
const { Book } = require('../models'); // Import your Mongoose Book model
require('dotenv').config()
const apiKey = process.env.API_KEY;
console.log(apiKey);
// Function to fetch book data from Google Books API
// async function fetchBooksFromAPI(query) {
//   try {
//     const response = await axios.get('https://www.googleapis.com/books/v1/volumes', {
//       params: {
//         q: query, // Your search query
//         maxResults: 20, // Number of results to retrieve (adjust as needed)
//         key: apiKey 
//       }
//     });
//     return response.data.items; // Return an array of book items
//   } catch (error) {
//     console.error('Error fetching books from Google Books API:', error);
//     return [];
//   }
// }



// Function to seed database with books from API
async function seedDatabase() {
  const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=''&maxResults=10&key=${apiKey}`)
  console.log("HERE", response.data.items[1])
               
  // const query = 'programming'; // Example query
  // const books = await fetchBooksFromAPI(query);

  // Insert books into the database
  try {
    for (const bookData of books) {
      const book = new Book({
        title: bookData.volumeInfo.title,
        author: bookData.volumeInfo.authors ? bookData.volumeInfo.authors.join(', ') : 'Unknown',
        imageUrl: bookData.volumeInfo.imageLinks.thumbnail || '(link to no image found)',
        description: bookData.volumeInfo.description || 'No description available'
      });
      await book.save();
      console.log('Book seeded:', book.title);
    }
    console.log('Database seeding completed.');
  } catch (error) {
    console.error('Error seeding database:', error);
  }
}

// Call the seedDatabase function to start seeding
seedDatabase();