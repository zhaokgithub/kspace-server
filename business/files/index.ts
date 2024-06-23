import fs from 'fs';
import path, { resolve } from 'path';
import fileModel from "../../database/model/file";
import { FILE_STORAGE_ROOT } from '../../helpper/env';
import { getLocalDirFiles, sendNormalResponse, sendErrorResponse } from '../../helpper/util'
import { getUploadFileType } from './fileHandle'
import { Context, Next } from 'koa'
import { getMinioPresignedPutObject, getMinioPresignedObject, downloadFileObject } from './minioHandle';
import {addQueueTaskList} from './queue'

export const uploadFile = async (ctx: Context, next: Next) => {
    try {
        let data: any = ctx.request.body;
        data.bucketName = data?.bucketName || "istorage-res";
        data.fileType = getUploadFileType(data)
        data.filePath = data.currentDir || "/";
        console.log('data: ', data);
        await fileModel.create(data)
        ctx.body = { msg: "file upload successfully!", code: 1, result: null }
        if(data.fileType === 2){
            console.log('--- upload success ---');
            addQueueTaskList(JSON.stringify(data))
        }

    } catch (e: any) {
        sendErrorResponse(ctx, e)
    }
}
export const createFolder = async (ctx: Context, next: Next) => {
    try {
        const data = ctx.request.body;
        const { currentDir, dirName } = data;
        const filePath = `${currentDir}/${dirName}`;
        await fileModel.create({ name: dirName, realName: dirName, filePath, preDir: `${currentDir}`, type: 1 })
        ctx.body = { msg: "directory create successfully!", code: 1 }
    } catch (e: any) {
        sendErrorResponse(ctx, e)
    }
}
export const downloadFile = async (ctx: Context, next: Next) => {
    try {
        const { fileName} = ctx.request.query;
        const downloadFIlePromise:any = new Promise((resolve, reject) => {
            downloadFileObject({
                fileName: fileName  as string, callback: (fileUrl) => {
                    if(fileUrl){
                        resolve(fileUrl);
                        return
                    }
                    reject()
                }
            })
        })
        const fileUrl = await downloadFIlePromise;
        if (!fileUrl) {
            ctx.body = { msg: "file is not existence!", code: 0 }
            return
        }
        const fileStat = fs.statSync(fileUrl);
        const fileSize = fileStat.size;
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
        const { currentDir, bucketName, type, pageSize, page } = query;
        const limit = pageSize ? pageSize : 10;
        let params: any = { bucketName, isDel: false }
        params.filePath = currentDir || "/";
        console.log('params: ', params);
        const result = await fileModel.paginate(params, { page: page || 1, limit });
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
        const data = ctx.request.body;
        const fileIds = data?.fileIds || [];
        console.log('fileIds: ', fileIds);
        const result = await fileModel.updateMany({ _id: { $in: fileIds } }, { isDel: true })
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
        const params = ctx.request.body
        console.log('params------: ', params);
        const getUploadUrl = new Promise((resolve, reject) => {
            getMinioPresignedPutObject(params, (url, err) => {
                if (url) {
                    resolve(url)
                } else {
                    reject(err)
                }
            })
        })
        const url = await getUploadUrl;
        sendNormalResponse(ctx, { url })
    } catch (e: any) {
        sendErrorResponse(ctx, e)
    }
}
export const generateFileImagePreviewUrl = async (ctx: any, next: Next) => {
    try {
        const params = ctx.request.body
        console.log('params------: ', params);
        const getPreviewUrl = new Promise((resolve, reject) => {
            getMinioPresignedObject(params, (url, err) => {
                console.log('url: ', url);
                if (url) {
                    resolve(url)
                } else {
                    reject(err)
                }
            })
        })
        const url = await getPreviewUrl;
        console.log('url: ', url);
        sendNormalResponse(ctx, { url })
    } catch (e: any) {
        sendErrorResponse(ctx, e)
    }
}