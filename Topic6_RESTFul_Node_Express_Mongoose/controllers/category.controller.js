const Category = require("../models/category.model");

// Get all categories
async function getAll(req, res, next){
    try {
        const categories = await Category.find({}).exec();
        if (categories) {
            res.status(200).json(categories);
        }
    } catch (error) {
        next(error);
    }
}

const CategoryController = {
    getAll,
};

module.exports = CategoryController;