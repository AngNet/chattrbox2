/* global require */
var WebSocket = require("ws");
var WebSocketServer = WebSocket.Server;
var port = 3001;
var ws = new WebSocketServer({
  port: port
});
var messages = [];
var topic;

/*eslint-disable no-console*/
console.log("websocket server started");

ws.on("connection", function(socket) {
  console.log("client connection established");

  if (topic) {
    var curTopic = "*** Topic is ";
    curTopic += "'" + topic + "'";
    socket.send(curTopic);
  }

  messages.forEach(function(msg) {
    socket.send(msg);
  });

  socket.on("message", function(data) {
    if (data.indexOf("/topic") != -1) {
      var changedTopic = "*** Topic has been changed to ";
      changedTopic += "'" + data.substring(7, data.length) + "'";
      topic = data.substring(7, data.length);
      ws.clients.forEach(function(clientSocket) {
        clientSocket.send(changedTopic);
      });
    } else {
      console.log("message recieved: " + data);
      messages.push(data);
      ws.clients.forEach(function(clientSocket) {
        clientSocket.send(data);
      });
    }
  });

});
