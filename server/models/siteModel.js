var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var schema = new Schema({
    appName: String,
    disableHook: Boolean,
    disableJS: Boolean,
    disableResource: Boolean,
    createTime: { type: Date, default: Date.now },
    updateTime: { type: Date, default: Date.now },
    appKey: Schema.Types.ObjectId,
    site: String, //监控站点服务的ip 或 域名
    monitorSite: String, //监控项目部署服务的ip 或 域名
    id: Schema.Types.ObjectId,
    state: String,
    userId: String,

    alarmJsState:{ type: Boolean, default: false },
    alarmJsLimit:Number,
    alarmJsTimes:Number,
    alarmJsEmail:String,

    alarmApiState:{ type: Boolean, default: false },
    alarmApiLimit:Number,
    alarmApiTimes:Number,
    alarmApiEmail:String,

    alarmPrefState:{ type: Boolean, default: false },
    alarmPrefLimit:Number,
    alarmPrefTimes:Number,
    alarmPrefEmail:String,
});

module.exports = mongoose.model('SiteDataInfo', schema);