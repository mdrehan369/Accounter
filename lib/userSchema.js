import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {type: String, require: true},
    email: {type: String, require: true},
    number: {type: Number, min:1000000000, max: 9999999999, require: true},
    password: {type: String, require: true}
});

const userModel = mongoose.model("User", userSchema);

export default userModel;

