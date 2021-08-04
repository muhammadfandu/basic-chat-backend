const db = require('./app/models');
const Message = db.messages;

const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
  cors: {
    origins: ['http://localhost:4200'],
  },
});

let users = [];

app.get('/', (req, res) => {
  res.send('<h1>Hey Socket.io</h1>');
});

io.use((socket, next) => {
  const username = socket.handshake.auth.username;
  const userID = socket.handshake.auth.user_id;
  if (!username) {
    return next(new Error('invalid username'));
  }
  socket.username = username;
  socket.userID = userID;

  if (users.filter((x) => x.userID == socket.userID).length == 0) {
    users.push({
      userID: socket.userID,
      username: socket.username,
    });
  }
  next();
});

io.on('connection', (socket) => {
  socket.onAny((event, ...args) => {
    console.log(event, args);
  });

  socket.emit('users', users);
  socket.broadcast.emit('user connected', {
    userID: socket.id,
    username: socket.username,
  });

  socket.on('private message', ({ content, from, to }) => {
    socket.broadcast.emit('private message', {
      content: content,
      from: from,
      to: to,
    });

    let payload = {
      to: to,
      from: from,
      content: content,
      time_send: '',
    };

    Message.create(payload)
      .then((data) => {})
      .catch((err) => {
        console.log(err);
      });
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

http.listen(4444, () => {
  console.log('listening on *:4444');
});
