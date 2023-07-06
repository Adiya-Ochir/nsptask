// import { createConnection } from "typeorm";
const express = require("express");
// const { Pool } = require("pg");
// const mongoose = require("mongoose");

require("dotenv").config();
const colors = require("colors");
const errorHandler = require("./middleware/error");
// const routes = require("./routes/TaskRoute");
const router = require("./routes/DataRoute");
const cors = require("cors");
// const routes = require("./routes/PetRoute");
// const router = require("./routes/PetRoute");
const app = express();
const PORT = process.env.PORT | 5000;

const logger = (req, res, next) => {
  console.log(`${req.method} ${req.protocol}://${req.host} ${req.originalUrl}`);
  next();
};

app.use(logger);
app.use(express.json());
app.use(cors());

// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => console.log("Mongo Connect"))
//   .catch((err) => console.log(err));

app.use("/api", router);
// app.get("/", (req, res) => {
//   res.send("Hello world");
// });

app.use(errorHandler);
app.listen(PORT, () => console.log(`server ${PORT}`.blue));
