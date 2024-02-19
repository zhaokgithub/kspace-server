import dotenv from 'dotenv'
dotenv.config();

//数据连接地址
export const DB_URL = process.env.DB_URL;
//服务端口号
export const SERVER_PORT = process.env.SERVER_PORT
//redis连接地址
export const REDIS_URL = process.env.REDIS_URL
//权限secret key
export const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY


//文件存储根路径
export const FILE_STORAGE_ROOT = process.env.FILE_STORAGE_ROOT
//上传文件最大尺寸限制
export const FILE_MAX_SIZE = process.env.FILE_MAX_SIZE
//文件存储的桶值
export const FILE_BUCKET_NAME = process.env.FILE_BUCKET_NAME
//minio host
export const MINIO_CLIENT_HOST = process.env.MINIO_CLIENT_HOST
//minio port
export const MINIO_CLIENT_PORT = process.env.MINIO_CLIENT_PORT
//minio secret key
export const MINIO_CLIENT_SECRETKEY = process.env.MINIO_CLIENT_SECRETKEY
//minio access key
export const MINIO_CLIENT_ACCESSKEY = process.env.MINIO_CLIENT_ACCESSKEY
