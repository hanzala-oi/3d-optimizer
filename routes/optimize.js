import express from "express";
import {
  optimizeFromUrl,
  deploymentStatus,
} from "../controllers/optimizeController.js";

const router = express.Router();

/**
 * @swagger
 * /:
 *   get:
 *     summary: Check deployment status
 *     responses:
 *       200:
 *         description: Deployment successful message
 */
router.get("/", deploymentStatus);

/**
 * @swagger
 * /optimize-from-url:
 *   post:
 *     summary: Optimize a GLB file from a Google Drive URL
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               url:
 *                 type: string
 *                 description: URL of the GLB file on Google Drive
 *     responses:
 *       200:
 *         description: The URL of the optimized file in Azure Blob storage
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 optimizedUrl:
 *                   type: string
 *                   description: URL of the optimized GLB file
 *       400:
 *         description: Invalid URL provided
 *       500:
 *         description: Error optimizing the file
 */
router.post("/optimize-from-url", optimizeFromUrl);

export default router;
