import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
// import { useParams, Link } from 'react-router-dom';
// import { CREATE_VOTE } from '../utils/mutations';
import { UPVOTE } from '../utils/mutations';
// import { QUERY_MATCHUPS } from '../utils/queries';
import { QUERY_ME } from '../utils/queries';

const Book = ({ book, onVote }) => {
    const [votes, setVotes] = useState(0);
  //This is importing the mutation upvote
 const [ upvote, { data, error } ] = useMutation(UPVOTE);  
 //Checking if user is logged in
 const { loading, userData, userError } = useQuery(QUERY_ME);
 if (loading) return <p>Loading...</p>;
 if (userError) return <p>Error: {error.message}</p>;

 const handleVote =  async () => {
  try { 
    console.log(book._id)
    await upvote ({
      //passing the prop into the function, so that we can use it on onClick
      variables: { id:book._id}
    })

    window.location.reload();
  }
  catch (error) { 
    console.error(error)

  }
 }
    // useEffect(() => {
    //   // Update the vote count when the book data changes
    //   setVotes(book.voteCount || 0);
    // }, [book]);
  
    // const handleVote = (increment) => {
    //   // Update the vote count and call the onVote function with the increment
    //   const newVotes = votes + increment;
    //   setVotes(newVotes);
    //   onVote(book.id, newVotes);
    // };
  
    return (
  
      <div>
        <img className="book-image" src={book.imageUrl} alt={book.title} />
  
        <div className="extra">
          <div>Rating: {votes}</div>
          <button className="btn btn-success" onClick={() => handleVote()}>
            Upvote
          </button>
          {/* <button className="btn btn-success" onClick={() => handleVote(1)}>
            Upvote
          </button>
          <button className="btn btn-danger" onClick={() => handleVote(-1)}>
            Downvote
          </button> */}
        </div>
      </div>
    );
  };

  export default Book;