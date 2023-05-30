import mongoose from "../mongo";

const fileSchema = new mongoose.Schema({
    account: { type: String,},
    userName: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: Number, required: true, default: 3 },
    email: { type: String, },
    createTime: { type: Date },
    updateTime: { type: Date },
});

fileSchema.pre('save', function (next) {
    this.createTime = new Date();
    next();
});

const fileModel = mongoose.model('file', fileSchema, 'file');
export default fileModel;
