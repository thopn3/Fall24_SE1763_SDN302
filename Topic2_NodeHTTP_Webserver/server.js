// Khai bao module 'http'
const http = require("http");
const fs = require("fs");
const path = require("path");
// Khai bao hostname, port number cho web server
const hostname = "localhost";
const port = 9999;

// Su dung module http tao 1 web server
const server = http.createServer((req, res) => {
    console.log(`${req.url} - ${req.method}`);
    res.setHeader("Content-Type", "text/html");

    if(req.method == "GET"){
        let fileUrl;
        if(req.url == "/")
            fileUrl = "/index.html";
        else
            fileUrl = req.url;

        let filePath = path.resolve(`./public${fileUrl}`);
        let fileExt = path.extname(filePath);
        if(fileExt==".html"){
            fs.exists(filePath, exist => {
                if(!exist){
                    res.statusCode = 404;
                    res.end(`Error 404: ${fileUrl} not found`);
                }
                res.statusCode = 200;
                fs.createReadStream(filePath).pipe(res);
            })
        }else{
            res.statusCode = 404;
            res.end(`<html><body><h1>Error 404: ${fileUrl} not a HTML file</h1></body></html>`)
        }
    }else{
        res.statusCode = 400;
        res.end(`<html><body><h1>Error 400: ${req.method} not suppoted</h1></body></html>`)
    }
});

// Lang nghe cac request tu clients gui yeu cau lam viec voi Web server
server.listen(port, hostname, () => {
    console.log(`Server running at: http://${hostname}:${port}`);
});

