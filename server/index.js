const app = require('express')();
const cors = require('cors');
const http = require('http');
const server = http.createServer(app);
const PORT = 5000;
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    credentials: true,
  },
});

const router = require('./router');
const { addUser, removeUser, getUser, getUsersInRoom } = require('./users');

app.use(cors());
app.use(router);

io.on('connect', (socket) => {
  socket.on('join', ({ name, room, team }, callback) => {
    const { error, user } = addUser({ id: socket.id, name, room, team});

    if(error) return callback(error);

    socket.join(user.room);
  

    socket.emit('message', { user: '관리자', text: `${user.team}팀 ${user.name}님이 입장하셨습니다.`});
    socket.broadcast.to(user.room).emit('message', { user: '관리자', text: `${user.team}팀 ${user.name} 님이 입장하셨습니다.` });

    io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });

    callback();
  });

  socket.on('sendMessage', (message, callback) => {
    const user = getUser(socket.id);

    io.to(user.room).emit('message', { user: user.name, text: message });

    callback();
  });

  socket.on('disconnect', () => {
    const user = removeUser(socket.id);

    if(user) {
      io.to(user.room).emit('message', { user: '관리자', text: `${user.team}팀 ${user.name} 님이 퇴장하셨습니다.` });
      io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room)});
    }
  })
});

server.listen(PORT, () => console.log(`Server has started. ${PORT}`));