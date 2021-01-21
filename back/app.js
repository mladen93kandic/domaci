const express = require("express");
const upload = require("express-fileupload")
var cors = require('cors');
const bodyParser = require("body-parser")
const app = express();

app.use(cors());
app.use(upload());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))


app.post("/signup", (req, res) => {
    console.log(req.body);
    console.log(req)
    res.set('Access-Control-Allow-Origin', '*');
    res.send("Signup Page");

})

app.get("/login", (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    res.send("Login Page");
})



app.listen(3001, () => {
    console.log("Server is running on port 3001")
});