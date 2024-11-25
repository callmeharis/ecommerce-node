require("dotenv").config();
const express = require("express");
const connectDB = require("./db/connect");
const app = express();
const port = process.env.PORT;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`Server is up and listening on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
