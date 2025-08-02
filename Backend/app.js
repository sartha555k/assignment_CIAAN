require('dotenv').config();
const express = require("express");
require('dotenv').config();
const connectDB = require("./config/database");
const app = express();
const http = require("http");
const server = http.createServer(app);
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