const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    title: {
        type: String,
        require: true
    },
    lastActivity: {
        type: Date,
        default: Date.now
    }

},
    {
        timestamps: true
    }
)

module.exports = mongoose.model("chat", chatSchema)
