import {MonitorJS} from './monitor/monitorjs.js';
import axios from 'axios';
import Vue from 'vue';
import bundle from './bundle.js';
const isEmpty = (val) => val === '' || val === null || val === undefined;
function monitor(config = {}) {
    function monitor_config({appKey, monitorSite, disableHook, disableJS, disableResource}) {
      if (config.debugger) {
        debugger;
      }
      new MonitorJS().init({
        url: `${config.upUrl ? config.upUrl : monitorSite}/Up/error`, //错误上报地址
        consoleError: !isEmpty(config.consoleError)  ? config.consoleError : true, //配置是否需要记录console.error错误信息
        vueError: !isEmpty(config.vueError) ? config.vueError : true, //配置是否需要记录vue错误信息
        promiseError: !isEmpty(config.promiseError) ? config.promiseError : false,
        ajaxError: !isEmpty(config.ajaxError) ? config.ajaxError : false,
        vue: Vue, //如需监控vue错误信息，则需要传入vue
        query: {
          appKey, //项目唯一ID
        },
      });
      const VARBLE = '__ml';
      window[VARBLE] = window[VARBLE] || (window[VARBLE] = {});
      window[VARBLE].config = { 
        userId: '', 
        appKey, 
        imgUrl: `${config.upUrl ? config.upUrl : monitorSite}/Up?`,
        disableHook: disableHook, 
        disableJS: disableJS, 
        disableResource: disableResource, 
       };
       bundle();
    }
    axios.get(config.getAppkeyUrl ? config.getAppkeyUrl : 'http://localhost:9000/Monitor/getAppkey').then( ({data: {Data}}) => {
      if (config.debugger) {
        debugger;
      }
      if (Data && Data.length) {
        monitor_config(Data[0]);
        console.log('监控初始化成功!');
      } else{
        console.error('监控初始化失败!');
      }
    }, () => {
      console.error('监控初始化失败!');
    });
}
export default monitor;