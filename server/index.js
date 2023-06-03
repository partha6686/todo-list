const express = require("express");
const cors = require("cors");
const mongooseConnect = require("mongoose").connect;
const dotenvConfig = require("dotenv").config;

const app = express();
app.use(cors({ credentials: true, origin: true }));
app.use(express.json()); // for json
app.use(express.urlencoded({ extended: true })); // for form data

dotenvConfig();
const todoRoutes = require("./Routes/todo");


app.use("/todo", todoRoutes);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  mongooseConnect(process.env.MONGODB_URL);
  console.log("Connected to MongoDB on port " + PORT);
});