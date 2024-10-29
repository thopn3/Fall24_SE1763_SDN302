const mongoose = require("mongoose");
const Category = require("./category.model");
const Comment = require("./comment.model");
const Product = require("./product.model");
const Role = require("./role.model");
const User = require("./user.model");

// Khai bao doi tuong CSDL
const Db = {};

Db.Categories = Category;
Db.Comments = Comment;
Db.Products = Product;
Db.Roles = Role;
Db.Users = User;

Db.connectDB = async() => {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
            .then(() => console.log("Connect to MongoDB success"));
    } catch (error) {
        next(error);
        process.exit();
    }
}

module.exports = Db;