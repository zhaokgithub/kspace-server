const fs = require('fs');
const path = require('path');
const crypto = require('crypto')

export const handleMultiPartUpload = ()=>{

}

export const calculateFileMd5 = (filePath:string)=>{
    const md5 = crypto.createHash('md5');
    const file = fs.readFileSync(filePath);
    
}