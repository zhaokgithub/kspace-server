import fs from 'fs';
import crypto from 'crypto';
import sharp from 'sharp';
import path from 'path'



interface CalculateFileMd5Props {
    filePath: string;
    callback?: (md5: string) => void;
}
export const calculateFileMd5 = ({ filePath, callback }: CalculateFileMd5Props) => {
    const hash = crypto.createHash('md5');
    const stat = fs.statSync(path.resolve(__dirname,'index.ts'))
    if (stat.size < 1024 * 1024 * 100) {
        const buffer: any = fs.readFileSync(filePath);
        hash.update(buffer, 'utf8');
        const md5 = hash.digest('hex');
        callback && callback(md5)
        return md5;
    }
    const fileStream = fs.createReadStream('./index.ts');
    fileStream.on('data', (chunk: string) => {
        hash.update(chunk, 'utf8');
    })

    fileStream.on('end', () => {
        const md5 = hash.digest('hex');
        callback && callback(md5)
    })
}



interface FileDataProps {
    path: string;
    mimetype: string;
    name: string;
    realName: string;
    preDir: string;
    size: number;
    fileName?: string;
    thumbnail?: string;
}

/**
 * 
 * @param file 
 * @param directory  保存文件的目录
 * @returns 文件信息
 */
export const saveFileToLocal = (file: any, directory: string): FileDataProps => {
    const { filepath, originalFilename, newFilename, mimetype, size } = file;
    fs.renameSync(filepath, `${directory}/${newFilename}`)
    const filePath: string = `${directory}/${newFilename}`;
    const md5 = calculateFileMd5({ filePath })
    const fileData = { path: filePath, mimetype, name: originalFilename, realName: newFilename, preDir: directory, size, md5 };
    return fileData;
}

export const generateImageThumbnail = async (filePath: any, directory?: string) => {
    const md5 = calculateFileMd5({ filePath })
    const fileThumbnailPngBuffer = await sharp(`${filePath}`).rotate().resize(200).jpeg({ mozjpeg: true }).toBuffer()
    const thumbnailPath = `${directory}/thumbnail_${md5}.jpeg`;
    fs.writeFileSync(thumbnailPath, fileThumbnailPngBuffer);
    return {thumbnailPath,md5,thumbnailName: `thumbnail_${md5}.jpeg`};
}

export const generateImageThumbnailBatch = async (fileList: any[], directory: string) => {
    const list = fileList.map(async file => {
        return await generateImageThumbnail(file?.realName, directory)
    })
    return Promise.all(list);
    // const fileThumbnailPngBuffer = await sharp(`${directory}/${fileName}`).rotate().resize(200).jpeg({ mozjpeg: true }).toBuffer()
    // fs.writeFileSync(`${directory}/${fileName.replace(".JPG", '')}_thumbnail.png`, fileThumbnailPngBuffer)
    // return `${fileName.replace(".JPG", '')}_thumbnail.png`;
}
interface UploadFileParams {
    fileType: 1 | 2 | 3 | 4 | 5;//1:文件夹 2: 图片 3: 文本 4: word 5: pdf
    type: string;
}
/**
 * 
 * @param data 
 * @returns fileType(1:文件夹 2: 图片 3: 文本 4: word 5: pdf)
 */
export const getUploadFileType = (data: UploadFileParams) => {
    if (data.fileType) {
        return data.fileType;
    }
    const type = data.type;
    if (type.startsWith('image/')) {
        return 2
    }
    if (type.startsWith('/pdf')) {
        return 5
    }
    return 6

}
