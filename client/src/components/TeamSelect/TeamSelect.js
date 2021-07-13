import React from 'react';

import './TeamSelect.css';

const TeamSelect = ({ team, setTeam }) => (
  <>
    <input
      className="team1"
      type="checkbox"
      value={team}
      onChange={({ target: { value } }) => setTeam(value)}>{team}팀
    </input>
    
    {/* <input
      className="team2"
      type="checkbox"
      value={2}
      checked={({ target: { value } }) => setTeam(value)}>2팀
    </input>
    <input
      className="team3"
      type="checkbox"
      value={3}
      checked={({ target: { value } }) => setTeam(value)}>3팀
    </input>
     */}
 </>
)

export default TeamSelect;