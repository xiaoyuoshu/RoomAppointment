var resource = [];
Page({
  data: {
    items: [],
    hidden: false
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
  },
  onReady:function(){
    // 页面渲染完成
    getAppData(this);
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
  onPullDownRefresh: function () {
    var that = this;
    var appList = [];
    wx.request({
      url: Util.debugServer + 'AllAppList',
      data: "123",
      success: function (res) {
        console.log(res);
        console.log(res.data);
        resource = res.data;
        for(var appointment of res.data.result ){
          appList.push({
            applicant: appointment.applicant + "(" + appointment.department + ")",
            date: (new Date(appointment.begin_time).getMonth()+1).toString() + "月" + new Date(appointment.begin_time).getDate().toString() + "日",
            time: new Date(appointment.begin_time).getHours().toString() + ":" + new Date(appointment.begin_time).getMinutes().toString() + "~" + new Date(appointment.end_time).getHours().toString() + ":" + new Date(appointment.end_time).getMinutes().toString(),
            state: appointment.state <= 1 ? (appointment.state == 0 ? "审核失败":"审核成功"):(appointment.state == 2 ? "待审核":"已结束")
          });
        }
        that.setData({items: appList});
        wx.stopPullDownRefresh();
      }
    });
  }
})

function getAppData(onPage){
  var i;
  var date = new Date();
  var that = onPage;
  var appList = [];
  wx.request({
      url: Util.debugServer + 'AllAppList',
      success: function (res) {
        console.log(res);
        console.log(res.data);
        resource = res.data;
        for(var appointment of res.data.result ){
          appList.push({
            applicant: appointment.applicant + "(" + appointment.department + ")",
            date: (new Date(appointment.begin_time).getMonth()+1).toString() + "月" + new Date(appointment.begin_time).getDate().toString() + "日",
            time: new Date(appointment.begin_time).getHours().toString() + ":" + new Date(appointment.begin_time).getMinutes().toString() + "~" + new Date(appointment.end_time).getHours().toString() + ":" + new Date(appointment.end_time).getMinutes().toString(),
            state: appointment.state <= 1 ? (appointment.state == 0 ? "审核失败":"审核成功"):(appointment.state == 2 ? "待审核":"已结束")
          });
        }
        that.setData({items: appList});
      }
  });
}

var Util = require("../../utils/util.js");
var Appointment = Util.Appointment;