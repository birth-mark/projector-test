const http = require('http');
const argv = require('minimist')(process.argv.slice(2))
console.log(argv)
const hostname = '127.0.0.1';
const port = argv.port || 6000

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
