
const http = require('http');
const url = require('url');

const port = process.argv[2] || 6060

const hostname = '127.0.0.1';

const mapHost = {
  '/hello' : (name) =>  {
    if(name) return `Hello, ${name}`;
    return 'Hello, world';
  },
  '/goodbye': (name) => {
    if(name) return `Goodbye, ${name}`;
    return 'Goodbye';
  }
}

const server = http.createServer((req, res) => {
  const myURL = url.parse(req.url, true);
  let answer = mapHost[myURL.pathname];

  if(!answer){
    res.statusCode = 404;
    return res.end();
  }

  res.statusCode = 200;
  res.setHeader('Contetn-Type', 'text/plain');
  res.end(answer(myURL.query.name));
})

server.listen(port, hostname, ()=>{
  console.log(`server running at http://${hostname}:${port}`)
})
