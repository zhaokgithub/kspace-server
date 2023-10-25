import fs from 'fs'
const file = fs.readFileSync('./index.ts')
console.log('file: ', file);