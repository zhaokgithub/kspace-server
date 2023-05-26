import mongoose from "mongoose";
import { DB_URL, DB_USER, DB_PWD } from '../helpper/env';
console.log('DB_URL: ', DB_URL);

const dbOptions = {
    socketTimeoutMS: 0,
    keepAlive: true,
    useNewUrlParser: true,
    user: DB_USER,
    pass: DB_PWD,
};
mongoose.connect(DB_URL || '',dbOptions).then(() => {
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


export default mongoose;