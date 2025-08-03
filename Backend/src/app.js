require('dotenv').config();
const express = require("express");
require('dotenv').config();
const connectDB = require("./config/database");
const app = express();
const http = require("http");
const User = require('./models/user');
const server = http.createServer(app);

app.post("/signup", async(req, res) => {
    const user = new User({
        firstName:"Sarthak Testing",
        password : "Sarthak@123",
        emailID:"sarthak3@gmail.com"
    });
    await user.save();
    res.send("User created successfully: " + user.firstName);
})




connectDB()
  .then(() => {
    console.log("Database connected successfully");
    server.listen(3000, () => {
      console.log("Server is running successfully on port 3000");
    });
  })
  .catch((err) => {
    console.error("Database connection failed", err);
  });