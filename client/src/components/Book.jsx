import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { UPVOTE } from '../utils/mutations';
import { QUERY_ME } from '../utils/queries';
import AuthService from '../utils/auth';

const Book = ({ book, onVote }) => {
  console.log(book)

    const [votes, setVotes] = useState(book.likes || 0);
  //This is importing the mutation upvote
 const [ upVote, { data, error } ] = useMutation(UPVOTE);  
 //Checking if user is logged in
 const { loading, userData, userError } = useQuery(QUERY_ME);
 const [isButtonDisabled, setIsButtonDisabled] = useState(
  localStorage.getItem('buttonDisabled') === 'true'
);

useEffect(() => {
  // Update localStorage when isButtonDisabled changes
  localStorage.setItem('buttonDisabled', isButtonDisabled);
}, [isButtonDisabled]);

const handleClick = () => {
  console.log('Button clicked!');
  setIsButtonDisabled(true); // This will also update localStorage
};

 if (loading) return <p>Loading...</p>;
 if (userError) return <p>Error: {error.message}</p>;

 // add logic so each user can only vote once - useState, start as true and if it's false put a disable attribute or unlike button
 const handleVote =  async () => {
  try { 
    console.log(book._id)

    if (AuthService.loggedIn()) {
      setVotes(votes+1)
      await upVote ({
        //passing the prop into the function, so that we can use it on onClick
        variables: { id:book._id}
      })
    }
    if (!AuthService.loggedIn()) {
      alert("You need to be logged in to add a post. Please login or signup.");
      return;
    }
   

  const [votes, setVotes] = useState(book.likes || 0);
  const [buttonClicked, setButtonClicked] = useState(false);

  const [upVote, { data, error }] = useMutation(UPVOTE);
  const { loading, userData, userError } = useQuery(QUERY_ME);

  if (loading) return <p>Loading...</p>;
  if (userError) return <p>Error: {error.message}</p>;

  const handleVote = async () => {
    try {
      console.log(book._id)

      if (AuthService.loggedIn() && !buttonClicked) {
        setButtonClicked(true);
        setVotes(votes + 1)
        await upVote({
          //passing the prop into the function, so that we can use it on onClick
          variables: { id: book._id }
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
          <button className="btn btn-success" onClick={() =>{
         handleVote();
          handleClick()}}
          disabled={isButtonDisabled}>
            Like
          </button>
        </div>
      </div>
    );
  };

  export default Book;