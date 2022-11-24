/*
版本号：1.3.0
作者@liuyz_0112  QQ：1269367656  小白一个，代码仅供参考
需要先将“我的wps会员”小程序添加到我的小程序里面，就是首页下滑的那里
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

//打开微信
var appName = "微信";
launchApp(appName);
console.log("打开微信成功");
sleep(1000)

//返回微信首页
for (var i = 0; i < 10; i++) {
    if (id("f2s").className("android.widget.TextView").text("微信").exists()) {
        var list = id("f2s").className("android.widget.TextView").text("微信").findOne().bounds();
        click(list.centerX(), list.centerY());
        log('已在首页');
        break;
    } else {
        back();
        log('返回');
        sleep(500);
    }
}
sleep(700)

if (id("fe").exists()) {
    var list = id("fe").findOne().bounds();
    click(list.centerX(), list.centerY());
    click(list.centerX(), list.centerY());
    log('返回最顶端');
    sleep(500)
}

descContains("我的WPS会员").findOne().click()//
console.log("打开我的WPS会员小程序")
sleep(3500)

//判断是否需要跳过广告
if (className("android.view.View").text("跳过").exists()) {
    click("跳过")
    console.log('跳过广告');
} else {
    console.log('无广告');
}
sleep(1000)


if (className("android.view.View").text("免费领会员").exists()) {
    console.log('成功打开打卡界面');
} else {
    console.log('未成功打开打卡界面');
    exit;
}

//找到打卡按钮并点击
if (className("android.widget.Button").text("参与免费领会员").exists()) {
    className("android.widget.Button").text("参与免费领会员").findOne().click()
    log('点击_参与免费领会员')
} else {
    if (className("android.widget.Button").text("立即打卡，分会员").exists()) {
        className("android.widget.Button").text("立即打卡，分会员").findOne().click()
        log('点击_立即打卡')
    } else {
        if (className("android.view.View").text("20:00瓜分会员").exists()) {
            log('显示_20:00瓜分会员')
            exit();
        } else {
            log('已完成打卡')
            exit();
        }
    }
}
sleep(2000)

if (className("android.widget.Button").depth('26').text("确定").exists()) {
    log('已打开验证界面，开始暴力验证')
    for (var i = 0; i < 100; i++) {
        if (className("android.widget.Button").depth('26').text("确定").exists()) {
            click(690, 1200)
            click(390, 1200)
            var h = className("android.widget.Button").depth('26').text("确定").findOne().bounds();
            click(h.centerX(), h.centerY());
            log('第' + (i + 1) + '次尝试')
            sleep(800)
        } else {
            log('第一次验证成功');
            break;
        }
    }
    sleep(1500)
} else {
    log('未打开打卡界面，退出脚本');
    exit();
}

//第二次验证
liebiao = [/.*无限.*/, /.*2G.*/, /.*文档修复.*/, /.* WPS.*/]
for (let i = 0; i < liebiao.length; i++) {
    var pp = depth('26').textMatches(liebiao[i])
    if (pp.exists()) {
        log('开始第二次验证');
        var m = pp.findOnce().bounds()
        click(m.centerX(), m.centerY());
        log('找到了答案' + liebiao[i]);
        sleep(1000);
        click('确认');
        log("点击确认");
        break;
    } else {
        console.log('未找到' + liebiao[i])
    }
}
log('循环结束')

var w = text('我知道了').findOne(6000);
//如果找到控件
if (w != null) {
    let title = 'WPS打卡成功' + m + '月' + d + "日"
    let r = http.postJson(url, {
        token: token,
        title: title,
        content: '续期成功',
    });
} else {
    //否则提示没有找到
    let title = 'WPS打卡失败-' + m + '月' + d + "日"
    let r = http.postJson(url, {
        token: token,
        title: title,
        content: '续期失败',
    });
}

if (text('我知道了').exists()) {
    log('打卡成功')
    click('我知道了')
} else {
    log('失败')
}

home()
console.log("返回桌面");

//隐藏悬浮窗 
sleep(2000)
console.hide()





