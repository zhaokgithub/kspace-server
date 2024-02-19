const Minio = require('minio')

const minioClient = new Minio.Client({
    endPoint: 'play.min.io',
    port: 9000,
    useSSL: true,
    accessKey: 'Q3AM3UQ867SPQQA43P2F',
    secretKey: 'zuf+tfteSlswRu7BJ86wekitnifILbZam1KYY3TG',
})


export const getMinioPresignedPutObject = (bucketName: string, fileName: string, expiryTime: number, callback: (url: string) => void) => {
    minioClient.presignedPutObject('mybucket', 'hello.txt', 24 * 60 * 60, function (err: any, presignedUrl: string) {
        if (err) {
            console.log('err: ', err);
            callback('');
            return
        }
        callback(presignedUrl)
    })
}


