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
  const fileUrl = req.body.url || req.query.url;
  if (!fileUrl) return res.status(400).send("Google Drive URL is required");

  const inputFilePath = path.join("/tmp", "original.glb");
  const optimizedFilePath = path.join("/tmp", "optimized.glb");

  try {
    await downloadFile(fileUrl, inputFilePath);
    await optimizeGLB(inputFilePath, optimizedFilePath);

    const optimizedFileName = `optimized-${Date.now()}.glb`;
    const azureBlobUrl = await uploadToAzureBlob(
      optimizedFilePath,
      optimizedFileName
    );

    res.status(200).send({ optimizedUrl: azureBlobUrl });
  } catch (error) {
    console.error("Error optimizing file:", error.message);
    res.status(500).json({ error: `Error optimizing file: ${error.message}` });
  } finally {
    try {
      if (fs.existsSync(inputFilePath)) await fs.promises.unlink(inputFilePath);
      if (fs.existsSync(optimizedFilePath))
        await fs.promises.unlink(optimizedFilePath);
    } catch (cleanupError) {
      console.error("Error cleaning up files:", cleanupError.message);
    }
  }
};
