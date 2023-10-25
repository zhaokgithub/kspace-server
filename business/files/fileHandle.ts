const fs = require('fs');
const path = require('path');
const crypto = require('crypto')

export const handleMultiPartUpload = ()=>{

}

export const calculateFileMd5 = (filePath:string,callback:()=>void)=>{
    const hash = crypto.createHash('md5');
    const stat = fs.statSync('./index.ts')
    if(stat.size  < 1024*1024*100){
        const buffer = fs.readFileSync(filePath);
        hash.update(buffer,'utf8');
        const md5 = hash.digest('hex');
        return md5;
    }
    const fileStream = fs.createReadStream('./index.ts');
    fileStream.on('data', (chunk:string)=>{
        hash.update(chunk,'utf8');
    })

    fileStream.on('end',()=>{
        const md5 = hash.digest('hex');
        console.log('md5: ', md5);
    })

}