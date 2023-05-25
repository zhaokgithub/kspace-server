import mongoose from "mongoose";
import { DB_URL, DB_USER, DB_PWD } from '../helpper/env';


mongoose.connect(DB_URL || '').then(() => {
    console.log('Mongodb Connectd...');
}).catch(err => {
    console.log('err: ', err);

})
//获取connection实例
const db = mongoose.connection;
db.on('disconnected', function (err) {
    console.log('disconnected')
});
db.on('connecting', function (err) {
    console.log('connecting')
});
db.on('connected', function (err) {
    console.log('connected')
});
db.on('open', function (err) {
    console.log('open')
});
db.on('close', function (err) {
    console.log('close')
});
db.on('reconnected', function (err) {
    console.log('reconnected')
});
db.on('error', function (err) {
    console.log('--------error')
});
