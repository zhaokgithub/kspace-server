import fastq from 'fastq';
import { generateImageThumbnail, generateImageThumbnailBatch, getUploadFileType } from './fileHandle';
import { downloadFileObject, uploadFileToMinioObject } from './minioHandle';

// 上传文件任务
export const excuteUploadThumbnailTask = async (arg: any, callback: any) => {
    console.log('start excute task')
    if (arg) {
        const fileData = JSON.parse(arg);
        const tpmFilePath = await downloadFileObject({ bucketName: fileData?.bucketName, fileName: fileData?.fileName })
        const thumbnailData = await generateImageThumbnail(tpmFilePath, __dirname);
        const { thumbnailPath, thumbnailName } = thumbnailData;
        uploadFileToMinioObject({
            objectName: `/thumbnail/${thumbnailName}`, filePath: thumbnailPath,
            callback: (filePath) => {
                callback(thumbnailData, 'success');
            }
        })
        return
    }
    callback(null, 'success')
}

const queue = fastq(excuteUploadThumbnailTask, 1);

export const addQueueTaskList = (arg: string) => {
    console.log('arg: ', arg);
    queue.push(arg, (err, result) => {
        if (err) { throw err }
        console.log('the result is', result)
    })
}

