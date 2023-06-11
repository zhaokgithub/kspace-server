import mongoose from "mongoose";
import { DB_URL } from '../helpper/env';
console.log('DB_URL: ', DB_URL);


mongoose.connect(DB_URL || '')
//获取connection实例
const db = mongoose.connection;
db.on('disconnected', function (err) {
    console.log('disconnected')
});
db.on('connecting', function (err) {
    console.log('connecting')
});
db.on('connected', function (err) {
    console.log('mongodb connected successfully!')
});
db.on('close', function (err) {
    console.log('close')
});
db.on('reconnected', function (err) {
    console.log('reconnected')
});
db.on('error', function (err) {
    console.log('err: ', err);
    console.log('--------error')
});


export default mongoose;