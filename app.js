const express = require("express");

const morgan = require("morgan");
const connectDB = require("./db/connect");
require("dotenv").config();

const app = express();

app.use(morgan("tiny"));
app.use(express.json());

app.get("/", (req, res) => res.send("Health Care Management System API"));

const PORT = process.env.PORT || 3005;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(PORT, console.log(`Server is listening port ${PORT}...`));
  } catch (error) {}
};
start();
