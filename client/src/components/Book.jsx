import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { UPVOTE } from '../utils/mutations';
import { QUERY_ME } from '../utils/queries';
import AuthService from '../utils/auth';

const Book = ({ book, onVote }) => {
  console.log(book)
  const [votes, setVotes] = useState(book.likes || 0);
  const [buttonClicked, setButtonClicked] = useState(false);

  const [upVote, { data, error }] = useMutation(UPVOTE);
  const { loading, userData, userError } = useQuery(QUERY_ME);

  if (loading) return <p>Loading...</p>;
  if (userError) return <p>Error: {error.message}</p>;

  const handleVote = async () => {
    try {
      if (!AuthService.loggedIn()) {
        // User is not logged in, prompt them to log in. 
        // This could be a modal, redirect, or any other method you prefer.
        alert("Please log in to vote."); // Simple alert for demonstration; consider using a more user-friendly approach.
      } else if (!buttonClicked) {
        // User is logged in and button has not yet been clicked, proceed with voting.
        setButtonClicked(true);
        setVotes(votes + 1);
        await upVote({
          variables: { id: book._id }
        });
      }
    } catch (error) {
      console.error(error);
    }
  };
  

  return (
    <div className="book-card">
      <img className="book-image" src={book.imageUrl} alt={book.title} />
      <div className="extra vote-btns">
        <div>Likes: {votes}</div>
        <button className="btn like-btn" onClick={() => handleVote()} disabled={buttonClicked}>
          {buttonClicked ? "Liked" : "Like"}
        </button>
      </div>
    </div>
  );
};

export default Book;