import React from 'react';
import moment from 'moment';
import './Message.css';
import $ from 'jquery';
import ReactEmoji from 'react-emoji';
import { Preview } from '../../File/Preview/Preview';

const Message = ({ removeMessage, message: { id, text, user }, name, selectTeam, team, files }) => {
  let isSentByCurrentUser = false;

  const trimmedName = name.trim().toLowerCase();
  let textReplace = text.trim().toLowerCase();

if(!selectTeam === '' || null || undefined || 0 || NaN) {
  if(team !== selectTeam ) { //true
    $('#hideMessage').css('display', 'none');
  }else { //false
    $('#hideMessage').css('display', 'block');
  }
}

  // console.log(`Team:${team}`);
  // console.log(`setSelectTeam: ${selectTeam}`)
  // console.log(`team !== selectTeam: ${team !== selectTeam}`)

  if(user === trimmedName) {
    isSentByCurrentUser = true;
  }
  
  if(textReplace === '바보') {
    textReplace = textReplace.replace(/바보/gi,'♥');
  }else if(textReplace === '멍청이') {
    textReplace = textReplace.replace(/멍청이/gi,'★');
  }
  return (
    isSentByCurrentUser
      ? (
        <>  
        <div className="messageContainer justifyEnd"> 
          <p className="sentText pr-10">{trimmedName}</p> 
          <div className="messageBox backgroundBlue"> 
            <p className="messageText colorWhite">{ReactEmoji.emojify(textReplace)}</p> 
            <Preview files={files} />
            <p className="time">{moment().format('A hh:mm')}</p>
          </div>
          <div className="removeBtn">
          <button className="" onClick={() => removeMessage(id)}>x</button>
          </div>
        </div>
        </>
        )
        : (
          <>
          
          <div className="messageContainer justifyStart" id="hideMessage">
            <div className="messageBox backgroundLight">
              <p className="messageText colorDark">{ReactEmoji.emojify(textReplace)}</p>
              <Preview files={files} />
            <p className="time">{moment().format('A hh:mm')}</p>
            </div>
            <div className="removeBtn">
              { !removeMessage.id === 0 ?
                <button className="" onClick={() => removeMessage(id)}>x</button>
                : null
              }
          </div>
            <p className="sentText pl-10 ">{user}</p>
            
          </div>
          </>
        )
  );
}

export default Message;