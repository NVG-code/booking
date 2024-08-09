import dotenv from "dotenv";

dotenv.config();

export const AUTH_SECRET_KEY = process.env.AUTH_SECRET_KEY;
export const SENTRY_DSN = process.env.SENTRY_DSN;
