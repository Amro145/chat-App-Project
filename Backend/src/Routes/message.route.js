const express = require("express");
const { model } = require("mongoose");
const { getMessage, sendMassage } = require("../Contorller/message.contorller");
const verifyToken = require("../Middleware/verify");
const Route = express.Router();

Route.get("/:id", verifyToken, getMessage);
Route.post("/send/:id", verifyToken, sendMassage);

module.exports = Route;
