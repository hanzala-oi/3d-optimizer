import express from "express";
import optimizeRoutes from "./routes/optimize.js";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import morgan from "morgan";
import cors from "cors";

import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

// Middleware to parse JSON bodies
app.use(express.json());
app.use(cors());

app.use(express.static(path.join(__dirname, "dist")));

// // Swagger definition
// const swaggerDefinition = {
//   openapi: "3.1.0",
//   info: {
//     title: "Optimization API",
//     version: "1.0.0",
//     description: "An API to optimize 3D GLB files and manage deployments",
//   },
//   servers: [
//     {
//       url: `https://3doptimizer.vortexstudio.in`,
//     },
//   ],
// };

// // Options for swagger-jsdoc
// const options = {
//   swaggerDefinition,
//   apis: ["./routes/*.js"], // Path to your route files to be documented
// };

// // Initialize swagger-jsdoc
// const swaggerSpec = swaggerJsdoc(options);

app.use(morgan("combined")); // Use 'combined' format for detailed logs

// Swagger UI route
// app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use("/", optimizeRoutes);

// app.get("/test", (req, res) => {
//   res.send("Test endpoint reached");
// });

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

// Handle 404 errors - Route not found
app.use((req, res, next) => {
  res.status(404).send("404 - Not Found");
});

// Handle other errors
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("500 - Internal Server Error");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  // console.log(
  //   `Swagger docs available at your https://3doptimizer.vortexstudio.in/api-docs`
  // );
});
