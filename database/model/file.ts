import mongoose from "../mongo";
const mongoosePaginate = require('mongoose-paginate');

const fileSchema = new mongoose.Schema({
    isDel: { type: Boolean, default: false },
    fileName: { type: String, required: true },
    filePath: { type: String },
    type: { type: String },
    //1:文件夹 2: 图片 3: 文本 4: word 5: pdf
    fileType: { type: Number },
    size: { type: Number },
    fileMd5: { type: String },
    bucketName: { type: String, default: 'istorage-res' },
    thumailPath: { type: String },
    //文件上传时间
    uploadTime: {type:Date},
    updateTime: { type: Date },
    uploader: { type: String },
    uploaderId: { type: String },
    //时间文件的创建时间
    createTime: { type: Date },
    creatorName: { type: String },
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
