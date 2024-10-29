const bodyParser = require("body-parser");
const express = require("express");
const Product = require("../models/product.model");

const productRouter = express.Router();

productRouter.post("/create", async (req, res, next) => {
    try {
        await Product.create(req.body)
            .then(newDoc => {
                res.status(201).json(newDoc);
            })
    } catch (error) {
        next(error);
    }
});

productRouter.get("/all", async (req, res, next) => {
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