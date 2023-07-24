import dotenv from 'dotenv'
dotenv.config();

export const DB_URL = process.env.DB_URL;
export const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY

export const FILE_STORAGE_ROOT = process.env.FILE_STORAGE_ROOT
export const FILE_MAX_SIZE = process.env.FILE_MAX_SIZE
export const FILE_BUCKET_NAME = process.env.FILE_BUCKET_NAME

export const SERVER_PORT = process.env.SERVER_PORT
export const REDIS_URL = process.env.REDIS_URL