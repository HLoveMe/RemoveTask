const WebSocket = require('ws');
const wss = new WebSocket.Server({
  host: "127.0.0.1",
  port: 8080
});
wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
    let aaaa = require("./message.json");
    ws.send(JSON.stringify(aaaa));
  });

  ws.send('something');
});