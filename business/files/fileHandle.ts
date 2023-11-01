const fs = require('fs');
const path = require('path');
const crypto = require('crypto')

/**
 * 
 * @param file 
 * @param directory  保存文件的目录
 * @returns 文件信息
 */
export const saveFileToLocal = (file: any, directory: string) => {
    const { filepath, originalFilename, newFilename, mimetype, size } = file;
    fs.renameSync(filepath, `${directory}/${newFilename}`)
    const path = `${directory}/${newFilename}`;
    const fileData = { path, mimetype, name: originalFilename, realName: newFilename, preDir: directory, size };
    return fileData;
}

interface CalculateFileMd5Props {
    filePath: string;
    callback?: (md5: string) => void;
}
export const calculateFileMd5 = ({ filePath, callback }: CalculateFileMd5Props) => {
    const hash = crypto.createHash('md5');
    const stat = fs.statSync('./index.ts')
    if (stat.size < 1024 * 1024 * 100) {
        const buffer = fs.readFileSync(filePath);
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