const express = require("express");
const ConnectToDb = require("./lib/db");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const path = require("path");
dotenv.config();

// Connect to Database
ConnectToDb();

const { app, server } = require("./lib/Socketio");

// Trust proxy is required for secure cookies behind a proxy (like Vercel)
app.set("trust proxy", 1);

// CORS Configuration
const corsOptions = {
  origin: [
    "https://chat-app-client-eight-sigma.vercel.app",
    "http://localhost:5173",
  ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "Accept",
    "X-Requested-With",
    "x-access-token"
  ],
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions)); // Handle preflight requests explicitly

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
app.use(express.urlencoded({ extended: true }));


app.get("/", (req, res) => {
  res.send("Server is running");
});

app.use(cookieParser());

if (require.main === module) {
  server.listen(5000, "0.0.0.0", () => {
    console.log("Running");
  });
}
// routes
app.use("/api/auth", require("./Routes/auth.route"));
app.use("/api/message", require("./Routes/message.route"));



module.exports = app;
