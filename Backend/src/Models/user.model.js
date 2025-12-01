const mongoose = require("mongoose");
const Joi = require("joi");

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    userName: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    profile: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);
const User = mongoose.model("ChatUser", UserSchema);

function validateCreateUser(obj) {
  const Schema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().min(6).required(),
    userName: Joi.string().required(),
    profile: Joi.string(),
  });
  return Schema.validate(obj);
}
module.exports = { User, validateCreateUser };
