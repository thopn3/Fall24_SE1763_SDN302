const bodyParser = require("body-parser");
const express = require("express");
const morgan = require("morgan");
const httpErrors = require("http-errors");

// Khai bao thong tin cho web server 
const hostname = "localhost";
const port = 9999;

// Khoi tao web server bang Express
const app = express();

// Them cac middlewares -> Kiem soat cac request truoc khi xu ly cac actions
app.use(morgan("dev"));
app.use(bodyParser.json());

// Thuc hien tiep nhan request(s) tu Client theo method = GET
app.get("/", async (req, res , next) => {
    res.send("Welcome to Express server");
});
app.get("/get-all", async (req, res, next) => {
    res.status(200).json({"message" : "Hello everyone"});
});

// Them middleware kiem soat loi tren: requests va responses
app.use(async (req, res, next) => {
    next(httpErrors.BadRequest("Error: Bad request"));
});

// Kiem soat loi bat ky: 4x or 5x
app.use(async (err, req, res, next) => {
    // Lay status cod thuc te dang gap phai
    res.status(err.status || 500);
    res.send({error: {status: err.status, message: err.message}});
});

app.listen(port, hostname, () => {
    console.log(`Server running at: http://${hostname}:${port}`);
});