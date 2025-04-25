const express = require("express");

const morgan = require("morgan");
const connectDB = require("./db/connect");
require("dotenv").config();
const clients = require("./routes/clientRoutes");
const notFound = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

const app = express();

app.use(morgan("tiny"));
app.use(express.json());

// app.get("/", (req, res) => res.send("Health Care Management System API"));

app.use("/api/v1/clients", clients);

app.all(/(.*)/, notFound);

app.use(errorHandlerMiddleware);

const PORT = process.env.PORT || 3005;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(PORT, console.log(`Server is listening port ${PORT}...`));
  } catch (error) {}
};
start();
