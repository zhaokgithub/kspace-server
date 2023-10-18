import mongoose from "../mongo";
const mongoosePaginate = require('mongoose-paginate');

const counterSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    count: { type: Number, required: true, default: 0 },
    createTime: { type: Date },
    updateTime: {type: Date},
});

counterSchema.pre('save', function (next) {
    this.createTime = new Date();
    next();
});
counterSchema.plugin(mongoosePaginate);

const counterModel = mongoose.model('counter', counterSchema,'counter');

export default counterModel;
