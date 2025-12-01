const mongoose = require("mongoose");

const ConnectToDb = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("Connect To DB Successfully");
  } catch (error) {
    console.log("Connect To DB Failed", error);
  }
};
module.exports = ConnectToDb;
