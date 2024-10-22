import axios from "axios";
import fs from "fs";
import { BlobServiceClient } from "@azure/storage-blob";
import dotenv from "dotenv";
import gltfPipeline from "gltf-pipeline";

const { processGlb } = gltfPipeline;

// Load environment variables from .env file
dotenv.config();

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

// Optimization function using gltf-pipeline
export async function optimizeGLB(inputFilePath, outputFilePath) {
  try {
    const glbBuffer = fs.readFileSync(inputFilePath);

    // Define the optimization options
    const options = {
      dracoOptions: { compressionLevel: 7 }, // Geometry compression
      preserveUnusedSemantics: false, // Removes unused semantics
      compressTextures: true, // Enable texture compression
      textureCompressionOptions: {
        // Options for texture compression
        format: "ktx2", // Use KTX2 format for textures
        quality: 75, // Texture quality percentage
      },
      simplify: true, // Enable mesh simplification
      simplifyOptions: {
        // Mesh simplification options
        targetError: 0.1, // The target error for simplification (0 = no simplification, 1 = aggressive simplification)
      },
      optimizeForCesium: false, // Specific optimization for Cesium
      removeUnusedMaterials: true, // Remove unused materials
    };

    // Process the GLB with all the optimizations
    const results = await processGlb(glbBuffer, options);

    fs.writeFileSync(outputFilePath, results.glb);
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
