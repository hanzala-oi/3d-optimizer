import axios from "axios";
import pkg from "gltf-pipeline";
const { processGlb } = pkg;
import { promisify } from "util";
import fs from "fs";
import { BlobServiceClient } from "@azure/storage-blob";
import dontenv from "dotenv";

// Load environment variables from .env file
dontenv.config();

// Azure Blob Storage setup
const account = "3deditor";
const sas = process.env.SAS_KEY;

const blobServiceClient = new BlobServiceClient(
  `https://${account}.blob.core.windows.net/?${sas}`
);
const containerClient = blobServiceClient.getContainerClient("models");

// Function to handle Google Drive URL conversion
function getGoogleDriveDirectDownloadUrl(driveUrl) {
  const fileIdMatch = driveUrl.match(/\/d\/([a-zA-Z0-9_-]+)/);
  if (!fileIdMatch || fileIdMatch.length < 2) {
    throw new Error("Invalid Google Drive URL");
  }
  const fileId = fileIdMatch[1];
  return `https://drive.google.com/uc?export=download&id=${fileId}`;
}

// Function to download a file (supports Google Drive URLs)
export async function downloadFile(fileUrl, outputLocationPath) {
  try {
    if (fileUrl.includes("drive.google.com")) {
      fileUrl = getGoogleDriveDirectDownloadUrl(fileUrl);
    }

    const writer = fs.createWriteStream(outputLocationPath);

    const response = await axios({
      url: fileUrl,
      method: "GET",
      responseType: "stream",
    });

    response.data.pipe(writer);

    return new Promise((resolve, reject) => {
      writer.on("finish", resolve);
      writer.on("error", reject);
    });
  } catch (error) {
    throw new Error(`Failed to download file: ${error.message}`);
  }
}

// Optimization function using gltf-pipeline with Draco compression
export async function optimizeGLB(inputFilePath, outputFilePath) {
  try {
    const readFile = promisify(fs.readFile);
    const writeFile = promisify(fs.writeFile);

    // Read the input GLB file
    const inputData = await readFile(inputFilePath);

    // Apply multiple optimizations
    const options = {
      dracoOptions: {
        compressionLevel: 10, // Set the compression level (1-10) for Draco compression
      },
      removeUnusedElements: true, // Remove unused nodes, meshes, materials
      quantize: true, // Apply quantization to reduce the precision of vertex attributes
      generateMipmaps: true, // Generate mipmaps for better rendering performance
      // binary: true, // Convert GLTF to GLB format if necessary (optional)
    };

    const results = await processGlb(inputData, options);

    // Write the optimized GLB file to the output path
    await writeFile(outputFilePath, results.glb);

    return outputFilePath;
  } catch (error) {
    throw new Error(`gltf-pipeline error: ${error.message}`);
  }
}

// Function to upload a file to Azure Blob Storage
export async function uploadToAzureBlob(filePath, fileName) {
  try {
    const blobClient = containerClient.getBlockBlobClient(fileName);
    const fileStream = fs.createReadStream(filePath);
    await blobClient.uploadStream(fileStream, fs.statSync(filePath).size);
    return blobClient.url;
  } catch (error) {
    throw new Error(`Failed to upload file to Azure: ${error.message}`);
  }
}
