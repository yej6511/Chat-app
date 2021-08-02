import React from 'react';

import ScrollToBottom from 'react-scroll-to-bottom';

import Message from './Message/Message';
import './MessageContainer.css';

const MessageContainer = ({ removeMessage, selectTeam, team, setTeam, messages, name, setSelectTeam, files }) => {

  return (
  <ScrollToBottom className="messages">
    {messages.map((message, id) => 
    <div key={id}>
      <Message removeMessage={removeMessage} message={message} files={files} selectTeam={selectTeam} team={team} name={name} setTeam={setTeam} setSelectTeam={setSelectTeam}/>
    </div>)}
    
  </ScrollToBottom>
  )
};

export default MessageContainer;