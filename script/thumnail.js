/**
 * 生成缩略图脚本
 * arg1：文件根目录
 * 
 */
const fs = require('fs');
const sharp = require('sharp');
const crypto = require('crypto');

const root = process.argv[2] ? process.argv[2] : './';
const thumbnailImage = async (fileList, index) => {
    console.log('index: ', index);
    const fileName = fileList[index];
    const nextIndex = index + 1;
    if (fileName && fileName.includes('.JPG')) {
        console.log('=====', fileName);
        const fileThumbnailPngBuffer = await sharp(`${root}/${fileName}`).rotate().resize(200).jpeg({ mozjpeg: true }).toBuffer();
        const hash = crypto.createHash('md5');
        const newName = hash.update(fileThumbnailPngBuffer.toString());
        console.log('newName: ', newName);
        fs.writeFileSync(`${root}/${newName}_thumbnail.png`, fileThumbnailPngBuffer)
    }
    if (fileList[nextIndex]) {
        thumbnailImage(fileList, nextIndex)
    }

}
console.log(process.argv);
const fileList = fs.readdirSync(root);
thumbnailImage(fileList, 0)