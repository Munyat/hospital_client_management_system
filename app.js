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
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

const app = express();

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(morgan("tiny"));
app.use(express.json());

app.use("/api/v1/users", user);
app.use("/api/v1/clients", clients);
app.use("/api/v1/programs", programs);
app.use("/api/v1/enroll", enrollment);

app.get("/", (req, res) => {
  res.send("Welcome to the Hospital Management System API!");
});

app.all(/(.*)/, notFound);

app.use(errorHandlerMiddleware);

const PORT = process.env.PORT || 3005;

const start = async () => {
  try {
    await connectDB(
      "mongodb+srv://briankipkiruimunyat:healthcare@cluster0.g3r77i1.mongodb.net/?retryWrites=true&w=majority&appName=healthcaremanagement"
    );
    app.listen(PORT, () =>
      console.log(`Server is listening on port ${PORT}...`)
    );
  } catch (error) {
    console.error("Failed to start server:", error);
  }
};
start();
