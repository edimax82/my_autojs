//你们使用需要删除下面这一行
var out = require("/sdcard/脚本/out.js");

//设置
//发送目标的UID，是一个数组。注意uids和topicIds可以同时填写，也可以只填写一个
var uids = [out.wxpusher_UID];//我的uid

var token = out.wxpusher_AT1//应用：本人的消息通知
var url = 'https://wxpusher.zjiecode.com/api/send/message'
var summary = '测试';//摘要
var content = '测试一下';//内容
var _url = 'http://20020112.tocmcc.cn:5000/';//附带的链接


let r = http.postJson(url,
    {
        appToken: token,
        "content": content,
        "summary": summary,//消息摘要，显示在微信聊天页面或者模版消息卡片上，限制长度100，可以不传，不传默认截取content前面的内容。
        "contentType": 1,//内容类型 1表示文字  2表示html(只发送body标签内部的数据即可，不包括body标签) 3表示markdown 
        "uids":uids,
        "url": _url, //原文链接，可选参数
        "verifyPay": false //是否验证订阅时间，true表示只推送给付费订阅用户，false表示推送的时候，不验证付费，不验证用户订阅到期时间，用户订阅过期了，也能收到。
    });
console.log(r.body.string());