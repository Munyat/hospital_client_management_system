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
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

const app = express();

// CORS configuration
const corsOptions = {
  origin: "*",
  methods: "GET, POST, PUT, DELETE", // Allowed HTTP methods
  allowedHeaders: "Content-Type, Authorization", // Allowed headers
};
app.use(cors(corsOptions)); // Apply CORS middleware with options

// Swagger UI setup
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(morgan("tiny"));
app.use(express.json());

// Define routes
app.use("/api/v1/users", user);
app.use("/api/v1/clients", clients);
app.use("/api/v1/programs", programs);
app.use("/api/v1/enroll", enrollment);

// Home route
app.get("/", (req, res) => {
  res.send("Welcome to the Hospital Management System API!");
});

// Catch-all for unknown routes
app.all(/(.*)/, notFound);

// Error handling middleware
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
