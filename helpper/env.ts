import dotenv from 'dotenv'
console.log('ENV: ', dotenv.config());

export const DB_URL = process.env.NODE_DB_URL;
export const DB_USER = process.env.NODE_DB_USER;
export const DB_PWD = process.env.NODE_DB_PWD;