import Stripe from "stripe";

import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Get the directory of the current file
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Example: Resolving the .env file path
import dotenv from 'dotenv';
dotenv.config({ path: `${__dirname}/../.env` });

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);