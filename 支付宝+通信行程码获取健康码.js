/*
版本：1.4.0
作者@liuyz_0112  QQ：1269367656  小白一个，代码仅供参考
不管怎么样，要是有的话请看注释，有些地方需要修改的，我都在注释里面写清楚了，不会改自己百度，动动脑子谁都能会

注意：尽在小米10上测试过，不一定适配其他机型，相关参数需要在下方的设置中修改
如果中间有卡壳，请自行查看日志排错

*/

//解锁屏幕
device.wakeUp()
sleep(600)
gesture(200, [500, 1300], [500, 500])
console.log('解锁屏幕');

//获取日期
var data = new Date()
var y = data.getFullYear()
var m = data.getMonth()
var d = data.getDate()
console.log("获取日期");

//你们使用需要删除下面这一行
var out = require("/sdcard/脚本/out.js");

//设置 
var token = out.pushplus_token;//从下方网址中获取tocken即可，不用要删除
var url = "http://www.pushplus.plus/send";
var wenzi = ''

// 开启线程
threads.start(function () {
    var beginBtn;
    if (beginBtn = classNameContains("Button").textContains("立即开始").findOne(2000)) {
        beginBtn.click();
    }
});
// 请求截图
requestScreenCapture();
sleep(500)

console.log('打卡开始 ^_^');
auto();
console.log('开启无障碍');
console.log('设置分辨率');
setScreenMetrics(1080, 2400);

//打开湖南省居民健康卡
app.startActivity({
    packageName: "com.eg.android.AlipayGphone",
    data: "alipays://platformapi/startapp?appId=2021002133603718",
});
console.log('打开湖南省居民健康卡');
sleep(4000)

click('居民电子健康码')
log('点击_居民电子健康码')
sleep(500)

var g = className("android.view.View").text('核酸检测').findOne().parent().child(1).bounds()
click(g.centerX(), g.centerY())
log('点击_获取最新数据1/2')
sleep(500)

var g = className("android.view.View").text('新冠疫苗').findOnce().parent().child(1).bounds()
click(g.centerX(), g.centerY())
log('点击_获取最新数据2/2')
sleep(2000)

// 截图
gestures(
    [350, [300, 400], [300, 1400]],
    [350, [600, 400], [600, 1400]],
    [350, [900, 400], [900, 1400]]
);
console.log("获取截图");
sleep(700)

//滑动
gesture(300, [550, 2000], [550, 1400])
console.log("滑动");
sleep(500)

var g = className("android.view.View").text("通信大数据行程卡").findOne().bounds()
click(g.centerX(), g.centerY())
log('点击_通信大数据行程卡')
sleep(2500)

var g = className("android.view.View").text('当前查询内容').findOne().parent().child(3).bounds()
click(g.centerX(), g.centerY())
log('打勾')
sleep(800)

click('查 询')
log('点击_查询')
sleep(2000)

// 截图
gestures(
    [350, [300, 400], [300, 1400]],
    [350, [600, 400], [600, 1400]],
    [350, [900, 400], [900, 1400]]
);
console.log("获取截图");
sleep(700)

//打开中国农业银行app
home();
log('返回桌面')
sleep(800)

click('书签')
log('打开文件夹')
sleep(1000)

click('智慧校园')
log('打开智慧校园')
sleep(2000)

home();
log('返回桌面')
sleep(1000)

click('智慧校园')
log('打开智慧校园')
sleep(3000)

//判断是否需要手势解锁
if (className("android.view.View").text("当前手机尾号零六一七").exists()) {
    gesture(1000, [287, 1076], [858, 1076], [858, 1350])
    console.log('正在解锁');
} else {
    console.log('跳过');
}

className("android.view.View").text("健康上报").findOne(3000).click()
console.log('点击健康上报');
sleep(1000)

className("android.view.View").text("去参与").findOne().click()
console.log('点击去参与');
sleep(1000)

//上传健康码
className("android.view.View").text('1.').findOnce().parent().parent().child(1).click()
console.log('点击上传健康码');
sleep(1000)

//点击第二张图片
var list = id("gv_photo").findOne().child(1).bounds()
console.log('点击第二张图片');
click(list.centerX(), list.centerY());
sleep(500)

//ocr识别是否存在：核酸检测
{
    //识别的文字
    let wenzi = "核酸检测"

    let ocr = $ocr.create({
        models: 'slim', // 指定精度相对低但速度更快的模型，若不指定则为default模型，精度高一点但速度慢一点
        parallelThreads: '8'
    });

    let capture = captureScreen();//图片为刚刚的截图
    let result = ocr.detect(capture);//让result为刚刚截图中识别出来的文本

    // 过滤可信度0.9以上的文本
    let filtered = result.filter(item => item.confidence > 0.9);
    // 模糊搜索文字内容
    let autojs = filtered.find(item => item.text.includes(wenzi));
    // 若搜索到则打印其可信度、范围和中点位置并点击
    if (autojs) {
        console.log(`${wenzi}_存在`);
        click('确定')
        console.log("点击确定");
        sleep(1000);
    } else {
        let title = '健康打卡失败'
        let r = http.postJson(url, {
            token: token,
            title: title,
            content: '健康码图片获取错误，请及时修改',
        });
        console.log(r.body.string());

    }

    ocr.release();
}


//上传行程码
className("android.view.View").text('2.').findOnce().parent().parent().child(1).click()
console.log('点击上传行程码');
sleep(1000)

//点击第一张图片
var list = id("gv_photo").findOne().child(0).bounds()
console.log('点击第一张图片');
click(list.centerX(), list.centerY());
sleep(500)

//识别是否存在：行程卡
{
    //识别的文字
    let wenzi = "行程卡"

    let ocr = $ocr.create({
        models: 'slim', // 指定精度相对低但速度更快的模型，若不指定则为default模型，精度高一点但速度慢一点
        parallelThreads: '8'
    });

    let capture = captureScreen();//图片为刚刚的截图
    let result = ocr.detect(capture);//让result为刚刚截图中识别出来的文本

    // 过滤可信度0.9以上的文本
    let filtered = result.filter(item => item.confidence > 0.9);
    // 模糊搜索文字内容
    let autojs = filtered.find(item => item.text.includes(wenzi));
    // 若搜索到则打印其可信度、范围和中点位置并点击
    if (autojs) {
        console.log(`${wenzi}_存在`);
        click('确定')
        console.log("点击确定");
        sleep(1000);
    } else {
        let title = '健康打卡失败'
        let r = http.postJson(url, {
            token: token,
            title: title,
            content: '行程码图片获取错误，请及时修改',
        });
        console.log(r.body.string());

    }

    ocr.release();
}

//获取位置
wenzi = "点击获取你的位置"
{
    if (text(wenzi).exists()) {
        text(wenzi).click()
        console.log('点击_' + wenzi);
        sleep(2000)
    } else {
        console.log('位置点击失败' + weizhi);
    }
}

//滑动
gesture(300, [550, 2000], [550, 1400])
console.log("滑动");
sleep(500)

//体温正常
var l = text('体温<37.3℃（正常）').findOne().bounds()
click(l.centerX(), l.centerY())
console.log("点击_体温正常");
sleep(800)

wenzi = "提交"
{
    if (text(wenzi).exists()) {
        text(wenzi).click()
        console.log('点击_' + wenzi);
        sleep(2000)
    }
}

//判断是否打卡成功并发送结果
if (text("今天").exists()) {
    let title = '健康打卡成功'
    let r = http.postJson(url, {
        token: token,
        title: title,
        content: '打卡成功，放宽心吧',
    });
    console.log(r.body.string());
} else {
    let title = '健康打卡失败'
    let r = http.postJson(url, {
        token: token,
        title: title,
        content: '打卡失败，请及时处理',
    });
    console.log(r.body.string());
}
sleep(2000)

home()