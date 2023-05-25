import dotenv from 'dotenv'
const env: any = dotenv.config();

export const DB_URL = env.NODE_DB_URL;
export const DB_USER = env.NODE_DB_USER;
export const DB_PWD = env.NODE_DB_PWD;