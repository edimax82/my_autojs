/*
版本号：1.0.0
作者@liuyz_0112  QQ：1269367656  小白一个，代码仅供参考
不管怎么样，要是有的话请看注释，有些地方需要修改的，我都在注释里面写清楚了，不会改自己百度，动动脑子谁都能会
*/

//你们使用需要删除下面这一行
var out = require("/sdcard/脚本/out.js");

//设置 
var token = out.pushplus_token;//从下方网址中获取tocken即可，不用要删除
var url = "http://www.pushplus.plus/send";

//获取日期
var data = new Date()
var y = data.getFullYear()
var m = data.getMonth()
var d = data.getDate()
console.log("获取日期");

//开启悬浮窗
console.show();//打开控制台 
console.setSize(700, 700);
console.setPosition(300, 1350);
console.log("打卡开始 ^_^");

//解锁屏幕
device.wakeUp()
sleep(600)
gesture(200, [500, 1300], [500, 500])
console.log('解锁屏幕');
sleep(1000)

//开启无障碍 
auto();
console.log("开启无障碍");

//设置分辨率 
setScreenMetrics(1080, 2400);
console.log("设置分辨率");

//开始续期
app.openUrl('https://www.ddnsto.com/app/#/devices');
console.log("打开网址");
sleep(1500);

className("android.view.View").id('main').findOne().child(0).child(2).child(0).child(7).click()
console.log("点击免费通道");
sleep(1000);

className("android.widget.Button").text("购买新通道").findOne().click();
console.log("点击_购买新通道");
sleep(1000);

className("android.view.View").text("4Mbps 7天试用").depth(13).findOne().click();
console.log("点击_4Mbps 7天试用");

var w = className("android.widget.TextView").text("绑定成功").findOne(6000);
//如果找到控件
if (w != null) {
    let title = 'ddnsto续期成功，到期时间为' + (m + 1) + "月" + (d + 7) + "日"
    let r = http.postJson(url, {
        token: token,
        title: title,
        content: '续期成功',
    });
    log('续期成功')
} else {
    //否则提示没有找到
    let title = 'ddnsto续期操作失败'
    let r = http.postJson(url, {
        token: token,
        title: title,
        content: '续期失败',
    });
    log('续期失败')
}

home()
console.log("返回桌面");

//隐藏悬浮窗 
console.hide()