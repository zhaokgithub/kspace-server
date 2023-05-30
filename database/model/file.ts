import mongoose from "../mongo";

const fileSchema = new mongoose.Schema({
    fileName: { type: String, required: true },
    filePath: { type: String, required: true },
    fileType: { type: Number, required: true },
    fileSize: { type: Number },
    isDir: { type: Boolean, default: false, required: true },
    downloadUrl: { type: String },
    uploader: { type: String },
    createTime: { type: Date },
    updateTime: { type: Date },
});

fileSchema.pre('save', function (next) {
    this.createTime = new Date();
    next();
});

const fileModel = mongoose.model('file', fileSchema, 'file');
export default fileModel;
