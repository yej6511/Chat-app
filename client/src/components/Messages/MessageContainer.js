import React from 'react';

import ScrollToBottom from 'react-scroll-to-bottom';

import Message from './Message/Message';
import './MessageContainer.css';

const MessageContainer = ({ selectTeam, team, setTeam, messages, name, setSelectTeam, files }) => (
  
  <ScrollToBottom className="messages">
    {messages.map((message, i) => 
    <div key={i}>
      <Message files={files} selectTeam={selectTeam} team={team} message={message} name={name} setTeam={setTeam} setSelectTeam={setSelectTeam}/>
      
    </div>)}
    
  </ScrollToBottom>
);

export default MessageContainer;