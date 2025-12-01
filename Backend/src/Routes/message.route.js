const express = require("express");
const { model } = require("mongoose");
const { getMessage, sendMessage } = require("../Controllers/message.controller");
const verifyToken = require("../Middleware/verify");
const Route = express.Router();

Route.get("/:id", verifyToken, getMessage);
Route.post("/send/:id", verifyToken, sendMessage);

module.exports = Route;
