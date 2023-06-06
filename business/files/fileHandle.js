const fs = require('fs');
const path = require('path');
const crypto = require('crypto')


const files = fs.readdirSync(__dirname)
console.log('files: ', files);
const file = fs.statSync(path.resolve(__dirname,'app.ts'))
const file2 = fs.readFileSync(path.resolve(__dirname,'app.ts'))
console.log('file2: ', file2);
console.log('file: ', file);

export const handleMultiPartUpload = ()=>{

}