const port = 4000;
const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const productModel = require('./database/product.js'); // Importing the product model
const upload = require('./multer.js'); // Importing multer configuration
const Users = require('./database/users.js');

app.use(express.json()); // Middleware to parse incoming JSON data
app.use(cors()); // Middleware to enable CORS
app.use('/images', express.static('upload/images')); // Middleware to serve static files

app.get("/", (req, res) => {
  res.send("Express App is Running");
});

// Upload endpoint for file uploads
app.post('/upload', upload.single('product'), (req, res) => {
    // Respond with JSON containing uploaded file details
    res.json({
        success: true,
        message: "File uploaded successfully",
        image_url: `http://localhost:${port}/images/${req.file.filename}`
    })
});

// Add product endpoint
app.post('/addproduct', async (req, res) => {
    try {
        // Find the last product in the database to determine the new product's ID
        const lastProduct = await productModel.findOne({}, {}, { sort: { 'id': -1 } });
        let id = lastProduct ? lastProduct.id + 1 : 1; // Increment the ID or set to 1 if no product exists

        // Create a new product object
        const product = new productModel({
            id: id,
            name: req.body.name,
            new_price: req.body.new_price,
            old_price: req.body.old_price,
            image: req.body.image,
            category: req.body.category,
        });

        // Save the product to the database
        await product.save();

        console.log(product);
        res.json({
            success: true,
            message: req.body.name,
        });
    } catch (err) {
        // Handle errors during product addition
        console.error("Error adding product:", err);
        res.status(500).json({ success: false, message: "Error adding product" });
    }
});

// Remove product endpoint
app.post('/removeproduct', async (req, res) => {
    try {
        // Find and delete the product from the database based on its ID
        await productModel.findOneAndDelete({ id: req.body.id });
        console.log('Product removed');
        res.json({
            success: true,
            message: "Product deleted successfully",
        });
    } catch (err) {
        // Handle errors during product deletion
        console.error("Error removing product:", err);
        res.status(500).json({ success: false, message: "Error removing product" });
    }
});

// Get all products endpoint
app.get('/allproducts', async (req, res) => {
    try {
        // Retrieve all products from the database
        let products = await productModel.find({});
        console.log('All Products fetched');
        res.json(products);
    } catch (err) {
        // Handle errors during fetching all products
        console.error("Error fetching all products:", err);
        res.status(500).json({ success: false, message: "Error fetching all products" });
    }
});

//Creating endpoint for registering the user
app.post('/signup', async (req, res) => {
    try {
        let check = await Users.findOne({ email: req.body.email });
        if (check) {
            return res.status(400).json({ success: false, errors: "Email already used." })
        }
        let cart = {};
        for (let i = 0; i < 300; i++) {
            cart[i] = 0;
        }
        let user = new Users({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            cartData: cart
        })
        await user.save();
        //creating token
        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, 'secret_ecom');
        res.json({ success: true, authToken })
    } catch (err) {
        console.error("Error signing up:", err);
        res.status(500).json({ success: false, message: "Error signing up" });
    }
})

//creating endpoints for login

app.post('/login', async (req, res) => {
    try {
        let user = await Users.findOne({ email: req.body.email });
        if (!user) {
            return res.status(400).json({ success: false, errors: "Email not found." })
        }
        let password = req.body.password === user.password;
        if (!password) {
            return res.status(400).json({ success: false, errors: "Password is incorrect." })
        }
        // Retrieve user's cart data
        const cartData = user.cartData || {};
        //creating token
        const data = {
            user: {
                id: user.id
            }
        }
        const token = jwt.sign(data, 'secret_ecom');
        res.json({ success: true, token, cartData })
    } catch (err) {
        console.error("Error logging in:", err);
        res.status(500).json({ success: false, message: "Error logging in" });
    }
})

// creating middleware to fetch user
const fetchUser = async(req,res,next)=>{
    const token = req.header('auth-token');
    if( !token){
       return  res.status(401).send({errors:'Please authenticate using valid token'})
    }
    try{

        const data = jwt.verify(token,'secret_ecom');
        req.user = data.user;
        next();
    }
    catch(err){
        res.status(401).send({errors:'Please authenticate using valid token'})
    }
}

//creating endpoints for adding products in cart.

app.post('/addtocart',fetchUser,async(req,res)=>{
   let userData = await Users.findOne({_id:req.user.id});
   userData.cartData[req.body.itemId] +=1;
   await Users.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData})
   res.send('Added');
})

//creating endpoints for remove products

app.post('/removefromcart',fetchUser,async(req,res)=>{
    let userData = await Users.findOne({_id:req.user.id});
    if(userData.cartData[req.body.itemId]>0){
        userData.cartData[req.body.itemId] -=1;
    }
    await Users.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData})
    res.send('Removed');
})
//creating endpoint for get cart
app.post('/getcart',fetchUser,async(req,res)=>{
    let userData = await Users.findOne({_id:req.user.id});
    res.json(userData.cartData);
})

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}/`);
});
