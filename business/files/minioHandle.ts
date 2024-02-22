const Minio = require('minio');
import { MINIO_CLIENT_ACCESSKEY, MINIO_CLIENT_HOST, MINIO_CLIENT_PORT, MINIO_CLIENT_SECRETKEY } from '../../helpper/env';
console.log('MINIO_CLIENT_PORT: ', MINIO_CLIENT_PORT);

const minioClient = new Minio.Client({
    endPoint: MINIO_CLIENT_HOST,
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

export const uploadFileToMinioObject = () => {

}

interface DownloadFileObjectParams{
    bucketName: string;
    filename: string;
}
export const downloadFileObject = () => {
    minioClient.fGetObject('mybucket', 'photo.jpg', '/tmp/photo.jpg', function (err: any) {
        if (err) {
            return console.log(err)
        }
        console.log('success')
    })
}

