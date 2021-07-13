//사용자 관리 로그아웃
const users = [];


//사용자 데이터 추가
const addUser = ({id, name, room, team}) => {
    console.log('addUser', id, name, room, team)
    name = name.trim().toLowerCase();
    room = room.trim().toLowerCase();
    team = team.trim().toLowerCase();
    // team = team.trim().toLowerCase();

    const existingUser = users.find((user) => user.room === room && user.name === name && user.team === team);

    if(!name || !room || !team) return { error: 'Username and room are required.' };
    if(existingUser) return { error : 'Username is taken' }

    const user = { id, name, room, team};
    users.push(user);
    return { user };

}

//사용자 데이터 삭제
const removeUser = (id) => {
    const index = users.findIndex((user) => user.id === id);

    if(index !== -1) return users.splice(index, 1)[0];
}

//사용자 데이터
const getUser = (id) => users.find((user) => user.id === id);

//특정 방에있는 사용자 데이터 가져오기.
const getUsersInRoom = (room) => users.filter((user) => user.room === room); 


module.exports = { addUser, removeUser, getUser, getUsersInRoom }