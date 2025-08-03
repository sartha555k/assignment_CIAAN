const jwt = require("jsonwebtoken");
const User = require("../models/user");
const userAuth = async (req, res, next) => {
  try {
    // Read the token from the req cookies
    //const cookie = req.cookies;
    const { token } = req.cookies
    if (!token) {
      return res.status(401).send("Please Login"); // code for this is you are unorgnized !!!!
    }
    const decodeObj = await jwt.verify(token, "Sarthu123");
    const { _id } = decodeObj;
    const user = await User.findById(_id);
    if (!user) {
      throw new Error("User not found");
    }
    req.user = user;
    next();
  } catch (err) {
    res.status(400).send("ERROR:" + err.message);
  }
  // validate the token
  // find the user
};

module.exports = {
  userAuth,
};
