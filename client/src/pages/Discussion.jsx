import React, { useState } from 'react';

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

const Comment = ({ author, date, text }) => {
  const [showReplyBox, setShowReplyBox] = useState(false);

  const toggleReplyBox = () => {
    setShowReplyBox(!showReplyBox);
  };

  return (
    <div className="comment">
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
  return (
    <div className="ui discussion-board">
      <h2 className="discuss-header">Discussion Board</h2>
      <Comment author="Matt" date="Today at 5:42PM" text="To Kill a Mockingbird is revolutionary" />
      <Comment author="Elliot Fu" date="Yesterday at 12:30AM" text="Twilight is life <3 Team Jacob!" />
      <Comment author="Joe Henderson" date="5 days ago" text="Harry Potter and the Chamber of Secrets is the best book of the series. Change my mind!" />
      <form className="ui reply form">
        <div className="field">
          <textarea></textarea>
        </div>
        <button className="ui button">Create a Post</button>
      </form>
    </div>
  );
};

export default Discussion;
