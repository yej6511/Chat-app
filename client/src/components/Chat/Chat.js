import React, { useState, useEffect } from "react";
import queryString from 'query-string';
import io from "socket.io-client";

import TextContainer from '../TextContainer/TextContainer';
import MessageContainer from '../Messages/MessageContainer';
import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';
import TeamSelect from '../TeamSelect/TeamSelect'
import File from '../File/File'
// import Message from "../Messages/Message/Message"

import './Chat.css';

const ENDPOINT = 'http://localhost:5000/';

let socket;

const Chat = ({ location }) => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [users, setUsers] = useState('');
  const [team, setTeam] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [file, setFile] = useState();
  const [fileName, setFileName] = useState("");
  

  useEffect(() => {
    const { name, room, team } = queryString.parse(location.search);

    socket = io(ENDPOINT);

    setRoom(room);
    setName(name);
    setTeam(team);
    

    socket.emit('join', { name, room, team }, (error) => {
      if(error) {
        alert(error);
      }
    });
  }, [ENDPOINT, location.search]);

  console.log(team);

  useEffect(() => {
    socket.on('message', message => {
      setMessages(messages => [ ...messages, message ]);
    });
    
    socket.on("roomData", ({ users }) => {
      setUsers(users);
    });
}, []);

  const sendMessage = (event) => {
    event.preventDefault();

    if(message) {
      socket.emit('sendMessage', message, () => setMessage(''));
    }
  }
  console.log(`team: ${team}`)
  console.log(`selectTeam: ${TeamSelect.setTeam}`)

  if(TeamSelect.setTeam !== team) {
    MessageContainer.message = "";
  }

  //console.log(messages);
  return (
    <div className="outerContainer">
      <div className="container">
          <InfoBar room={room} />
          <MessageContainer messages={messages} name={name} team={team} />
          <TeamSelect setTeam={setTeam}/>
          <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
          <File file={file} setFile={setFile} fileName={fileName} setFileName={setFileName}/>
      </div>
      <TextContainer users={users}/>
    </div>
  );
}

export default Chat;
