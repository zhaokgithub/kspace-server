import mongoose from "../mongo";
const mongoosePaginate = require('mongoose-paginate');

const fileSchema = new mongoose.Schema({
    isDel: { type: Boolean, default: false },
    name: { type: String, required: true },
    //目录：1 图片：2 文本：3 音频：4 视频：5 pdf：6 其他：7
    type: { type: Number, default: 2 },
    mimetype: { type: String },
    size: { type: Number },
    preDir: { type: String },
    fileMd5: { type: String },
    //root+bucketName+path等于实际路径
    root: { type: String },
    bucketName: { type: String, default: 'istorage-res' },
    objectName: { type: String },
    path: { type: String, required: true },
    downloadUrl: { type: String },
    uploader: { type: String },
    createTime: { type: Date },
    updateTime: { type: Date },
    description: { type: String }
});

fileSchema.pre('save', function (next) {
    this.createTime = new Date();
    this.updateTime = new Date();
    next();
});
fileSchema.plugin(mongoosePaginate);

const fileModel: any = mongoose.model('file', fileSchema, 'file');
export default fileModel;
