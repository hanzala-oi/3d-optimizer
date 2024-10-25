import express from "express";
import optimizeRoutes from "./routes/optimize.js";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const app = express();
const PORT = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Swagger definition
const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Optimization API",
    version: "1.0.0",
    description: "An API to optimize 3D GLB files and manage deployments",
  },
  servers: [
    {
      url: `https://3doptimizer.vortexstudio.in`,
    },
  ],
};

// Options for swagger-jsdoc
const options = {
  swaggerDefinition,
  apis: ["./routes/*.js"], // Path to your route files to be documented
};

// Initialize swagger-jsdoc
const swaggerSpec = swaggerJsdoc(options);

// Swagger UI route
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use("/", optimizeRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Swagger docs available at your URL /api-docs`);
});
