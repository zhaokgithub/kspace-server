import fileModel from "../../database/model/file";
import fs from 'fs';
import { FILE_STORAGE_ROOT } from '../../helpper/env';

export const uploadFile = async (ctx: any, next: any) => {
    try {
        let list: any[] = [];
        const data = ctx.request.files;
        const uploadFiles = data.uploadFiles;
        const directory = ctx.request.body.directory;
        if (Array.isArray(uploadFiles)) {
            uploadFiles.forEach((file: any) => {
                const { filepath, originalFilename, mimetype, size } = file;
                list.push({ path: filepath, mimetype, name: originalFilename, preDir: directory, size })
            })
        } else {
            const { filepath, originalFilename, mimetype, size } = uploadFiles;
            list.push({ path: filepath, mimetype, name: originalFilename, preDir: directory, size })
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
        const { preDir, dirName } = data;
        const dirPath = preDir ? `${preDir}/${dirName}` : `${FILE_STORAGE_ROOT}/${dirName}`
        if (fs.existsSync(dirPath)) {
            ctx.body = { msg: "directory is exist!", code: 0 }
            return
        }
        fs.mkdirSync(`${dirPath}`);
        await fileModel.create({ name: dirName, path: dirPath, preDir: preDir || FILE_STORAGE_ROOT, type: 1 })
        ctx.body = { msg: "directory create successfully!", code: 1 }
    } catch (e) {
        console.log('e: ', e);
    }
}
export const downloadFile = async (ctx: any, next: any) => {
    try {
        const data = ctx.request.body;
    } catch (e) {

    }
}

export const getCurrentDirList = async (ctx: any, next: any) => {
    try {
        const data = ctx.request.body;
    } catch (e) {

    }
}