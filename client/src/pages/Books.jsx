import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_BOOKS } from '../utils/queries';
import Book from '../components/Book';


export default function Books() {

  const {loading, data} =  useQuery(GET_BOOKS);
  const bookData =  data?.getBooks || []

  const handleVote = (bookId, newVotes) => {
    // Implement logic to handle voting for the specific book
    console.log(`Voted on book with ID ${bookId}. New vote count: ${newVotes}`);
  };

  return (
    <div className="books-page">
      <div className="ui four cards book-cards">
        {bookData?.map((book) => (
          <Book
            key={book._id}
            book={book}
            onVote={handleVote}
          />
        ))}
      </div>
    </div>
  );
}
