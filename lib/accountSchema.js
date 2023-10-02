import mongoose from "mongoose";

const accountSchema = mongoose.Schema({
    number: {type: Number, require: true},
    currentBal: {type: Number, require: true},
    entries: [{
        amount: {type: Number, require: true},
        gained: {type: Boolean, require: true},
        date: {type: Date, default: Date.now},
        message: {type: String, default: ""}
    }]
});

const accountModel = new mongoose.model("Account", accountSchema);

export default accountModel;

