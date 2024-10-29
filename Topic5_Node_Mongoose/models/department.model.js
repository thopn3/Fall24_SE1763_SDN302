const mongoose = require("mongoose");

const departmentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    location: {
        floor: {
            type: Number
        },
        room: {
            type: String
        }
    }
}, {timestamps: true});

const Department = mongoose.model("department", departmentSchema);

module.exports = Department;