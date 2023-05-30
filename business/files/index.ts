import fileModel from "../../database/model/file"

export const uploadFile = async (ctx: any, next: any) => {
  try {
    const data = ctx.request.files;
    const fileList = data.fileList
    fileList.forEach((file: any) => {
      console.log('file: ', file);
      const {filePath,originalFilename} = file;

    })
  } catch (e) {
    console.log('e: ', e);

  }
}

export const downloadFile = async (ctx: any, next: any) => {

}

export const getCurrentDirList = async () => {

}