import fileModel from "../../database/model/file";
import fs from 'fs';
import path from 'path';
import { FILE_STORAGE_ROOT } from '../../helpper/env';

export const uploadFile = async (ctx: any, next: any) => {
    try {
        let list: any[] = [];
        const data = ctx.request.files;
        const uploadFiles = data.uploadFiles;
        const directory = ctx.request.body.directory;
        if (Array.isArray(uploadFiles)) {
            uploadFiles.forEach((file: any) => {
                const { filepath, originalFilename, newFilename, mimetype, size } = file;
                const path = filepath.replace(FILE_STORAGE_ROOT, '')
                const fileData = { path, mimetype, name: originalFilename, realName: newFilename, preDir: directory, size };
                list.push(fileData)
            })
        } else {
            const { filepath, originalFilename, newFilename, mimetype, size } = uploadFiles;
            console.log('uploadFiles: ', uploadFiles);
            const path = filepath.replace(FILE_STORAGE_ROOT, '')
            const fileData = { path, mimetype, name: originalFilename, realName: newFilename, preDir: directory, size };
            list.push(fileData)
        }
        const result = await fileModel.create(list)
        ctx.body = { msg: "file upload!", code: 1 }
    } catch (e) {
        console.log('e: ', e);

    }
}
export const createFolder = async (ctx: any, next: any) => {
    try {
        const data = ctx.request.body;
        const { currentDir, dirName } = data;
        const dirPath = `${currentDir}/${dirName}`;
        if (fs.existsSync(dirPath)) {
            ctx.body = { msg: "directory is exist!", code: 0 }
            return
        }
        fs.mkdirSync(`${dirPath}`);
        await fileModel.create({ name: dirName, path: dirPath, preDir: currentDir || FILE_STORAGE_ROOT, type: 1 })
        ctx.body = { msg: "directory create successfully!", code: 1 }
    } catch (e) {
        console.log('e: ', e);
    }
}
export const downloadFile = async (ctx: any, next: any) => {
    try {
        const { filePath, fileName } = ctx.request.query;
        const fileUrl = path.resolve(FILE_STORAGE_ROOT || '', filePath);
        ctx.response.attachment(fileName);
        const fileStream = fs.createReadStream(fileUrl);
        let progress = 0;
        fileStream.on('data', (chunk) => {
            progress += chunk.length;
        })
        ctx.body = fileStream;
    } catch (e) {
        console.log('e: ', e);

    }
}

export const getCurrentDirList = async (ctx: any, next: any) => {
    try {
        const query = ctx.request.query;
        const { currentDir, bucketName } = query;
        const preDir = currentDir ? currentDir : `${FILE_STORAGE_ROOT}/${bucketName}}`
        const result = await fileModel.find({ preDir })
        ctx.body = { msg: "successfully!", code: 1, result }
    } catch (e) {
        console.log('e: ', e);

    }
}