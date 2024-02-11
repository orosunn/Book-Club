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

  export default Book;