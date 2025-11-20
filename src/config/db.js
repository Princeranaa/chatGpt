const mongoose = require("mongoose");

exports.connectToDb = () => {
    try {
        mongoose.connect(process.env.DATABASE_URL);
        console.log("Connect to Databse");
    } catch (error) {
        console.log("someting went wrong to connect the Db", error)
    }
    
}