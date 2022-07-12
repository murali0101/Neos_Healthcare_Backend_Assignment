const http = require('node:http');

// Create a local server to receive data from
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({
    data: 'Hello World!'
  }));
});
const port = process.env.PORT || 8000
server.listen(port, async (req, res) => {
    console.log(`listening port ${port} .......`)
});