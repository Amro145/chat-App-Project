const express = require("express");
const Route = express.Router();
const {
  signUp,
  login,
  logout,
  updateProfile,
  checkAuth,
  getAllUsers,
} = require("../Controllers/auth.controller");
const verifyToken = require("../Middleware/verify");



Route.post("/signup", signUp);
Route.post("/login", login);
Route.post("/logout", logout);
Route.put("/update-profile", verifyToken, updateProfile);
Route.get("/check", verifyToken, checkAuth);
Route.get("/users", verifyToken, getAllUsers);

module.exports = Route;
