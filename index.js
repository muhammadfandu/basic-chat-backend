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
  console.log('a user connected');

  socket.emit('users', users);

  // notify existing users
  socket.broadcast.emit('user connected', {
    userID: socket.id,
    username: socket.username,
  });

  console.log(users);

  socket.onAny((event, ...args) => {
    console.log('an event happened!!!');
    console.log(event, args);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  socket.on('my message', (msg) => {
    console.log('message: ' + msg);
    io.emit('my broadcast', `server: ${msg}`);
  });

  socket.on('private message', ({ content, from, to }) => {
    socket.broadcast.emit('private message', {
      content: content,
      from: from,
      to: to,
    });

    console.log('sending ' + content + ' from ' + from + ' to ' + to);
  });
});

http.listen(4444, () => {
  console.log('listening on *:4444');
});
