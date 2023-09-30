
const host = process.env.HOST || 'localhost';
const port = process.env.PORT || 3000;
const path = require('path')

const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

io.on('connection', (socket) => {
  socket.on('chat message', msg => {
    io.emit('chat message', msg);
  });
});



server.listen(port, host, () => {
  console.log(`Socket.IO server running at http://${host}:${port}/`);
});