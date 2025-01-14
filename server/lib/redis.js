import Redis from "ioredis"
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Get the directory of the current file
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Example: Resolving the .env file path
import dotenv from 'dotenv';
dotenv.config({ path: `${__dirname}/../.env` });



//console.log(process.env.UPSTASH_REDIS_URL)
export const redis = new Redis(process.env.UPSTASH_REDIS_URL);
await redis.set('foo', 'bar');