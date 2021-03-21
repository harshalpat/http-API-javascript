const http = require('http');
const fs = require('fs')
const path = require('path')
const hostname =  'localhost';
const port = 4000;

const server = http.createServer((req, res) => {
    console.log("Request for " + req.url + "by method " + req.method);

    if(req.method == 'GET'){
        var fileURL;
        if(req.url == '/') fileURL = '/index.html';
        else fileURL = req.url;

        var filePath = path.resolve('./public' + fileURL);
        const fileExt = path.extname(filePath);
        if(fileExt == '.html'){
            fs.exists(filePath,(exists) => {
                if(!exists){
                    res.statusCode = 404;
                    res.setHeader = ('Content-Type', 'text/html');
                    res.end('<html><body><h1>file not found </h1></body></html>');
                    
                    return;
                }
                res.statusCode = 200;
                res.setHeader('Content-Type' ,'text/html');
                fs.createReadStream(filePath).pipe(res);
    
            })
        }
       // res.statusCode = 404;
       // res.setHeader('Content-Type', 'text/html');
       // res.end('<html><body><h1>' + fileURL + ' not an HTML file</h1></body></html>');
    }
    else{
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/html');
        res.end('<html><body><h1>Error 404:' + req.method + ' not supported</h1></body></html>');

        return;
    }
})

//Starting up the server

server.listen(port, hostname, () =>{
    console.log(`Server running at http://${hostname}:${port}`);
});