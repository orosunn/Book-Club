import React, { useState, useEffect } from 'react';
// import { useQuery, useMutation } from '@apollo/client';
// import { useParams, Link } from 'react-router-dom';
// import { CREATE_VOTE } from '../utils/mutations';
// import { QUERY_MATCHUPS } from '../utils/queries';

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
  
        <div className="extra vote-btns">
          <div>Rating: {votes}</div>
          <button className="btn btn-success vote-btn" onClick={() => handleVote(1)}>
            Like
          </button>
          <button className="btn btn-danger vote-btn" onClick={() => handleVote(-1)}>
            Dislike
          </button>
        </div>
      </div>
    );
  };

  export default Book;