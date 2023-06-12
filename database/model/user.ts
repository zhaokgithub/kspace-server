import mongoose from "../mongo";

const userSchema = new mongoose.Schema({
    isDel:{type:Boolean,default:false},
    account: { type: String, required: true, unique: true },
    userName: { type: String, required: true},
    password: { type: String, required: true },
    role: { type: Number, required: true, default: 3 },
    email: { type: String, },
    createTime: { type: Date },
    updateTime: { type: Date },
});

userSchema.pre('save', function (next) {
    this.createTime = new Date();
    this.updateTime = new Date();
    next();
});

const counterModel = mongoose.model('user', userSchema, 'user');
export default counterModel;
