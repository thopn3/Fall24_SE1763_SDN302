const bodyParser = require("body-parser");
const express = require("express");
const Product = require("../models/product.model");
const VerifyAuth = require("../middlewares/verify_auth");

const productRouter = express.Router();
productRouter.use(bodyParser.json());

// Cau hinh loai thong tin trong request
productRouter.use((req, res, next) => {
    req.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Content-Type, Origin, Accept"
    );
    next();
});

productRouter.post("/create", [VerifyAuth.verifyToken, VerifyAuth.isManager] , async (req, res, next) => {
    try {
        await Product.create(req.body)
            .then(newDoc => {
                res.status(201).json(newDoc);
            })
    } catch (error) {
        next(error);
    }
});

productRouter.get("/all",[VerifyAuth.verifyToken], async (req, res, next) => {
    try {
        const products = await Product.find({}).populate("category").exec();
        if(products){
            res.status(200).json(products);
        }
    } catch (error) {
        next(error);
    }
})

module.exports = productRouter;