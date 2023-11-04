const fs = require('fs');
const sharp = require('sharp');
const root = process.argv[2] ? process.argv[2] : './';
const thumbnailImage = async (fileList, index) => {
    console.log('index: ', index);
    const fileName = fileList[index];
    const nextIndex = index + 1;
    if (fileName && fileName.includes('.JPG')) {
        console.log('=====', fileName);
        const fileThumbnailPngBuffer = await sharp(`${root}/${fileName}`).rotate().resize(200).jpeg({ mozjpeg: true }).toBuffer()
        fs.writeFileSync(`${root}/${fileName.replace(".JPG", '')}_thumbnail.png`, fileThumbnailPngBuffer)
    }
    if (fileList[nextIndex]) {
        thumbnailImage(fileList, nextIndex)
    }

}
console.log(process.argv);
const fileList = fs.readdirSync(root);
thumbnailImage(fileList, 0)