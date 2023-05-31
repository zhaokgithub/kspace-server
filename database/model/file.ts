import mongoose from "../mongo";

const fileSchema = new mongoose.Schema({
    name: { type: String, required: true },
    path: { type: String, required: true },
    mimetype: { type: String },
    size: { type: Number },
    preDir: { type: String },
    fileMd5: { type: String },
    bucketName: { type: String, default: 'istorage-res' },
    downloadUrl: { type: String },
    uploader: { type: String },
    createTime: { type: Date },
    updateTime: { type: Date },
    description: { type: String }
});

fileSchema.pre('save', function (next) {
    this.createTime = new Date();
    next();
});

const fileModel = mongoose.model('file', fileSchema, 'file');
export default fileModel;
