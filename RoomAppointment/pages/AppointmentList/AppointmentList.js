Page({
  data: {
    items: [],
    hidden: false
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    
    getAppData();
    this.setData({items: appList, hidden:false});
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
  }
})

var appList = [];

function getAppData(){
  var i;
  var date = new Date();
  for(i = 0; i < 100; i++){
    var appointment = new Appointment(date.getTime(), date.getTime(), "舒晓宇", "科协技术部", "开会");
    appList.push({
      applicant: appointment.applicant + "(" + appointment.department + ")",
      date: (new Date(appointment.begin_time).getMonth()+1).toString() + "月" + new Date(appointment.begin_time).getDate().toString() + "日",
      time: new Date(appointment.begin_time).getHours().toString() + ":" + new Date(appointment.begin_time).getMinutes().toString() + "~" + new Date(appointment.end_time).getHours().toString() + ":" + new Date(appointment.end_time).getMinutes().toString(),
      state: appointment.state <= 1 ? (appointment.state == 0 ? "审核失败":"审核成功"):(appointment.state == 2 ? "待审核":"已结束")
    });
  }
}

var Util = require("../../utils/util.js");
var Appointment = Util.Appointment;