const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        unique: [true, "Category name existed"],
        validate: {
            validator: function(value){
                return value.length >= 5;
            },
            message: "Category name min length: 5 characters"
        }
    },
    description: {
        type: String
    }
});

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;