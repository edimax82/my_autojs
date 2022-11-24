//你们使用需要删除下面这一行
var out = require("/sdcard/脚本/out.js");

//设置
var url_autojs = out.qiye_weixin_autojs
var path1 = "/sdcard/DCIM/Camera/健康码.jpg";//保存路径
var path2 = "/sdcard/DCIM/Camera/行程码.jpg";//保存路径

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

//截图并保存
var photo = captureScreen()
photo.saveTo(path1);
media.scanFile(path1);

//获取图片的base64和md5
var image_data = images.toBase64(photo)
var md5 = $crypto.digest(path1, "MD5", {
    input: "file"
});


//上传
let autojs = http.postJson(url_autojs, {
    "msgtype": "image",
    "image": {
        "base64": image_data,
        "md5": md5
    }
});
console.log(autojs.body.string());
log('已发送截图')




