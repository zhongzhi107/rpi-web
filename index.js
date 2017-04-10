const debug = require('debug')('rpi-web');
const app = require('./app');
const http = require('http');
const port = 3000;

const server = http.createServer(app.callback());

const io = require('socket.io')(server);

console.log("socketio starting " + new Date().toLocaleString());

io.on('connection', (socket) => {
  console.log('-- connected --');
  // node server time
  socket.emit('heartbeat', new Date().getTime());
  setTimeout(() => {
    socket.emit('heartbeat', '5555....');
  }, 5000);
  socket.on('event', (data) => {
    console.log('event: ', data);
  });
  socket.on('disconnect', () => {
    //io.sockets.emit("broadcastState");
    //turn off timestamp every second
    //if somebody is connected their client will
    //reconnect and the timestamps will continue
    console.log('disconnect');
  });
});

// app.io = io;

server.listen(port, (err) => {
  if (err) {
    console.error(err);
  } else {
    console.log('==> 🚧  Web server listening on port %s', port);
  }
});
