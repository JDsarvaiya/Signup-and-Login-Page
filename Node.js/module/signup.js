const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SignUpSchema = new Schema({
    name: String,
    lastname: String,
    email: {
        type: String,
        unique: true,
    },
    password: String
});

const SIGNUPDATA = mongoose.model("SIGNUP", SignUpSchema);
module.exports = SIGNUPDATA;