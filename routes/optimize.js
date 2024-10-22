import express from "express";
import {
  optimizeFromUrl,
  deploymentStatus,
} from "../controllers/optimizeController.js"; // Import controller functions

const router = express.Router();

// Route to check if deployment is successful
router.get("/", deploymentStatus);

// Route to handle optimization
router.post("/optimize-from-url", optimizeFromUrl);

export default router;
