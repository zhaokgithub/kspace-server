import mongoose from "../mongo";
const mongoosePaginate = require('mongoose-paginate');

const fileSchema = new mongoose.Schema({
    isDel: { type: Boolean, default: false },
    name: { type: String, required: true },
    currentDir: { type: String },
    //1:文件夹 2:图片 3:文本 4:word文档 5:pdf 6:音频 7:
    fileType: { type: Number },
    size: { type: Number },
    fileMd5: { type: String },
    root: { type: String },
    bucketName: { type: String, default: 'istorage-res' },
    thumbnailPath: { type: String },
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
