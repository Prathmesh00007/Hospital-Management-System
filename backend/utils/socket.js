// backend/utils/socket.js
const socketio = require('socket.io');

let io;

exports.init = (server) => {
  io = socketio(server);
};

exports.sendNotification = (message) => {
  io.emit('incident-update', message); // Notify clients (users, admins)
};
