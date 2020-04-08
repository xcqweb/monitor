var Mongoose = require('mongoose');
var SiteModel = require('../models/siteModel');
var ApiModel = require('../models/apiModel');
var ConsoleModel = require('../models/consoleModel');
var ErrorModel = require('../models/error');
var FocusClickModel = require('../models/focusClickModel');
var JsModel = require('../models/jsModel');
var PerfModel = require('../models/perfModel');
var PvModel = require('../models/pvModel');
var ResourceModel = require('../models/resourceModel');
var UserModel = require('../models/userModel');
var ScheduleTask=require('./scheduleTask');
var util = require('../utils/util');
var mongoose = require('mongoose');
/* system listing. */
exports.delSite = function(req, res, next) {
    const appKey = req.body.id;
    Promise.all([new Promise( (resolve, reject) => {
        ApiModel.deleteMany({ appKey }, function(err, r) {
            if (err) {
                reject({msg: 'ApiModel 删除失败!', status: -1});
            } else {
                resolve({msg:'ApiModel 删除成功!',status: 0});
            }
        });
    }),
    new Promise( (resolve, reject) => {
        ConsoleModel.deleteMany({ appKey }, function(err, r) {
            if (err) {
                reject({msg: 'ConsoleModel 删除失败!', status: -1});
            } else {
                resolve({msg:'ConsoleModel 删除成功!',status: 0});
            }
        });
    }),
    new Promise( (resolve, reject) => {
        ErrorModel.deleteMany({ appKey }, function(err, r) {
            if (err) {
                reject({msg: 'ErrorModel 删除失败!', status: -1});
            } else {
                resolve({msg:'ErrorModel 删除成功!',status: 0});
            }
        });
    }),
    new Promise( (resolve, reject) => {
        FocusClickModel.deleteMany({ appKey }, function(err, r) {
            if (err) {
                reject({msg: 'FocusClickModel 删除失败!', status: -1});
            } else {
                resolve({msg:'FocusClickModel 删除成功!',status: 0});
            }
        });
    }),
    new Promise( (resolve, reject) => {
        JsModel.deleteMany({ appKey }, function(err, r) {
            if (err) {
                reject({msg: 'JsModel 删除失败!', status: -1});
            } else {
                resolve({msg:'JsModel 删除成功!',status: 0});
            }
        });
    }),
    new Promise( (resolve, reject) => {
        PerfModel.deleteMany({ appKey }, function(err, r) {
            if (err) {
                reject({msg: 'PerfModel 删除失败!', status: -1});
            } else {
                resolve({msg:'PerfModel 删除成功!',status: 0});
            }
        });
    }),
    new Promise( (resolve, reject) => {
        PvModel.deleteMany({ appKey }, function(err, r) {
            if (err) {
                reject({msg: 'PvModel 删除失败!', status: -1});
            } else {
                resolve({msg:'PvModel 删除成功!',status: 0});
            }
        });
    }),
    new Promise( (resolve, reject) => {
        ResourceModel.deleteMany({ appKey }, function(err, r) {
            if (err) {
                reject({msg: 'ResourceModel 删除失败!', status: -1});
            } else {
                resolve({msg:'ResourceModel 删除成功!',status: 0});
            }
        });
    }),
    new Promise( (resolve, reject) => {
        SiteModel.deleteMany({ id: appKey }, function(err, r) {
            if (err) {
                reject({msg: 'SiteModel 删除失败!', status: -1});
            } else {
                resolve({msg:'SiteModel 删除成功!',status: 0});
            }
        });
    })]).then( (resp) => {
        res.json(util.resJson({
            IsSuccess: true,
            Data: resp,
        }));
    }, error => {
        res.json(util.resJson({
            IsSuccess: false,
            Data: error,
        }));
    })
    // ApiModel.deleteMany({ appKey });
    // ConsoleModel.deleteMany({ appKey });
    // ErrorModel.deleteMany({ appKey });
    // FocusClickModel.deleteMany({ appKey });
    // JsModel.deleteMany({ appKey });
    // PerfModel.deleteMany({ appKey });
    // PvModel.deleteMany({ appKey });
    // ResourceModel.deleteMany({ appKey });
    // SiteModel.deleteOne({ id: appKey }, function(err, r) {
    //     if (!err) {
    //         res.json(util.resJson({
    //             IsSuccess: true,
    //             Data: r
    //         }));
    //     } else {
    //         res.json(util.resJson({
    //             IsSuccess: false,
    //             Data: null
    //         }));
    //     }
    // });
}

exports.getAppkey = function(req, res, next) {
    SiteModel.find({ site: req.headers.origin }, function(err, r) {
        if (!err) {
            res.json(util.resJson({
                IsSuccess: true,
                Data: r
            }));
        } else {
            res.json(util.resJson({
                IsSuccess: false,
                Data: null
            }));
        }
    });
}

exports.list = function(req, res, next) {
    console.dir(req.headers.origin)
    if(req.userId==="5c3dce2b5a0e170a74e608c6"){
        SiteModel.find(function(err, r) {
            if (!err) {
                res.json(util.resJson({
                    IsSuccess: true,
                    Data: r
                }));
            } else {
                res.json(util.resJson({
                    IsSuccess: false,
                    Data: null
                }));
            }
        });
    }else{
        SiteModel.find({ userId: req.userId }, function(err, r) {
            if (!err) {
                res.json(util.resJson({
                    IsSuccess: true,
                    Data: r
                }));
            } else {
                res.json(util.resJson({
                    IsSuccess: false,
                    Data: null
                }));
            }
        });
    }
};

exports.create = function(req, res, next) {
    var ObjectId = mongoose.Types.ObjectId;
    var id1 = new ObjectId;
    var temp = new SiteModel({
        appName: req.body.appName,
        site: req.body.site,
        monitorSite: req.body.monitorSite,
        disableHook: false,
        disableJS: false,
        appKey: id1,
        id: id1,
        userId: req.userId
    });
    temp.save(function(err, r) {
        console.log(err);
        if (!err) {
            res.json(util.resJson({
                IsSuccess: true,
                Data: r
            }));
        } else {
            res.json(util.resJson({
                IsSuccess: false,
                Data: null
            }));
        }
    });
};

exports.updateAppName = function(req, res, next) {
    let id = new Mongoose.Types.ObjectId(req.body.id);
    // temp.find({appName: req.body.appName}, function(err, r) {
    //     if (!err && r.length) {
    //         res.json(util.resJson({
    //             IsSuccess: true,
    //             message: '名称重复',
    //         }));
    //     }else{
            SiteModel.findOneAndUpdate({
                id: id
            }, {
                appName: req.body.appName,
            }, function(err, r) {
                if (!err) {
                    res.json(util.resJson({
                        IsSuccess: true,
                        Data: null
                    }));
                } else {
                    res.json(util.resJson({
                        IsSuccess: false,
                        Data: null
                    }));
                }
            });
    //     }
    // })
};

exports.update = function(req, res, next) {
    let id = new Mongoose.Types.ObjectId(req.body.id);
    SiteModel.findOneAndUpdate({
        id: id
    }, {
        disableHook: req.body.disableHook,
        disableJS: req.body.disableJS,
        disableResource: req.body.disableResource,
        site: req.body.site,
        monitorSite: req.body.monitorSite,
    }, function(err, r) {
        if (!err) {
            res.json(util.resJson({
                IsSuccess: true,
                Data: null
            }));
        } else {
            res.json(util.resJson({
                IsSuccess: false,
                Data: null
            }));
        }
    });
};

//js错误报警
exports.alarmJsErrorUpdate = function(req, res, next) {
    let id = new Mongoose.Types.ObjectId(req.body.id);
    ScheduleTask.createTask({
        appKey: req.body.id,
        email: req.body.email,
        alarmType:"jsError",
        times: req.body.alarmTimes,
        state: req.body.alarmState,
        limitValue: req.body.alarmLimit
    });

    SiteModel.findOneAndUpdate({
        id: id
    }, {
        alarmJsState: req.body.alarmState,
        alarmJsLimit: req.body.alarmLimit,
        alarmJsTimes: req.body.alarmTimes,
        alarmJsEmail: req.body.email
    }, function(err, r) {
        if (!err) {
            res.json(util.resJson({
                IsSuccess: true,
                Data: null
            }));
        } else {
            res.json(util.resJson({
                IsSuccess: false,
                Data: null
            }));
        }
    });
};

//api错误报警
exports.alarmApiErrorUpdate = function(req, res, next) {
    let id = new Mongoose.Types.ObjectId(req.body.id);
    ScheduleTask.createTask({
        appKey: req.body.id,
        email: req.body.email,
        alarmType:"apiError",
        times: req.body.alarmTimes,
        state: req.body.alarmState,
        limitValue: req.body.alarmLimit
    });

    SiteModel.findOneAndUpdate({
        id: id
    }, {
        alarmApiState: req.body.alarmState,
        alarmApiLimit: req.body.alarmLimit,
        alarmApiTimes: req.body.alarmTimes,
        alarmApiEmail: req.body.email
    }, function(err, r) {
        if (!err) {
            res.json(util.resJson({
                IsSuccess: true,
                Data: null
            }));
        } else {
            res.json(util.resJson({
                IsSuccess: false,
                Data: null
            }));
        }
    });
};

//perf报警
exports.alarmPerfSpeedUpdate = function(req, res, next) {
    let id = new Mongoose.Types.ObjectId(req.body.id);
    ScheduleTask.createTask({
        appKey: req.body.id,
        email: req.body.email,
        alarmType:"perfSpeed",
        times: req.body.alarmTimes,
        state: req.body.alarmState,
        limitValue: req.body.alarmLimit
    });

    SiteModel.findOneAndUpdate({
        id: id
    }, {
        alarmPerfState: req.body.alarmState,
        alarmPerfLimit: req.body.alarmLimit,
        alarmPerfTimes: req.body.alarmTimes,
        alarmPerfEmail: req.body.email
    }, function(err, r) {
        if (!err) {
            res.json(util.resJson({
                IsSuccess: true,
                Data: null
            }));
        } else {
            res.json(util.resJson({
                IsSuccess: false,
                Data: null
            }));
        }
    });
};