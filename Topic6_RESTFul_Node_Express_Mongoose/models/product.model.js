const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Product name is required"],
        unique: [true, "Product name is duplicate"]
    },
    price: {
        type: Number
    },
    description: String,
    unitInStocks: {
        type: Number
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category"
    },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment"
    }]
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;