var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var schema = new Schema({
    createTime: { type: Date, default: Date.now },
    updateTime: { type: Date, default: Date.now },
    appKey: Schema.Types.ObjectId,
    level : String,
    category : String,
    msg : String,
    url : String,
    line : Number,
    col : Number,
    errorObj : Object,
    SubCategory: String,
    LogType: String,
    LogInfo: String,
});

module.exports = mongoose.model('ErrorDataInfo', schema);