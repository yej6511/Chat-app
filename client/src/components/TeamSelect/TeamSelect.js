import React from 'react';

import './TeamSelect.css';

const TeamSelect = ({ setTeam }) => (
    <form className="TeamSelectBox"> 

        <input
            name="team1"
            className="team1"
            type="checkbox"
            value={1}
            onChange={({ target: { value } }) => setTeam(value)} />

        <label htmlFor="team1">1팀</label>
        <input
            name="team2"
            className="team2"
            type="checkbox"
            value={2}
            onChange={({ target: { value } }) => setTeam(value)} />
        <label htmlFor="team2">2팀</label>

        <input
            name="team3"
            className="team3"
            type="checkbox"
            value={3}
            onChange={({ target: { value } }) => setTeam(value)} />
        <label htmlFor="team3">3팀</label>

    </form>
    
)

export default TeamSelect;