const Minio = require('minio');
import {MINIO_CLIENT_ACCESSKEY,MINIO_CLIENT_HOST,MINIO_CLIENT_PORT,MINIO_CLIENT_SECRETKEY} from '../../helpper/env';
console.log('MINIO_CLIENT_PORT: ', MINIO_CLIENT_PORT);

const minioClient = new Minio.Client({
    endPoint: '39.104.93.152',
    port: 9092,
    useSSL: false,
    accessKey: 'umpeHqkVwyLF2bLx8Fdr',
    secretKey: 'BKqDgabUvQpFDk7nYSAyugKuQNeiIHjs5ubwAc0J',
})

interface PutObjectParams {
    bucketName: string;
    fileName: string;
    expiryTime: number;
}
export const getMinioPresignedPutObject = ({ bucketName, fileName, expiryTime }: PutObjectParams, callback: (url: string,err?:any) => void) => {
    console.log('bucketName: ', bucketName);
    minioClient.presignedPutObject(bucketName, fileName, 24 * 60 * 60, function (err: any, presignedUrl: string) {
        console.log('presignedUrl: ', presignedUrl);
        if (err) {
            console.log('err333 : ', err);
            callback('',err);
            return
        }
        callback(presignedUrl)
    })

}


