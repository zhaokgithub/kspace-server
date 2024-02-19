import fs from 'fs';
import path from 'path';
import fileModel from "../../database/model/file";
import { FILE_STORAGE_ROOT } from '../../helpper/env';
import { getLocalDirFiles, sendNormalResponse, sendErrorResponse } from '../../helpper/util'
import { generateImageThumbnail, generateImageThumbnailBatch } from './fileHandle'
import { Context, Next } from 'koa'
import { getMinioPresignedPutObject } from './minioHandle';


export const uploadFile = async (ctx: Context, next: Next) => {
    try {
        let list: any[] = [];
        const data = ctx.request.files;
        const uploadFiles = data ? data.uploadFiles : [];
        let directory = ctx.request.body.directory ? ctx.request.body.directory : '';
        directory = directory ? `${FILE_STORAGE_ROOT}${directory}` : FILE_STORAGE_ROOT;
        if (Array.isArray(uploadFiles)) {
            list = await generateImageThumbnailBatch(uploadFiles, directory);
        } else {
            const fileData = await generateImageThumbnail(uploadFiles, directory);
            list.push(fileData)
        }
        console.log('upload directory: ', directory);
        const result = await fileModel.create(list)
        ctx.body = { msg: "file upload successfully!", code: 1, result: null }
    } catch (e: any) {
        sendErrorResponse(ctx, e)
    }
}
export const createFolder = async (ctx: Context, next: Next) => {
    try {
        const data = ctx.request.body;
        const { currentDir, dirName } = data;
        const dirPath = `${FILE_STORAGE_ROOT}${currentDir}/${dirName}`;
        console.log('FILE_STORAGE_ROOT', FILE_STORAGE_ROOT)
        if (fs.existsSync(dirPath)) {
            ctx.body = { msg: "directory is exist!", code: 0 }
            return
        }
        fs.mkdirSync(`${dirPath}`);
        await fileModel.create({ name: dirName, realName: dirName, path: dirPath, preDir: `${FILE_STORAGE_ROOT}${currentDir}`, type: 1 })
        ctx.body = { msg: "directory create successfully!", code: 1 }
    } catch (e: any) {
        sendErrorResponse(ctx, e)
    }
}
export const downloadFile = async (ctx: Context, next: Next) => {
    try {
        const { filePath, fileName } = ctx.request.query;
        const fileUrl = path.resolve(FILE_STORAGE_ROOT || '', filePath as string);
        const isExist = fs.existsSync(fileUrl);
        if (!isExist) {
            ctx.body = { msg: "file is not existence!", code: 0 }
            return
        }
        console.log('isExist: ', isExist);
        const fileStat = fs.statSync(fileUrl);
        const fileSize = fileStat.size;
        console.log('==== file size ===', fileSize)
        console.log(fileUrl)
        ctx.set('Content-Length', fileSize.toString())
        ctx.response.attachment(fileName as string);
        const fileStream = fs.createReadStream(fileUrl);
        ctx.body = fileStream;
    } catch (e: any) {
        sendErrorResponse(ctx, e)

    }
}

export const getCurrentDirList = async (ctx: Context, next: Next) => {
    try {
        const query = ctx.request.query;
        const { currentDir, bucketName, pageSize, page } = query;
        const limit = pageSize ? pageSize : 10;
        const preDir = currentDir ? `${FILE_STORAGE_ROOT}${currentDir}` : `${FILE_STORAGE_ROOT}${bucketName}`
        console.log('FILE_STORAGE_ROOT::: ', JSON.parse(JSON.stringify(FILE_STORAGE_ROOT)));
        const result = await fileModel.paginate({ preDir: preDir }, { page: page || 1, limit });
        const data = {
            total: result?.total,
            list: result?.docs,
            page: result?.page,
            pageSize: result?.limit
        }
        ctx.body = { msg: "successfully!", code: 1, data }
    } catch (e: any) {
        sendErrorResponse(ctx, e)

    }
}

//首次部署项目使用
export const uploadLocalDirFiles = async (ctx: Context, next: Next) => {
    try {
        const data: any = ctx.request.body || {};
        const { directory } = data;
        console.log('directory: ', directory);
        const dir = directory ? directory : FILE_STORAGE_ROOT;
        const fileList: any[] = getLocalDirFiles(dir);
        const result = await fileModel.create(fileList);
        ctx.body = { msg: "successfully!", code: 1, result }
    } catch (e: any) {
        sendErrorResponse(ctx, e)
    }
}

export const deleteFile = async (ctx: Context, next: Next) => {
    try {
        const result = await fileModel.update({}, { isDel: true })
        ctx.body = { msg: "successfully!", code: 1, result }
    } catch (e: any) {
        sendErrorResponse(ctx, e)
    }
}


export const getDeletedFiles = async (ctx: any, next: Next) => {
    try {
        const result = await fileModel.find({ isDel: true })
        sendNormalResponse(ctx, result)
    } catch (e: any) {
        sendErrorResponse(ctx, e)
    }
}


export const generateFileShareLink = async (ctx: any, next: Next) => {
    try {
        const result = await fileModel.find({ isDel: true })
        sendNormalResponse(ctx, result)
    } catch (e: any) {
        sendErrorResponse(ctx, e)
    }
}
export const generateFileUploadUrl = async (ctx: any, next: Next) => {
    try {
        const params = ctx.query
        console.log('params: ', params);
        const getUploadUrl= new Promise((resolve,reject)=>{
            getMinioPresignedPutObject(params,(url,err)=>{
                if(url){
                    resolve(url)
                }else{
                    reject(err)
                }
            })
        })
        const url = await getUploadUrl;
        console.log('url: ', url);

        sendNormalResponse(ctx, {url})
    } catch (e: any) {
        sendErrorResponse(ctx, e)
    }
}