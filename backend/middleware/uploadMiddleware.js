// // uploadMiddleware.js
// import multer from "multer";
// import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
// import dotenv from "dotenv";

// dotenv.config();

// // Configure multer to store file in memory
// const storage = multer.memoryStorage();
// const upload = multer({ storage });

// // Set up an S3 client pointing to Cloudflare R2
// const s3 = new S3Client({
//   endpoint: process.env.R2_ENDPOINT, // e.g., 'https://<bucket-name>.<account-id>.r2.cloudflarestorage.com'
//   region: "auto", // Region set to auto for Cloudflare R2
//   credentials: {
//     accessKeyId: process.env.R2_ACCESS_KEY_ID,
//     secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
//   },
// });

// // Middleware that uploads file and attaches file URL to req object
// export const dynamicUploadMiddleware = [
//   // Step 1: Use multer middleware to handle file upload.
//   upload.single("file"),

//   // Step 2: Upload file to Cloudflare R2
//   async (req, res, next) => {
//     try {
//       // If no file is attached, simply call next()
//       if (!req.file) {
//         return next();
//       }

//       // Get file details from the multer middleware
//       const file = req.file;
//       // Create a unique file name (you could also extend this with additional logic)
//       const fileName = `${Date.now()}-${file.originalname}`;

//       // Setup the PutObject command
//       const command = new PutObjectCommand({
//         Bucket: process.env.R2_BUCKET_NAME,
//         Key: fileName,
//         Body: file.buffer,
//         ContentType: file.mimetype,
//         ACL: "public-read", // enables public access to the file
//       });

//       // Upload the file to Cloudflare R2
//       await s3.send(command);

//       // Construct the public URL for the uploaded file
//       const fileUrl = `${process.env.R2_ENDPOINT}/${fileName}`;

//       // Attach the file URL to the request object for later middlewares or route handler
//       req.fileUrl = fileUrl;

//       // Proceed to the next middleware/route
//       next();
//     } catch (error) {
//       console.error("Error during file upload:", error);
//       next(error);
//     }
//   },
// ];


// uploadMiddleware.js
import multer from "multer";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import dotenv from "dotenv";

dotenv.config();

const storage = multer.memoryStorage();
const upload = multer({ storage });

const s3 = new S3Client({
  endpoint: process.env.R2_ENDPOINT,
  region: "auto",
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
  },
});

export const dynamicUploadMiddleware = [
  upload.single("file"),
  
  async (req, res, next) => {
    try {

      if (!req.file) {
        console.log("❌ No file uploaded.");
        return res.status(400).json({ error: "No file uploaded." });
      }

      const file = req.file;
      const timestamp = Date.now();
      const fileName = `${timestamp}-${file.originalname}`;

      const command = new PutObjectCommand({
        Bucket: process.env.R2_BUCKET_NAME,
        Key: fileName,
        Body: file.buffer,
        ContentType: file.mimetype,
        ACL: "public-read",
      });

      await s3.send(command);

      const fileUrl = `${process.env.R2_DEV}/${fileName}`;

      console.log("✅ Uploaded File URL:", fileUrl);

      req.fileUrl = fileUrl;
      req.fileType = file.mimetype;

      next(); // pass to next middleware/handler
    } catch (error) {
      console.error("❌ Error uploading file:", error);
      return res.status(500).json({ error: "Error uploading file.", details: error.message });
    }
  },
];
