require("dotenv").config();
const express = require("express");
const connectDB = require("./db/connect");
const app = express();
const cookieParser = require("cookie-parser");

// routers
const authRouter = require("./routes/authRoutes");

// middleware
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));

app.use("/api/v1/auth", authRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

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
