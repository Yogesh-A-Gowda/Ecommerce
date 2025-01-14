import { v2 as cloudinary } from "cloudinary";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Get the directory of the current file
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Example: Resolving the .env file path
import dotenv from 'dotenv';
dotenv.config({ path: `${__dirname}/../.env` });

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default cloudinary;