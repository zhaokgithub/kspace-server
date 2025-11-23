import fs from 'fs';
import crypto from 'crypto';
import sharp from 'sharp';



interface CalculateFileMd5Props {
    filePath: string;
    callback?: (md5: string) => void;
}
/**
 * 
 * @param filePath 文件路径 
 * @param callback 回调函数
 * @returns 文件的md5
 */
export const calculateFileMd5 = ({ filePath, callback }: CalculateFileMd5Props) => {
    const hash = crypto.createHash('md5');
    const stat = fs.statSync(filePath)
    if (stat.size < 1024 * 1024 * 100) {
        const buffer: any = fs.readFileSync(filePath);
        hash.update(buffer, 'utf8');
        const md5 = hash.digest('hex');
        callback && callback(md5)
        return md5;
    }
    const fileStream = fs.createReadStream(filePath);
    fileStream.on('data', (chunk: string) => {
        hash.update(chunk, 'utf8');
    })

    fileStream.on('end', () => {
        const md5 = hash.digest('hex');
        callback && callback(md5)
    })
}
/**
 * 将文件保存到本地指定目录
 * @param file 上传的文件对象（含临时路径等信息）
 * @param directory 目标目录
 * @returns 保存后的文件信息
 */
export const saveFileToLocal = (file: any, directory: string): FileDataProps => {
    const { filepath, originalFilename, newFilename, mimetype, size } = file;
    // 确保目录存在
    if (!fs.existsSync(directory)) {
        fs.mkdirSync(directory, { recursive: true });
    }
    const targetPath = `${directory}/${newFilename}`;
    // 移动文件
    fs.renameSync(filepath, targetPath);
    return {
        path: targetPath,
        mimetype,
        name: originalFilename,
        realName: newFilename,
        preDir: directory,
        size,
    };
};



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


export const generateImageThumbnail = async (filePath: any, directory?: string) => {
    const md5 = calculateFileMd5({ filePath })
    const fileThumbnailPngBuffer = await sharp(`${filePath}`).rotate().resize(200).jpeg({ mozjpeg: true }).toBuffer()
    const thumbnailPath = `${directory}/thumbnail_${md5}.jpeg`;
    fs.writeFileSync(thumbnailPath, fileThumbnailPngBuffer);
    return { thumbnailPath, md5, thumbnailName: `thumbnail_${md5}.jpeg` };
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
