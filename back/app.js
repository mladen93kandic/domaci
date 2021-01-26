const express = require("express");
const mongoose = require("mongoose");
const upload = require("express-fileupload");
var cors = require("cors");
const bodyParser = require("body-parser");
const passwordHash = require("password-hash/lib/password-hash");
const app = express();
const User = require("./models/user");
const Product = require("./models/product");


app.use(cors());
app.use(upload());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))
const connect = () => {
    return mongoose.connect("mongodb://localhost:27017/homework");
};

app.post("/product", async(req, res) => {
    const file = req.files;
    if (file === false || !file || typeof file === "undefined") {
        console.log("nema");
        const newProduct = req.body;
        try {
            const product = await Product.create(newProduct);
            res.status(201).json(product);
            console.log("bbbb")
        } catch (error) {
            console.log("aaaa")
            console.log(error);
            res.status(403).json(error)

        }
    } else {
        const file = req.files.image;
        fileName = req.files.image.name;
        file.mv('./uploads/' + fileName, (err) => {
            if (err) {
                console.log(err);
            } else {
                async function upis() {
                    const filePath = __dirname + "/uploads/" + fileName;
                    req.body.image = filePath;
                    const newProduct = req.body;
                    try {
                        const product = await Product.create(newProduct);
                        res.status(201).json(product);
                        console.log("bbbb")
                    } catch (error) {
                        console.log("aaaa")
                        console.log(error);
                        res.status(403).json(error)

                    }
                }
                upis();
            }
        })
    }
})



app.post("/signup", async(req, res) => {
    const newUser = req.body;
    console.log(newUser)
    try {
        const user = await User.create(newUser);
        res.status(201).json(user);
        console.log("bbbb")
    } catch (error) {
        console.log("aaaa")
        console.log(error);
        res.status(403).json(error)

    }
})
app.get("/allproducts", async(req, res) => {
    try {
        const allProducts = await Product.find({});
        console.log(allProducts)
        res.status(201).json(allProducts);

    } catch (error) {
        console.log(error);
        res.status(403).json(error)

    }
})
app.post("/login", async(req, res) => {
    let userName = req.body.username;
    let password = req.body.password;
    console.log(password);
    console.log(userName);

    try {
        const user = await User.find({ username: userName }).exec();
        console.log(user);
        console.log(user.length);
        console.log(req.body.password);
        console.log(user[0].password);
        console.log(passwordHash.verify(req.body.password, user[0].password));
        if (user.length === 0) {
            throw "User does not exist in database. ";
        } else if (user.length === 1) {
            // if (req.body.password === user.password) {
            if (passwordHash.verify(req.body.password, user[0].password)) {
                res.status(201).json(user[0]._id);
            } else {
                throw "Invalid password. ";
            }
        }
    } catch (err) {
        console.log(err);
        res.json({ error: err });
    }

})


connect()
    .then(() => app.listen(3001, () => {
        console.log("Server is running on port 3001")
    }))
    .catch(e => console.error(e))