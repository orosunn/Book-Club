import React, { useState } from 'react';
import { GET_POST,GET_POSTS, } from '../utils/queries';
import { ADD_POST } from '../utils/mutations';
import { useQuery, useMutation, gql } from '@apollo/client'

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




//handle Input Change function
const handleInputChange = (e) => {
  e.preventDefault();
  const [text, setText] = useState('')
  // const { name, value } = e.target;
  setText(e.target.value);
};

//
const handlePost = async (e) => {
  e.preventDefault(); // Prevent the default form submit action
  try {
    await addPost({
      variables: {
        postText: text,
        // Assuming your ADD_POST mutation requires a 'postText' variable.
        // You might also need to include other variables like 'username' depending on your schema.
      },
    });
    setText(''); // Clear the textarea after posting
    // Optionally, refetch your posts or update Apollo cache here
  } catch (error) {
    console.error('Error adding post:', error);
  }
};

const Comment = ({ author, date, text }) => {
  const [showReplyBox, setShowReplyBox] = useState(false);

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
        </div>
        {showReplyBox && <ReplyBox />}
      </div>
    </div>
  );
};

const Discussion = () => {
  const {loading, data} = useQuery(GET_POSTS);
//useState for textvalue to add 
const [text, setText] = useState('');
const [addPost, { postData, postLoading, postError }] = useMutation(ADD_POST);
console.log(data);
console.log(loading);
  return (
    <div className="ui discussion-board">
      <h2 className="discuss-header">Discussion Board</h2>
      {
        !loading?
      data.getPosts.map(e => (
        <Comment author ={e.username} date={e.createdAt} text={e.postText}/>
      ) )
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
};

export default Discussion;
