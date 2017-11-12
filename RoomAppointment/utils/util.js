function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds();


  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

class Appointment{
  constructor(begin_time, end_time, applicant, department, reason, wx_id){
    this.init_time = new Date().getTime();
    this.begin_time = begin_time;
    this.end_time = end_time;
    this.site = true;
    this.applicant = applicant;
    this.department = department;
    this.reason = reason;
    this.state = 2;
    this.wx_id = wx_id;
  }
}

var getopenID = function (thisObj){
  var that = thisObj;
  wx.login({
    success: function (res) {
      if (res.code) {
        //获取openId
        wx.request({
          url: 'https://api.weixin.qq.com/sns/jscode2session',
          data: {
　　　　　　　//小程序唯一标识
            appid: '',
　　 　　 　　//小程序的 app secret
            secret: '',
            grant_type: 'authorization_code',
            js_code: res.code
          },
          method: 'GET',
          header: { 'content-type': 'application/json'},
          success: function(openIdRes){
              console.info("登录成功返回的openId：" + openIdRes.data.openid);
              //weChatUserInfo.openId = openIdRes.data.openid;
              // 判断openId是否获取成功
              if (openIdRes.data.openid != null & openIdRes.data.openid != undefined) {
　　　　　　　　// 有一点需要注意 询问用户 是否授权 那提示 是这API发出的
                wx.getUserInfo({
                  success: function (data) {
                    // 自定义操作
                    // 绑定数据，渲染页面
                    return openIdRes.data.openid;
                  },
                  fail: function (failData) {
                      console.info("用户拒绝授权");
                  }
                });
              }else {
                 console.info("获取用户openId失败");
              }
          },
          fail: function(error) {
            console.info("获取用户openId失败");
            console.info(error);
          }
        })
      }
    }
  });
} 

module.exports = {
  formatTime: formatTime,
  formatNumber: formatNumber,
  Appointment: Appointment,
  getopenID: getopenID
}

