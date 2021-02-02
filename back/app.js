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
app.use(express.static("uploads"))
const connect = () => {
    return mongoose.connect("mongodb://localhost:27017/homework");
};

app.post("/product", async(req, res) => {
    let productName = req.body.name;
    const productExist = await Product.find({ name: productName }).exec();
    console.log(productExist.length === 1);
    console.log(productExist);
    if (req.body.description !== "") {
        try {
            if (req.body.description.length < 10 || req.body.description.length > 150) {
                throw "Product description should not be shorter than 10 characters and longer than 150 characters. ";
            }
        } catch (error) {
            console.log(error);
            res.json({ error: error });
        }
    }
    try {
        if (productExist.length === 1) {
            throw "This product name already exists in database. ";

        }
    } catch (error) {
        console.log(error);
        res.json({ error: error });
        return

    }
    const file = req.files;
    if (file === false || !file || typeof file === "undefined") {
        console.log("nema");
        let filePath = __dirname + "/uploads/" + "noimage.png";
        req.body.image = filePath;
        let newProduct = req.body;
        console.log(newProduct)
        try {
            const product = await Product.create(newProduct);
            res.status(201).json(product);
        } catch (error) {
            console.log(error);
            res.json({ error: error });

        }
    } else {
        let file = req.files.image;
        let fileName = req.files.image.name;
        file.mv('./uploads/' + fileName, (err) => {
            if (err) {
                console.log(err);
            } else {
                async function upis() {
                    let filePath = __dirname + "/uploads/" + fileName;
                    req.body.image = filePath;
                    let newProduct = req.body;
                    try {
                        const product = await Product.create(newProduct);
                        res.status(201).json(product);
                    } catch (error) {
                        console.log(error);
                        res.json({ error: error });

                    }
                }
                upis();
            }
        })
    }

})

app.post("/edit", async(req, res) => {
    let id = req.body.id;
    console.log(id);
    if (req.body.description !== "") {
        try {
            if (req.body.description.length < 10 || req.body.description.length > 150) {
                throw "Product description should not be shorter than 10 characters and longer than 150 characters. ";
            }
        } catch (error) {
            console.log(error);
            res.json({ error: error });
        }
    }

    const file = req.files;
    if (file === false || !file || typeof file === "undefined") {
        console.log("nema");
        let filePath = __dirname + "/uploads/" + "noimage.png";
        req.body.image = filePath;
        let newProduct = req.body;
        console.log(newProduct)
        try {
            const product = await Product.findOneAndUpdate({ _id: id }, newProduct, { new: true, upsert: true, setDefaultsOnInsert: true });
            console.log(product);
            res.status(201).json(product);
        } catch (error) {
            console.log(error);
            res.json({ error: error });

        }
    } else {
        let file = req.files.image;
        let fileName = req.files.image.name;
        file.mv('./uploads/' + fileName, (err) => {
            if (err) {
                console.log(err);
            } else {
                async function upis() {
                    let filePath = __dirname + "/uploads/" + fileName;
                    req.body.image = filePath;
                    let newProduct = req.body;
                    try {
                        const product = await Product.findOneAndUpdate({ _id: id }, newProduct, { new: true, upsert: true, setDefaultsOnInsert: true });
                        console.log(product)
                        res.status(201).json(product);
                    } catch (error) {
                        console.log(error);
                        res.json({ error: error });

                    }
                }
                upis();
            }
        })
    }

})

app.post("/signup", async(req, res) => {
    let userName = req.body.username;
    let userEmail = req.body.email;
    try {
        const emailExist = await User.find({ email: userEmail }).exec();
        const userExist = await User.find({ username: userName }).exec();
        const newUser = req.body;
        console.log(userExist.length)
        console.log(emailExist.length)

        console.log(newUser)

        if (userExist.length > 0) {
            throw "This username already exists in database. ";
        } else if (emailExist.length > 0) {
            throw "This email already exists in database. ";
        } else {
            const user = await User.create(newUser);
            console.log(user)
            res.status(201).json(user);
        }
    } catch (error) {
        res.json({ error: error });
    }
})
app.get("/allproducts", async(req, res) => {
    try {
        const allProducts = await Product.find({});
        res.status(201).json(allProducts);

    } catch (error) {
        console.log(error);
        res.status(403).json(error)

    }
})
app.post("/login", async(req, res) => {
    let userName = req.body.username;
    let password = req.body.password;

    try {
        const user = await User.find({ username: userName }).exec();
        if (user.length === 0) {
            throw "User does not exist in database. ";
        } else if (user.length === 1) {
            console.log(passwordHash.verify(password, user[0].password));
            if (passwordHash.verify(password, user[0].password)) {
                console.log("ulazi u response")
                res.status(201).json(user[0]._id);
            } else {
                console.log("ulazi u err")
                throw "Invalid password. ";
            }
        }
    } catch (err) {
        console.log(err);
        res.json({ error: err });
    }

})
app.post("/delete", async(req, res) => {
    let id = req.body.id;
    try {
        const product = await Product.deleteOne({ _id: id }).exec();
        console.log(product);
        if (product.n === 0) { throw "Product does not exist in db" } else if (product.n === 1) {
            res.status(201).json(id);
        }
    } catch (err) {
        console.log(err)
        res.json({ error: err })
    }
})

connect()
    .then(() => app.listen(3001, () => {
        console.log("Server is running on port 3001")
    }))
    .catch(e => console.error(e))