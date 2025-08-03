const mongoose = require("mongoose");
const validator = require("validator");
const userSchema = new mongoose.Schema(
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


module.exports = mongoose.model("User", userSchema);