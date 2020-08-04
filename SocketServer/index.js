const WebSocket = require('ws');
const path = require("path");
const fs = require('fs');
const wss = new WebSocket.Server({
  host: "127.0.0.1",
  port: 8080
});
wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {
    console.log('received: %s', message);

  });
  setInterval(() => {
    const data = fs.readFileSync(path.join(__dirname, "message.json"), "utf-8");
    ws.send(data);
  }, 5000);
});

