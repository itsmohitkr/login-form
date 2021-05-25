const mysql = require('mysql');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const encoder = bodyParser.urlencoded();
const port = process.env.PORT || 8000;


const app = express();

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '14144157',
    database: 'nodejs'
});
// console.log(typeof connection);

connection.connect((error) => {
    if (error) {
        throw error;
    }
    else {
        console.log("connected to database successfully");
    }
})

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname,"../public/index.html"));
})

app.post("/", encoder, (req, res) => {
    var username = req.body.username;
    var password = req.body.password;
    connection.query("select * from loginuser where user_name=? and user_pass=?",[username,password],(error, results, fields) => {
        if (results.length > 0) {
            res.redirect("/welcome");
        }
        else {
            res.redirect("/");
        }
    })
})

// when login successfully
app.get("/welcome", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/welcome.html"))
})
// set port

app.listen(port, () => {
    console.log("server started");
})