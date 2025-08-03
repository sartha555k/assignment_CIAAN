require('dotenv').config();
const express = require("express");
const connectDB = require("./config/database");
const app = express();
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const http = require("http");


app.use(cors({ origin: ["http://localhost:5173" , "https://ciann.netlify.app"], credentials: true }));
app.use(express.json());
app.use(cookieParser());

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");
const userRouter = require("./routes/user");



app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);


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