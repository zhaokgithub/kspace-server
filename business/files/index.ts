import fileModel from "../../database/model/file"

export const uploadFile = async (ctx: any, next: any) => {
    try {
        let list: any[] = [];
        const data = ctx.request.files;
        const uploadFiles = data.uploadFiles;
        const directory = ctx.request.body.directory;
        console.log('directory: ', directory);
        if (Array.isArray(uploadFiles)) {
            uploadFiles.forEach((file: any) => {
                const { filepath, originalFilename, mimetype, size } = file;
                console.log('file: ', file);
                list.push({ path: filepath, mimetype, name: originalFilename, preDir: directory })
            })
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
        const {path} = data;
    } catch (e) {

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