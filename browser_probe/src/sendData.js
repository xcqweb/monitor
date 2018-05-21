
import { params } from './util';
import { performanceTime } from './performance';
import { terminalInfo } from './terminalInfo';

//上报api数据
function uploadUserData(type, ext) {
  switch (type) {
    case 1:
      sendPerfData()
      break;
    case 2:
      sendApiData(ext)
      break;
    case 3:
      sendJsErrData(ext)
      break;
    default:
      console.log('未定义类型');
      break;
  }

}

// 发送性能数据
function sendPerfData() {
  var temp = { type: 'perf', page: location.host };
  _.extend(temp, terminalInfo, performanceTime);
  send(temp);
}
// 发送api请求数据
function sendApiData(ext) {
  var temp = { type: 'api', page: location.href };
  _.extend(temp, terminalInfo, ext);
  send(temp);
}

// 发送js错误数据
function sendJsErrData(ext) {
  var temp = { type: 'js', page: location.href };
  _.extend(temp, terminalInfo, ext);
  send(temp);
}

// 发送数据
function send(param) {
  console.log(param, 123);
  let img = new Image();
  img.src = window.__ml && window.__ml.config.imgUrl + params(param);
  img.onload = img.onerror = function () {
    img = undefined;
  };
}

export { uploadUserData }