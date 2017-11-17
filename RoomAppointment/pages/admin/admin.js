var resource = [];
Page({
  data:{
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
  onItemClick:function(e){
    console.log(e);
    console.log(JSON.stringify(e.currentTarget));
    var appointment;
    var that = this;
    for(var appoint of appointmentList){
      if(appoint.init_time==e.currentTarget.id){
        appointment = appoint;
      }
    }
    console.log(appointment);
    wx.showModal({
          title: '请审核信息',
          content: appointment.applicant
            +"("+appointment.department+")\n"
            +"理由："
            +appointment.reason
            +"\n日期："
            +(new Date(appointment.begin_time).getMonth()+1).toString() + "月" + new Date(appointment.begin_time).getDate().toString() + "日"
            +"\n时间："
            +(new Date(appointment.begin_time).getHours().toString() + ":" + new Date(appointment.begin_time).getMinutes().toString() + "~" + new Date(appointment.end_time).getHours().toString() + ":" + new Date(appointment.end_time).getMinutes().toString()),
          confirmText:"同意",
          cancelText:"取消",
          success: function(res) {
            if (res.confirm) {
              console.log('管理员点击确定');
              wx.request({
                url: Util.debugServer + 'AdminConfirm',
                data: appointment,
                success: function (res) {
                  console.log(res);
                  console.log(res.data);
                }
              });
              wx.reLaunch({
                url:'../admin/admin'
              });
              wx.showModal({
                title: "审核成功！",
                content: "请在使用5分钟前开门。",
                showCancel: false,
                confirmText: "确定",
              });
            }
            else if(res.cancel){
              return;
            }
          }
    });
  }
})
var appointmentList = [];
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
            Init_time: appointment.init_time,
            applicant: appointment.applicant + "(" + appointment.department + ")",
            date: (new Date(appointment.begin_time).getMonth()+1).toString() + "月" + new Date(appointment.begin_time).getDate().toString() + "日",
            time: new Date(appointment.begin_time).getHours().toString() + ":" + new Date(appointment.begin_time).getMinutes().toString() + "~" + new Date(appointment.end_time).getHours().toString() + ":" + new Date(appointment.end_time).getMinutes().toString(),
            state: appointment.state <= 1 ? (appointment.state == 0 ? "审核失败":"审核成功"):(appointment.state == 2 ? "待审核":"已结束")
          });
          var app = {
            init_time: appointment.init_time,
            begin_time: appointment.begin_time,
            end_time: appointment.end_time,
            site: appointment.site,
            applicant: appointment.applicant,
            department: appointment.department,
            reason: appointment.reason,
            state: appointment.state,
            wx_id: appointment.wx_id
          };
          console.log(app);
          appointmentList.push(app);
        };
        that.setData({items: appList});
      }
  });
}

var Util = require("../../utils/util.js");
var Appointment = Util.Appointment;