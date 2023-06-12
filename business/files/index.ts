import fs from 'fs';
import path from 'path';
import fileModel from "../../database/model/file";
import { FILE_STORAGE_ROOT } from '../../helpper/env';
import {getLocalDirFiles} from '../../helpper/util'

export const uploadFile = async (ctx: any, next: any) => {
    try {
        let list: any[] = [];
        const data = ctx.request.files;
        const uploadFiles = data.uploadFiles;
        const directory = ctx.request.body.directory ? ctx.request.body.directory : FILE_STORAGE_ROOT;
        console.log('directory: ', directory);
        if (Array.isArray(uploadFiles)) {
            uploadFiles.forEach((file: any) => {
                const { filepath, originalFilename, newFilename, mimetype, size } = file;
                fs.renameSync(filepath, `${directory}/${newFilename}`)
                const path = `${directory}/${originalFilename}`;
                const fileData = { path, mimetype, name: originalFilename, realName: newFilename, preDir: directory, size };
                list.push(fileData)
            })
        } else {
            const { filepath, originalFilename, newFilename, mimetype, size } = uploadFiles;
            fs.renameSync(filepath, `${directory}/${newFilename}`)
            const path = `${directory}/${originalFilename}`;
            const fileData = { path, mimetype, name: originalFilename, realName: newFilename, preDir: directory, size };
            list.push(fileData)
        }
        console.log('upload directory: ', directory);
        const result = await fileModel.create(list)
        ctx.body = { msg: "file upload successfully!", code: 1 }
    } catch (e) {
        console.log('e: ', e);
        ctx.body = { msg: "failed!", code: 0 }
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
        ctx.body = { msg: "failed!", code: 0 }
    }
}
export const downloadFile = async (ctx: any, next: any) => {
    try {
        const { filePath, fileName } = ctx.request.query;
        const fileUrl = path.resolve(FILE_STORAGE_ROOT || '', filePath);
        const fileStat = fs.statSync(fileUrl);
        const fileSize = fileStat.size;
        ctx.set('Content-Length', fileSize.toString())
        ctx.response.attachment(fileName);
        const fileStream = fs.createReadStream(fileUrl);
        ctx.body = fileStream;
    } catch (e) {
        console.log('e: ', e);
        ctx.body = { msg: "failed!", code: 0 }

    }
}

export const getCurrentDirList = async (ctx: any, next: any) => {
    try {
        const query = ctx.request.query;
        const { currentDir, bucketName } = query;
        const preDir = currentDir ? currentDir : `${FILE_STORAGE_ROOT}/${bucketName}}`
        console.log('preDir: ', preDir);
        const result = await fileModel.find({ preDir:'E:\\tmp'})
        console.log('{ preDir }: ', { preDir });
        console.log('result: ', result);
        ctx.body = { msg: "successfully!", code: 1, result }
    } catch (e) {
        console.log('e: ', e);
        ctx.body = { msg: "failed!", code: 0 }

    }
}

//首次部署项目使用
export const uploadLocalDirFiles = async (ctx: any, next: any) => {
    try {
        const data = ctx.request.body;
        console.log('data: ', data);
        const { directory } = data;
        const dir = directory ? directory : FILE_STORAGE_ROOT;
        const fileList: any[] = getLocalDirFiles(dir);
        const result =await fileModel.create(fileList);
        console.log('result: ', result);
        ctx.body = { msg: "successfully!", code: 1, result }
    } catch (e) {
        console.log('e: ', e);
        ctx.body = { msg: "failed!", code: 0 }
    }
}

export const getDeletedFiles = async (ctx: any, next: any) => {
    try {
        const result = await fileModel.find({ isDel: true })
        ctx.body = { msg: "successfully!", code: 1, result }
    } catch (e) {
        console.log('e: ', e);
        ctx.body = { msg: "failed!", code: 0 }
    }
}