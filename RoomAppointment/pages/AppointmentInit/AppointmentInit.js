Page({
  data:{
    date: '2017-11-04',
    begin_time: '12:00',
    end_time: '12:03',
    form_time:null
  },
  onLoad:function(options){
    var date = new Date();
    this.setData({
      date: date.getUTCFullYear() + "-" + (date.getUTCMonth() + 1) + "-" + (date.getUTCDate()+1),
      begin_time: (date.getHours()<10?'0'+date.getHours():date.getHours()) + ":" + (date.getMinutes()<10?'0'+date.getMinutes():date.getMinutes()),
      end_time: (date.getHours()<10?'0'+date.getHours():date.getHours()) + ":" + (date.getMinutes()<10?'0'+date.getMinutes():date.getMinutes())
    });
    // 页面初始化 options为页面跳转所带来的参数
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  },
  bindDateChange: function(e) {
    this.setData({
      date: e.detail.value
    })
  },
  bindBeginTimeChange: function(e) {
    this.setData({
      begin_time: e.detail.value
    });
  },
  bindEndTimeChange: function(e){
    console.log(e.detail.value)
    this.setData({
      end_time: e.detail.value
    });
  },
  formReset: function() {
    console.log('form发生了reset事件');
  },
  formSubmit: function(e){
    console.log('form发生了提交事件');
    console.log(e.detail.value);
    console.log(this.data);
    var begin;
    var end;
    var now;
    if(e.detail.value.applicant==""||e.detail.value.department==""||e.detail.value.reason==""){
      console.log(123);
      wx.showModal({
        title: "提交失败！",
        content: "申请人、申请单位、申请理由均不能为空",
        showCancel: false,
        confirmText: "确定"
      })
    }
    else{
      var D = this.data.date.split("-");
      begin = new Date(D[0],D[1],D[2],this.data.begin_time.split(":")[0], this.data.begin_time.split(":")[1], 0);
      end = new Date(D[0],D[1],D[2],this.data.end_time.split(":")[0], this.data.end_time.split(":")[1], 0);
      now = new Date();
      console.log(Date.now()-form_time);
      if(begin<now){
        wx.showModal({
          title: "提交失败！",
          content: "开始时间应晚于当前时间",
          showCancel: false,
          confirmText: "确定"
        });
      }
      else if(end<=begin){
        wx.showModal({
          title: "提交失败！",
          content: "开始时间应早于结束时间",
          showCancel: false,
          confirmText: "确定"
        });
      }
      else if(begin.getTime()+10800000<end.getTime()){
        wx.showModal({
          title: "提交失败！",
          content: "一次预约时间应小于三小时",
          showCancel: false,
          confirmText: "确定"
        });
      }
      else if(form_time!=null&&(Date.now()-180000>this.data.form_time)){
        wx.showModal({
          title: "提交失败！",
          content: "提交太匆忙，请三分钟后再试",
          showCancel: false,
          confirmText: "确定"
        })
      }
      else{
        var appointment = new Appointment(begin.getTime(), end.getTime(), e.detail.value.applicant, e.detail.value.department, e.detail.value.reason);
        wx.showModal({
          title: '请确认提交信息',
          content: appointment.applicant+"("+appointment.department+")\n理由："+appointment.reason+"\n日期："+this.data.date+"\n时间:"+this.data.begin_time+"~"+this.data.end_time,
          confirmText:"确定",
          success: function(res) {
            if (res.confirm) {
              console.log('用户点击确定');
              wx.showModal({
                title: "提交成功！",
                content: "请等待审核。",
                showCancel: false,
                confirmText: "确定",
                success:function(res){
                  if(res.confirm){
                    jumpTo();
                  }
                }
              });
            }
            else if(res.cancel){
              return;
            }
          }
        });
      }
    }
    
  },
  pushtoSE: function(appointment){
    return;
  }
})
var jumpTo = function(){
    form_time = Date.now();
    wx.reLaunch({
      url:'../UserInfo/UserInfo'
    });
};
var form_time = null;
var Util = require("../../utils/util.js");
var Appointment = Util.Appointment;
