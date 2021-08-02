import React from 'react';
import jQuery from "jquery";
import $ from 'jquery';
// window.$ = window.jQuery = jQuery;
import './TeamSelect.css';

$(document).ready(function(){
    $("#teamAll").prop("checked", true);
    $("input[name='check']").prop("checked", true);
    if ($("input[name='check']:checked").length === 3) {
        $("#teamAll").prop("checked", true);
    } else {
        $("#teamAll").prop("checked", false);
    }

    $("input[name='check']").click(function () {
        if ($("input[name='check']:checked").length === 3) {
            $("#teamAll").prop("checked", true);
        } else {
            $("#teamAll").prop("checked", false);
        }
    })
    
    $("#teamAll").click( function () {
        if ($("#teamAll").prop("checked")) {
            $("input[name='check']").prop("checked", true);
        } else {
            $("input[name='check']").prop("checked", false);
        }
    });
});

const TeamSelect = ({ setSelectTeam }) => (
    <form className="TeamSelectBox"> 
        <label className="teamAll">
            <input 
                name="teamAll"
                id="teamAll"
                className="team"
                type="checkbox"      
                value={[1,2,3]}
                onChange={(event) => {
                    if(event.target.checked){
                    setSelectTeam(event.target.value)}}}
            />전체
        </label>
        <label className="team1">
            <input
                name="check"
                className="team1"
                type="checkbox"
                value={1}
                onChange={(event) => {
                    if(event.target.checked){
                        setSelectTeam(event.target.value)}}}
                />1팀
        </label>
        <label className="team2">
        <input
            name="check"
            className="team2"
            type="checkbox"
            value={2}
            onChange={(event) => {
                if(event.target.checked){
                    setSelectTeam(event.target.value)}}}
            />2팀</label>
        <label className="team3">
            <input
                name="check"
                className="team3"
                type="checkbox"
                value={3}
                onChange={(event) => {
                    if(event.target.checked){
                        setSelectTeam(event.target.value)}}}
                />3팀
        </label>
    </form>
)

export default TeamSelect;