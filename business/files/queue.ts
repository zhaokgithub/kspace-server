import fastq from 'fastq';
import { generateImageThumbnail, generateImageThumbnailBatch, getUploadFileType } from './fileHandle';
import { downloadFileObject, uploadFileToMinioObject } from './minioHandle';

// 上传文件任务
export const excuteUploadThumbnailTask = async (arg: any, callback: any) => {
    console.log('start excute task')
    try {
        if (arg) {
            const fileData = JSON.parse(arg);
            const tpmFilePath = await downloadFileObject({ bucketName: fileData?.bucketName, fileName: fileData?.fileName })
            if (!tpmFilePath) {
                console.log(`${tpmFilePath} 文件不存在！`);
                return
            }
            const thumbnailData = await generateImageThumbnail(tpmFilePath, `${__dirname}/tmp`);
            const { thumbnailPath, thumbnailName } = thumbnailData;
            uploadFileToMinioObject({
                objectName: `/thumbnail/${thumbnailName}`, filePath: thumbnailPath,
                callback: (filePath) => {
                    callback(null, thumbnailData);
                }
            })
            return
        }
        callback(null, 'success')
    } catch (e) {
        callback(e, arg)

    }
}

const queue = fastq(excuteUploadThumbnailTask, 1);

export const addQueueTaskList = (arg: string) => {
    queue.push(arg, (err, result) => {
        if (err) {
            console.log('queue: ', err);
            return
        }
        console.log('the result is', result)
    })
}

