const Minio = require('minio');
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

interface FileObjectParams {
    bucketName: string;
    fileName: string;
    filePath?: string;
    callback?: (filePath:string)=> void;
}


export const uploadFileToMinioObject = ({ bucketName, fileName, filePath }: FileObjectParams) => {
    const bucket = bucketName || "istorage-res";

    const metaData = {
        'Content-Type': 'text/html',
        'Content-Language': 123,
        'X-Amz-Meta-Testing': 1234,
        example: 5678,
    }
    minioClient.fPutObject(bucket, fileName, filePath, metaData, function (err: any, objInfo: any) {
        if (err) {
            return console.log(err)
        }
        console.log('Success', objInfo.etag, objInfo.versionId)
    })
}


export const downloadFileObject = ({ bucketName, fileName,callback }: FileObjectParams) => {
    const bucket = bucketName || "istorage-res";
    const tpmFile = `${__dirname}/tmp/${fileName}`;
    minioClient.fGetObject(bucket, fileName, tpmFile, function (err: any) {
        if (err) {
            return console.log(err)
        }
        console.log('file download success!',tpmFile)
        callback && callback(tpmFile);
    })
}

