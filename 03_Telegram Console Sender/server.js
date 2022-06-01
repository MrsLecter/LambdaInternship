const WebSocket = require('ws');
const server = new WebSocket.Server({port: 3000});
const {TWENTYFIVE_MINUTES} = require('./src/constants');

server.on('connection', ws => {
  let timerId = setInterval(() => ws.send('hey'), TWENTYFIVE_MINUTES);

})
