const http = require('http');

const hostname =  'localhost';
const port = 3000;

const server = http.createServer((req, res) => {
    console.log(req.headers);

    //Status OK
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end('<html><body><h1>Hello world!</h1></body></html>');
})

//Starting up the server

server.listen(port, hostname, () =>{
    console.log(`Server running at http://${hostname}:${port}`);
});