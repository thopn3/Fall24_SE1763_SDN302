const mongoose = require("mongoose");

const roleSchema = new mongoose.Schema({
    name: String
});

const Role = mongoose.model("role", roleSchema);

module.exports = Role;