const Minio = require('minio');
import { tmpdir } from 'os';
import { MINIO_CLIENT_ACCESSKEY, MINIO_CLIENT_HOST, MINIO_CLIENT_PORT, MINIO_CLIENT_SECRETKEY } from '../../helpper/env';
console.log('MINIO_CLIENT_ACCESSKEY: ', MINIO_CLIENT_ACCESSKEY);

const minioClient = new Minio.Client({
    endPoint: MINIO_CLIENT_HOST,
    port: Number(MINIO_CLIENT_PORT),
    useSSL: false,
    accessKey: MINIO_CLIENT_ACCESSKEY,
    secretKey: MINIO_CLIENT_SECRETKEY,
})

interface PutObjectParams {
    bucketName: string;
    fileName: string;
    expiryTime: number;
}
export const getMinioPresignedPutObject = ({ bucketName, fileName, expiryTime }: PutObjectParams, callback: (url: string, err?: any) => void) => {
    const bucket = bucketName || "istorage-res";
    minioClient.presignedPutObject(bucket, fileName, 24 * 60 * 60, function (err: any, presignedUrl: string) {
        console.log('presignedUrl: ', presignedUrl);
        if (err) {
            console.log('create presigned url error : ', err);
            callback('', err);
            return
        }
        callback(presignedUrl)
    })
}
export const getMinioPresignedObject = ({ bucketName, fileName, expiryTime }: PutObjectParams, callback: (url: string, err?: any) => void) => {
    const bucket = bucketName || "istorage-res";
    minioClient.presignedGetObject(bucket, fileName, 24 * 60 * 60, {
        'response-content-disposition': 'inline',
        'response-content-type': 'image/jpeg',
        'x-amz-meta-preview': 'true'
    }, function (err: any, presignedUrl: string) {
        console.log('presignedUrl: ', presignedUrl);
        if (err) {
            console.log('create presigned url error : ', err);
            callback('', err);
            return
        }
        callback(presignedUrl)
    })
}

interface FileObjectParams {
    bucketName?: string;
    fileName: string;
    filePath?: string;
    callback?: (filePath: string | null) => void;
}


export const uploadFileToMinioObject = ({ bucketName, fileName, filePath }: FileObjectParams) => {
    const bucket = bucketName || "istorage-res";

    minioClient.fPutObject(bucket, fileName, filePath, function (err: any, objInfo: any) {
        if (err) {
            return console.log(err)
        }
        console.log('Success', objInfo.etag, objInfo.versionId)
    })
}


export const downloadFileObject = async ({ bucketName, fileName, callback }: FileObjectParams) => {
    try {
        const bucket = bucketName || "istorage-res";
        const tpmFile = `${__dirname}/tmp/${fileName}`;
        await minioClient.fGetObject(bucket, fileName, tpmFile)
        if(callback){
            callback && callback(tpmFile);
            return 
        }
        return tpmFile
    } catch (err) {
        console.log('E: ', err);
        callback && callback(null);
        return null
    }
}

