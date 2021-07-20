import React from 'react';
import jQuery from "jquery";
import $ from 'jquery';
// window.$ = window.jQuery = jQuery;
import './TeamSelect.css';

$(document).ready(function(){
    $("#teamAll").click( function () {
        if ($("#teamAll").prop("checked")) {
            $(".team").prop("checked", true);
        } else {
            $(".team").prop("checked", false);
        }
    });

    $(".team").click(function () {
        if ($("input[name='check']:checked").length === 3) {
            $("#teamAll").prop("checked", true);
        } else {
            $("#teamAll").prop("checked", false);
        }
    })

    let chk_Val = [];
    $("input:checkbox[name='check'].value").each(function(i,iVal){
    chk_Val.push(iVal);
    console.log(`chk_Val=${chk_Val}`);
})
});



const TeamSelect = ({ setTeam }) => (
    <form className="TeamSelectBox"> 
        <label className="teamAll">
            <input 
                name="teamAll"
                id="teamAll"
                className="team"
                type="checkbox"
            />전체
        </label>
        <label className="team1">
            <input
                name="check"
                className="team"
                type="checkbox"
                value={1}
                onChange={({ target: { value }}) => setTeam(value)}
                />1팀
        </label>
        <label className="team2">
        <input
            name="check"
            className="team"
            type="checkbox"
            value={2}
            onChange={({ target: { value } }) => setTeam(value)} 
            />2팀</label>
        <label className="team3">
            <input
                name="check"
                className="team"
                type="checkbox"
                value={3}
                onChange={(event) => {
                    if(event.target.checked){
                    setTeam(event.target.value)}
                console.log(`check:${setTeam(event.target.value)}`) 
            }}
                />3팀
        </label>

    </form>
    
)

export default TeamSelect;