const express = require("express");

const morgan = require("morgan");
const connectDB = require("./db/connect");
require("dotenv").config();
const user = require("./routes/userRoutes");
const clients = require("./routes/clientRoutes");
const programs = require("./routes/programRoutes");
const enrollment = require("./routes/enrollmentRoutes");
const notFound = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

const app = express();

app.use(morgan("tiny"));
app.use(express.json());

app.use("/api/v1/users", user);
app.use("/api/v1/clients", clients);
app.use("/api/v1/programs", programs);
app.use("/api/v1/enroll", enrollment);

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
