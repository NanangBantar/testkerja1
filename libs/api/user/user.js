const express = require("express");
// connection to sql
// const connection = require("../../database/connection");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const cookieParser = require('cookie-parser');

const router = express.Router();
dotenv.config();
router.use(cookieParser('token'));

// add User model
const User = require("../../models/Users");

router.post("/", async (req, res) => {
    const { username, email, password } = req.body;
    const passwordText = password;
    // using mongooDB
    try {
        let user = await User.findOne({ username });
        if (user) {
            res.json(
                {
                    status: "failed",
                    text: "User Already exits..!"
                }
            );
        }

        user = new User({
            username,
            email,
            password,
            passwordText,
        });

        const salt = await bcryptjs.genSalt(10);

        user.password = await bcryptjs.hash(password, salt);

        console.log(user);

        await user.save();

        res.json({
            status: "success",
            text: "Account successfully created.!"
        });
    } catch (err) {
        console.log(err.message);
        res.json(
            {
                status: "failed",
                text: "Failed to create account.!"
            }
        );
    }

    // if using sql 
    // connection.query(`INSERT INTO data_karyawan (username, email, password, passwordText) VALUES ('${username}', '${email}', '${passwordEncript}', '${password}')`, (err) => {
    //     if (err) throw res.json(
    //         {
    //             status: "failed",
    //             text: "Failed to create account.!"
    //         }
    //     );
    //     res.json({
    //         status: "success",
    //         text: "Account successfully created.!"
    //     });
    // });
});

router.post("/userlogin", async (req, res) => {
    const { username, password } = req.body;

    // using mongooDB
    try {
        let user = await User.findOne({ username });
        if (!user) {
            res.json({
                status: "failed",
                text: "User not Exits..!"
            });
        }

        let isMatch = await bcryptjs.compare(password, user.password);
        if (isMatch) {
            const payload = {
                username
            };
            const token = jwt.sign(payload, process.env.ACCESS_TOKEN);
            res.cookie('token', token, { signed: true, httpOnly: true });
            res.json({
                status: "success",
                text: "Login Success..!"
            });
        } else {
            res.json({
                status: "failed",
                text: "Login Failed, wrong password or username..!"
            });
        }

    } catch (err) {
        console.log(err.message);
        res.json({
            status: "failed",
            text: "Server Error"
        });
    }

    // if using sql 
    // connection.query(`SELECT * FROM data_karyawan WHERE username = '${username}'`, async (err, results) => {
    //     if (err) throw err;
    //     if (results.length !== 0) {
    //         let isMatch = await bcryptjs.compare(password, results[0].password);
    //         if (isMatch) {
    //             const payload = {
    //                 username
    //             };
    //             const token = jwt.sign(payload, process.env.ACCESS_TOKEN);
    //             res.cookie('token', token, { signed: true, httpOnly: true });
    //             res.json(
    //                 {
    //                     status: "success",
    //                     text: "Login success.!"
    //                 }
    //             );
    //         } else {
    //             res.json(
    //                 {
    //                     status: "failed",
    //                     text: "Login failed.!"
    //                 }
    //             );
    //         }
    //     } else {
    //         res.json(
    //             {
    //                 status: "failed",
    //                 text: "Login failed.!"
    //             }
    //         );
    //     }
    // });
});

router.get("/logout", (req, res) => {
    res.clearCookie("token");
    return res.redirect("/");
});

module.exports = router;