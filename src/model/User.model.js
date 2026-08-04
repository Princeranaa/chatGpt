const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        require: true,
        unique: true
    },
    fullName: {
        firstName: {
            type: String,
            require: true
        },
        lastName: {
            type: String,
            require: true
        }
    },
    password: {
        type: String,
        require: true
    },
    verified:{
        type:Boolean,
        default:false
    }
},
    {
        timestamps: true
    }
);

module.exports = mongoose.model("user", userSchema)