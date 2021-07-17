import React, { useState } from 'react';
import { Link } from "react-router-dom";

import './Join.css';


export default function SignIn() {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [team, setTeam] = useState('');

  return (
    <div className="joinOuterContainer">
      <div className="joinInnerContainer">
        
        <h1 className="heading">Join</h1>
        <div>
        <select className="teamCheck" onChange={(event) => setTeam(event.target.value)}>
          <option defaultValue>팀 선택</option>
          <option value="1">Team1</option>
          <option value="2">Team2</option>
          <option value="3">Team3</option>
        </select>
        </div>
        <div>
          <input placeholder="Name" className="joinInput" type="text" onChange={(event) => setName(event.target.value)} />
        </div>
        <div>
          <input placeholder="Room" className="joinInput mt-20" type="text" onChange={(event) => setRoom(event.target.value)} />
        </div>
        <Link onClick={e => (!name || !room || !team) ? e.preventDefault() : null} to={`/chat?name=${name}&room=${room}&team=${team}`}>
          <button className={'button mt-20'} type="submit">Sign In</button>
        </Link>
      </div>
    </div>
  );
}