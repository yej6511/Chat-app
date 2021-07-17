import React from 'react';

import './TeamSelect.css';
const TeamSelect = ({ setTeam }) => (
    <form className="TeamSelectBox"> 
        <label className="teamAll">
            <input 
                name="teamAll"
                className="teamAll"
                type="checkbox"
            />전체
        </label>
        <label className="team1">
            <input
                className="team1"
                type="checkbox"
                value={1}
                onChange={({ target: { value }}) => setTeam(value)}
                onclick='getCheckboxValue'
                />1팀
        </label>
        <label className="team2">
        <input
            className="team2"
            type="checkbox"
            value={2}
            onChange={({ target: { value } }) => setTeam(value)} 
            onclick='getCheckboxValue'
            />2팀</label>
        <label className="team3">
            <input
                className="team3"
                type="checkbox"
                value={3}
                onChange={({ target: { value } }) => {setTeam(value)
                console.log(`check:${setTeam(value)}`)}} 
                onclick='getCheckboxValue'
                />3팀
        </label>

    </form>
    
)

export default TeamSelect;