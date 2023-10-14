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
        ctx.body = { msg: "file upload successfully!", code: 1,result }
    } catch (e) {
        console.log('e: ', e);
        ctx.body = { msg: "failed!", code: 0 }
    }
}
export const createFolder = async (ctx: any, next: any) => {
    try {
        const data = ctx.request.body;
        const { currentDir, dirName } = data;
        const dirPath = `${FILE_STORAGE_ROOT}${currentDir}/${dirName}`;
        console.log('FILE_STORAGE_ROOT',FILE_STORAGE_ROOT)
        if (fs.existsSync(dirPath)) {
            ctx.body = { msg: "directory is exist!", code: 0 }
            return
        }
        fs.mkdirSync(`${dirPath}`);
        await fileModel.create({ name: dirName,realName:dirName, path: dirPath, preDir: `${FILE_STORAGE_ROOT}${currentDir}`, type: 1 })
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
        const isExist = fs.existsSync(fileUrl);
        if(!isExist){
            ctx.body = { msg: "file is not existence!", code: 0 }
            return
        }
        console.log('isExist: ', isExist);
        const file = fs.readFileSync(fileUrl)
        const fileStat = fs.statSync(fileUrl);
        const fileSize = fileStat.size;
        console.log('==== file size ===',fileSize)
        console.log(fileUrl)
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
        const preDir = currentDir ? `${FILE_STORAGE_ROOT}${currentDir}` : `${FILE_STORAGE_ROOT}${bucketName}`
        console.log('FILE_STORAGE_ROOT::: ', JSON.parse(JSON.stringify(FILE_STORAGE_ROOT)));

        console.log('preDir: ', preDir);
        const result = await fileModel.find({ preDir:preDir})
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
        const data:any = ctx.request.body || {};
        const { directory } = data;
        console.log('directory: ', directory);
        const dir = directory ? directory : FILE_STORAGE_ROOT;
        const fileList: any[] = getLocalDirFiles(dir);
        const result =await fileModel.create(fileList);
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