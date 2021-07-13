import React from 'react';

import './Message.css';

import ReactEmoji from 'react-emoji';

const Message = ({ message: { text, user }, name, team }) => {
  let isSentByCurrentUser = false;

  const trimmedName = name.trim().toLowerCase();
  let textReplace = text.trim().toLowerCase();

  if(user === trimmedName) {
    isSentByCurrentUser = true;
  }
  
  if(textReplace === '바보') {
    textReplace = textReplace.replace(/바보/gi,'♥');
  }else if(textReplace === '멍청이') {
    textReplace = textReplace.replace(/멍청이/gi,'★');
  }

  // if(team !== 1) {
    
  // }
  

  return (
    isSentByCurrentUser
      ? (
        <div className="messageContainer justifyEnd">
          <p className="sentText pr-10">{trimmedName}</p>
          <div className="messageBox backgroundBlue">
            <p className="messageText colorWhite">{ReactEmoji.emojify(textReplace)}</p>
          </div>
        </div>
        )
        : (
          <div className="messageContainer justifyStart">
            <div className="messageBox backgroundLight">
              <p className="messageText colorDark">{ReactEmoji.emojify(textReplace)}</p>
            </div>
            <p className="sentText pl-10 ">{user}</p>
          </div>
        )
  );
}

export default Message;