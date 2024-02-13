import React, { useState } from 'react';
import { GET_POST, GET_POSTS, } from '../utils/queries';
import { ADD_POST, REMOVE_POST } from '../utils/mutations';
import { useQuery, useMutation, gql } from '@apollo/client'
import Auth from '../utils/auth';


const Discussion = () => {
  const [removePost, { removePostData, removePostLoading, removePostError }] = useMutation(REMOVE_POST, {
    refetchQueries: [{ query: GET_POSTS }], // Optional: Refetch posts after deletion
    // Or use update to remove the post from the cache without refetching
  });
  

  const handlePost = async (e) => {
    e.preventDefault();
    if (!Auth.loggedIn()) {
      alert("You need to be logged in to add a post. Please login or signup.");
      return;
    }

    try {
      const username = Auth.getProfile().data.username; // Assuming this method returns the current user's profile
      await addPost({
        variables: {
          postText: text,
          username, // Add username to the variables
        },
      });
      setText(''); // Clear the textarea after posting

    } catch (error) {
      console.error('Error adding post:', error);
    }
  };


  const Comment = ({ postId, author, date, text }) => {

    const [showReplyBox, setShowReplyBox] = useState(false);
console.log(postId, "Comment postId!!")
    const toggleReplyBox = () => {
      setShowReplyBox(!showReplyBox);
    };

    return (
      <div className="comment comment-box">
        <div className="content">
          <a className="author">{author}</a>
          <div className="metadata">
            <span className="date">{date}</span>
          </div>
          <div className="text">{text}</div>
          <div className="actions">
            <a className="reply" onClick={toggleReplyBox}>Reply</a>
            <button type="button" className="remove" onClick={() => handleRemovePost(postId)}>Remove</button>

          </div>
          {showReplyBox && <ReplyBox />}
        </div>
      </div>
    );
  };

  const { loading, data } = useQuery(GET_POSTS);
  //useState for textvalue to add 
  const [text, setText] = useState('');
  const [addPost, { postData, postLoading, postError }] = useMutation(ADD_POST, {
    refetchQueries: [
      { query: GET_POSTS },
    ]
  });
  //handle Input Change function
  const handleInputChange = (e) => {
    if (!Auth.loggedIn()) {
      // show a login prompt
      alert("You need to be logged in to add a post. Please login or signup.");
      return; // Prevent further execution if not logged in
    }

    const { name, value } = e.target;
    setText(e.target.value);
  };

  const handleRemovePost = async (postId) => {
    console.log('Removing post with ID:', postId);
    try {
      await removePost({
        variables: {postId: postId },
      });
      // Optional: Show a success message or handle the UI update manually
    } catch (error) {
      console.error('Error removing post:', error);
     
    }
  };
  



  console.log(data);
  console.log(loading);
  return (
    <div className="ui discussion-board">
      <h2 className="discuss-header">Discussion Board</h2>
      {
        !loading ?
          data.getPosts.map(e => (
            
            <Comment
              key={e._id} postId={e._id}
              author={e.username} date={e.createdAt} text={e.postText} />
          ))
          : <p>Loading posts</p>
      }

      <form className="ui reply form" onSubmit={handlePost}>
        <div className="field">
          <textarea
            value={text}
            name="post"
            onChange={handleInputChange}
            type="text"
            placeholder="Add your post"
          />
        </div>
        <button type="submit" className="ui button">Create a Post</button>
      </form>
    </div>
  );


  const ReplyBox = () => {
    const [replyText, setReplyText] = useState('');

    const handleReply = () => {
      // Handle reply submission
      console.log('Reply submitted:', replyText);
      // Clear reply text
      setReplyText('');
    };


    return (
      <div className="ui reply form">
        <div className="field">
          <textarea value={replyText} onChange={(e) => setReplyText(e.target.value)}></textarea>
        </div>
        <button className="ui button" onClick={handleReply}>Reply</button>
      </div>
    );
  };



  //





};

export default Discussion;
