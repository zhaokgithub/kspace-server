import mongoose from "../mongo";

const counterSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    count: { type: Number, required: true, default: 0 },
    countId: {type:Number,require:true,default:1,unique: true},
    createTime: { type: Date },
    updateTime: {type: Date},
});

counterSchema.pre('save', function (next) {
    this.createTime = new Date();
    next();
});

const counterModel = mongoose.model('counter', counterSchema,'counter');
export default counterModel;
