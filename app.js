import express from "express";
import optimizeRoutes from "./routes/optimize.js";

const app = express();
const PORT = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Routes
app.use("/", optimizeRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
