const bodyParser = require("body-parser");
const express = require("express");
const morgan = require("morgan");
const httpErrors = require("http-errors");
const Db = require("./models");
const catRouter = require("./routes/category.route");
const productRouter = require("./routes/product.route");
const { AuthRouter } = require("./routes");
require("dotenv").config();

// Khoi tao web server bang Express
const app = express();

// Them cac middlewares -> Kiem soat cac request truoc khi xu ly cac actions
app.use(morgan("dev"));
app.use(bodyParser.json());

// Thuc hien tiep nhan request(s) tu Client theo method = GET
app.get("/", async (req, res , next) => {
    res.status(200).json({message: "Welcome to RESTFul API - NodeJS"});
});

app.use("/category", catRouter);
app.use("/product", productRouter);
app.use("/auth", AuthRouter);

// Them middleware kiem soat loi sinh ra khi xu ly tren: Router, Controller, Model
app.use(async (req, res, next) => {
    next(httpErrors.BadRequest("Error: Bad request"));
});

// Kiem soat loi bat ky: 4x or 5x
app.use(async (err, req, res, next) => {
    // Lay status cod thuc te dang gap phai
    res.status(err.status || 500);
    res.send({error: {status: err.status, message: err.message}});
});

const HOST = process.env.HOST_NAME || "localhost";
const PORT = process.env.PORT || 9999;
app.listen(PORT, HOST, async() => {
    console.log(`Server running at: http://${HOST}:${PORT}`);
    await Db.connectDB();
});