const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const UserSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please fulfill the name field"],
        },
        password: {
            type: String,
            required: [true, "Please fullfil your password"],
        },
        email: {
            type: String,
            required: [true, "Fulfill your e-mail direction"],
        },
        role: { type: String, default: "user" },
       
        tokens: [],
                
        taskIds: [
            {
                type: ObjectId,
                ref: "Task",
            },
        ],
      
    },
    { timestamps: true },
);

const User = mongoose.model("User", UserSchema);

module.exports = User;
