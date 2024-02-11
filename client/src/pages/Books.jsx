import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_BOOKS } from '../utils/queries';

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
      <img className="book-image" src={book.imageUrl} alt={book.title} />

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

  const {loading, data} =  useQuery(GET_BOOKS);

  const bookData =  data?.getBooks || []

  console.log(bookData);



  const handleVote = (bookId, newVotes) => {
    // Implement logic to handle voting for the specific book
    console.log(`Voted on book with ID ${bookId}. New vote count: ${newVotes}`);
  };

  return (
    <div className="books-page">
      <div className="ui four cards">
        {bookData?.map((book) => (
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
