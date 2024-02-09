import React, { useState, useEffect } from 'react';

const Book = ({ book, onVote }) => {
  const [votes, setVotes] = useState(0);

  useEffect(() => {
    // Update the vote count when the book data changes
    setVotes(book.voteCount || 0);
  }, [book]);

  const handleVote = (increment) => {
    // Update the vote count and call the onVote function with the increment
    const newVotes = votes + increment;
    setVotes(newVotes);
    onVote(book.id, newVotes);
  };

  return (
    
      <div>
        <img className="book-image" src={book.volumeInfo.imageLinks.thumbnail} alt={book.volumeInfo.title} />
      
      <div className="extra">
        <div>Rating: {votes}</div>
        <button className="btn btn-success" onClick={() => handleVote(1)}>
          Upvote
        </button>
        <button className="btn btn-danger" onClick={() => handleVote(-1)}>
          Downvote
        </button>
      </div>
      </div>
  );
};

export default function Books() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    async function fetchBooksFromAPI() {
      try {
        const bookApi = await fetch(`/apiKey`);
        const bookData = await bookApi.json();
        const apiKey = bookData.key;
        const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=''&maxResults=20&key=${apiKey}`);
        const data = await response.json();
        setBooks(data.items);
      } catch (error) {
        console.error('Error fetching books from Google Books API:', error);
      }
    }
    fetchBooksFromAPI();
  }, []);

  const handleVote = (bookId, newVotes) => {
    // Implement logic to handle voting for the specific book
    console.log(`Voted on book with ID ${bookId}. New vote count: ${newVotes}`);
  };

  return (
    <div className="books-page">
      <div className="ui four cards">
        {books.map((book) => (
          <Book
            key={book.id}
            book={book}
            onVote={handleVote}
          />
        ))}
      </div>
    </div>
  );
}
