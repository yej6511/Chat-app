const express = require('express');
const app = express();
const cors = require('cors');
const http = require('http');
const fileupload = require("express-fileupload");
const multer = require('multer');
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
app.use(fileupload());
app.use(express.static("public"));

io.on('connect', (socket) => {
  socket.on('join', ({ name, room, team }, callback) => {
    const { error, user } = addUser({ id: socket.id, name, room, team});

    if(error) return callback(error);

    socket.join(user.room);
  

    socket.emit('message', { id: 0, user: '관리자', text: `${user.team}팀 ${user.name}님이 입장하셨습니다.`});
    socket.broadcast.to(user.room).emit('message', { id: 0, user: '관리자', text: `${user.team}팀 ${user.name} 님이 입장하셨습니다.` });

    io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });

    callback();
  });

  socket.on('sendMessage', (message, callback) => {
    const user = getUser(socket.id);
    io.to(user.room).emit('message', { id: message, user: user.name, text: message });

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

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, 'public')
  },
  filename: (req, file, cb) => {
      cb(null, Date.now() + '-' + file.originalname)
  }
});

const upload = multer({storage}).array('file');

app.post('/upload', (req, res) => {
  upload(req, res, (err) => {
      if (err) {
          return res.status(500).json(err)
      }

      return res.status(200).send(req.files)
  })
});

server.listen(PORT, () => {
  try {
    console.log(`Server up and running on port: ${PORT}`);
  } catch (error) {
    console.error(error);
  }
});


// app.post("/upload", (req, res) => {
//   const newpath = __dirname + "/files/";
//   const file = req.files.file;
//   const filename = file.name;

//   file.mv(`${newpath}${filename}`, (err) => {
//     if (err) {
//       res.status(500).send({ message: "File upload failed", code: 200 });
//     }
//     res.status(200).send({ message: "File Uploaded", code: 200 });
//   });
// });
// server.listen(PORT, () => console.log(`Server has started. ${PORT}`));

// app.post('/upload', (req, res) => {
//   if (req.files === null) {
//     return res.status(400).json({ msg: 'No file uploaded' });
//   }

//   const file = req.files.file;

//   file.mv(`${__dirname}/uploads/${file.name}`, err => {
//     if (err) {
//       console.error(err);
//       return res.status(500).send(err);
//     }

//     res.json({ fileName: file.name, filePath: `/uploads/${file.name}` });
//   });
// });