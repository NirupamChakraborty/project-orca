import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    // name username password token
    name:{
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    token: {
        type: String
    }

})

const UserModel = mongoose.model("UserModel", userSchema);

export default UserModel;