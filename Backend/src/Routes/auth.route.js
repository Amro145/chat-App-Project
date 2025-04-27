const express = require("express");
const Route = express.Router();
const {
  singUp,
  login,
  logout,
  updateProfile,
  chekAuth,
  getAllUsers,
} = require("../Contorller/auth.contorller");
const vervifyUser = require("../Middleware/verify");



Route.post("/singup", singUp);
Route.post("/login", login);
Route.post("/logout", logout);
Route.put("/update-profile", vervifyUser, updateProfile);
Route.get("/check", vervifyUser, chekAuth);
Route.get("/users",vervifyUser, getAllUsers);

module.exports = Route;
