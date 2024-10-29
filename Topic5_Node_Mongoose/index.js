const mongoose = require("mongoose");
const Department = require("./models/department.model");

const mongoDB_URI = "mongodb://127.0.0.1:27017/SE1763_Mongoose";

mongoose.connect(mongoDB_URI).then((db)=>{
    console.log("Connect to MongoDB successfully");
    
    const newDepart = new Department({location: {floor: 1, room: "101"}});
    newDepart.save().then(docResult => console.log(docResult));
}).catch(console.error);