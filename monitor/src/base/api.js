/**
 * 数据持久化
 */
class API {

    constructor(url){
        this.url = url;
        this.query = query;
    }
    
    /**
     * 上报信息 （默认方式）
     */
    report(data, query){
        // if(!this.checkUrl(this.url)){
        //     console.log("上报信息url地址格式不正确,url=",this.url);
        //     return;
        // }
        this.sendInfo(data, query);
    }

    /**
     * 发送消息
     */
    reportByImg(data){
        try {
            var xhr = new XMLHttpRequest();
            xhr.open("POST",this.url,true);
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            xhr.send(JSON.stringify(data));
        } catch (error) {
            console.log(error);
        }
    }

    /**
     * 通过img方式上报信息
     */
    // reportByImg(data){
        sendInfo(data){
        // if(!this.checkUrl(this.url)){
        //     console.log("上报信息url地址格式不正确,url=",this.url);
        //     return;
        // }
        let params = data;
        if (window.query) {
            params = {...data, ...window.query};
        }
        try {
            var img = new Image();
            img.src = this.url+'?v='+new Date().getTime()+'&' + this.formatParams(params);
        } catch (error) {
            console.log(error);
        }
    }

    /*
     *格式化参数
     */
    formatParams(data) {
        var arr = [];
        for (var name in data) {
            arr.push(encodeURIComponent(name) + "=" + encodeURIComponent(data[name]));
        }
        return arr.join("&");
    }

    /**
     * 检测URL
     */
    checkUrl(url){
        if(!url){
            return false;
        }
        var urlRule =/^[hH][tT][tT][pP]([sS]?):\/\/(\S+\.)+\S{2,}$/;
        return urlRule.test(url);
    }

}
export default API;