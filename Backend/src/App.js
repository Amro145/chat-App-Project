const express = require("express");
const ConnectToDb = require("./lib/db");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const path = require("path");
dotenv.config();

const { app, server } = require("./lib/Socketio");
app.use(bodyParser.json({ limit: "50mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000,
  })
);
// const __dirname = path.resolve();

app.use(express.json());
app.use(express.urlencoded({ extended: true })); // لفك تشفير بيانات الفورم
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(cookieParser());
server.listen(5000, "0.0.0.0", () => {
  console.log("Running");
  ConnectToDb();
});
// routes
app.use("/api/auth", require("../src/Routes/auth.route"));
app.use("/api/message", require("../src/Routes/message.route"));

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../../client/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../../client", "dist", "index.html"));
  });
}
