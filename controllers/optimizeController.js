import {
  downloadFile,
  optimizeGLB,
  uploadToAzureBlob,
} from "../utils/fileUtils.js";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

// To handle __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Controller function for checking deployment status
export const deploymentStatus = (req, res) => {
  res.send("Project deployed successfully");
};

// Controller function to handle optimization request
export const optimizeFromUrl = async (req, res) => {
  const fileUrl = req.body.url; // Google Drive URL from the body
  if (!fileUrl) return res.status(400).send("Google Drive URL is required");

  // Use /tmp directory for temp file storage
  const inputFilePath = path.join("/tmp", "original.glb");
  const optimizedFilePath = path.join("/tmp", "optimized.glb");

  try {
    // Step 1: Download the GLB file
    await downloadFile(fileUrl, inputFilePath);

    // Step 2: Optimize the GLB file
    await optimizeGLB(inputFilePath, optimizedFilePath);

    // Step 3: Upload the optimized file to Azure Blob Storage
    const optimizedFileName = `optimized-${Date.now()}.glb`;
    const azureBlobUrl = await uploadToAzureBlob(
      optimizedFilePath,
      optimizedFileName
    );

    // Step 4: Return the download link for the optimized file
    res.status(200).send({ optimizedUrl: azureBlobUrl });
  } catch (error) {
    console.error("Error optimizing file:", error.message);
    res.status(500).send(`Error optimizing file: ${error.message}`);
  } finally {
    // Clean up temp files
    try {
      if (fs.existsSync(inputFilePath)) fs.unlinkSync(inputFilePath);
      if (fs.existsSync(optimizedFilePath)) fs.unlinkSync(optimizedFilePath);
    } catch (cleanupError) {
      console.error("Error cleaning up files:", cleanupError.message);
    }
  }
};
