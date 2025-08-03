const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userschema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 50,
    },
    lastName: {
      type: String,
    },
    emailID: {
      type: String,
      lowercase: true,
      required: true,
      unique: true,
      trim: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid email address :" + value);
        }
      },
    },
    password: {
      type: String,
      required: true,
      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error("Enter a strong password " + value);
        }
      },
    },
    age: {
      type: Number,
      min: 10,
    },
    gender: {
      type: String,

      enum: {
        values: ["male", "MALE", "Male", "female", "Female", "FEMALE", "other"],
        message: `{VALUE} is not a valid gender type`,
      },
      // validate(value) {

      //   if (!["male", "female", "other"].includes(value)) {
      //     throw new Error("Gender data is not valid");
      //   }
      // },
    },
    photoUrl: {
      type: String,
      default:
        "https://images.happypet.care/images/20939/snow-white-munchkin-on-grey-path.webp",
      validate(value) {
        const isURL = validator.isURL(value);
        const isBase64 = /^data:image\/[a-z]+;base64,/.test(value);
        if (!isURL && !isBase64) {
          throw new Error("Invalid photo string: " + value);
        }
      },
    },
    about: {
      type: String,
      default: "This is a default about of the user",
    },
    skills: {
      type: [String],
    },
  },
  {
    timestamps: true,
  }
);

userschema.methods.getJWT = async function () {
  const user = this;
  const token = await jwt.sign({ _id: user._id }, "Sarthu123", {
    expiresIn: "1d",
  });
  return token;
};

userschema.methods.validatePassword = async function (passwordInputByUser) {
  const user = this;
  const passwordHash = user.password;
  const isPasswordValid = await bcrypt.compare(
    passwordInputByUser,
    passwordHash
  );
  return isPasswordValid;
};
// const User = mongoose.model("User" , schema);
// module.exports = User;
module.exports = mongoose.model("User", userschema);
