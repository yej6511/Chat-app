import React, { useState, useEffect } from "react";
import queryString from 'query-string';
import io from "socket.io-client";

import TextContainer from '../TextContainer/TextContainer';
import MessageContainer from '../Messages/MessageContainer';
import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';
import TeamSelect from '../TeamSelect/TeamSelect'
import {FileUploader} from '../File/FileUploader/FileUploader';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import './Chat.css';

const ENDPOINT = 'http://localhost:5000/';

let socket;

const Chat = ({ location }) => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [users, setUsers] = useState('');
  const [team, setTeam] = useState('');
  const [selectTeam, setSelectTeam] = useState([]);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [files, setFiles] = useState([]);
    const onSuccess = (savedFiles) => {
        setFiles(savedFiles)
    };

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

  //console.log(team);

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

  console.log(`files:${files}`)

  return (
    <div className="outerContainer">
      <div className="container">
          <InfoBar room={room} />
          <MessageContainer files={files} messages={messages} name={name} team={team} selectTeam={selectTeam} setTeam={setTeam} setSelectTeam={setSelectTeam} />
          <TeamSelect setSelectTeam={setSelectTeam}/>
          <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
          <FileUploader onSuccess={onSuccess} />
          <ToastContainer/>
      </div>
      <TextContainer users={users}/>
    </div>
  );
}

export default Chat;
