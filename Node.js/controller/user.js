var SIGNUPDATA = require('../module/signup')
var express = require('express');
var router = express.Router();
var jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.secure = async function (req, res, next) {
    try {
        console.log(req.headers.token);
        let token = req.headers.token;
        if (!token) {
            throw new Error("Token is not found");
        }
        var decoded = await jwt.verify(token, "securedata");
        console.log(decoded);

        let checkuser = await SIGNUPDATA.findbyId(decoded.id);

        if(!checkuser) {
            throw new Error("User not found");
        }
        req.body.user = decoded.id
        next();
    } catch (error) {
        res.status(404).json({
            status: "fail",
            message: error.message,
        });
    }
}


exports.Signup = async function (req, res, next) {
    try {
        if (!req.body.name || !req.body.lastname || !req.body.email || !req.body.password) {
            throw new Error("Please enter all data");
        }
        req.body.password = await bcrypt.hash(req.body.password, 10)
        let data = await SIGNUPDATA.create(req.body)

        let token = jwt.sign({ id: data._id }, 'securedata');

        res.status(201).json({
            status: "success",
            message: "signup successfully",
            data: data,
            token
        })
        console.log(data);
    } catch (error) {
        res.status(404).json({
            status: "fail",
            message: error.message,
        })
    }
}



exports.Login = async function (req, res, next) {
    try {
        if ( !req.body.password || !req.body.email) {
            throw new Error("Please enter all data");
        }
        let user = await SIGNUPDATA.findOne({ email: req.body.email });
        console.log(user);
        if (!user) {
            throw new Error("User not defined");
        }

        // console.log(req.body);

        let checkpass = await bcrypt.compare(req.body.password, user.password);
        if (!checkpass) {
            throw new Error("Password incorrect");
        }

        let token = jwt.sign({ id: user._id }, 'securedata');

        res.status(200).json({
            status: "success",
            message: "login successfully",
            data: user,
            token
        });
    } catch (error) {
        res.status(404).json({
            status: "fail",
            message: error.message,
        })
    }
}