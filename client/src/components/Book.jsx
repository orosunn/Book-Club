import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { UPVOTE } from '../utils/mutations';
import { QUERY_ME } from '../utils/queries';
import AuthService from '../utils/auth';

const Book = ({ book, onVote }) => {
  console.log(book)
    const [votes, setVotes] = useState(book.likes || 0);
  //This is importing the mutation upvote
 const [ upvote, { data, error } ] = useMutation(UPVOTE);  
 //Checking if user is logged in
 const { loading, userData, userError } = useQuery(QUERY_ME);
 if (loading) return <p>Loading...</p>;
 if (userError) return <p>Error: {error.message}</p>;

 // add logic so each user can only vote once - useState, start as true and if it's false put a disable attribute or unlike button
 const handleVote =  async () => {
  try { 
    console.log(book._id)

    if (AuthService.loggedIn()) {
      setVotes(votes+1)
      await upvote ({
        //passing the prop into the function, so that we can use it on onClick
        variables: { id:book._id}
      })
    }

   
  }
  catch (error) { 
    console.error(error)

  }
 }
 
    return (
  
      <div>
        <img className="book-image" src={book.imageUrl} alt={book.title} />
        <div className="extra vote-btns">
          <div>Likes: {votes}</div>
          <button className="btn btn-success" onClick={() => handleVote()}>
            Like
          </button>
        </div>
      </div>
    );
  };

  export default Book;