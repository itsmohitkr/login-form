const mysql = require('mysql');
const express = require('express');
const bodyParser = require('body-parser');

const encoder = bodyParser.urlencoded();


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
    res.sendFile(__dirname + "/index.html");
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
    res.sendFile(__dirname+"/welcome.html")
})
// set port

app.listen(4000, () => {
    console.log("server started");
})