import dotenv from 'dotenv'
dotenv.config();

export const DB_URL = process.env.DB_URL;
console.log('process: ', process.env);
export const DB_USER = process.env.DB_USER;
export const DB_PWD = process.env.DB_PWD;