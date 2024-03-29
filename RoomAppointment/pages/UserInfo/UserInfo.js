var app = getApp();
Page({
  data:{
    items: [],
    userInfo:{}
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    console.log('onLoad')
    getAppData();
    this.setData({items: appList});
    var that = this
  	//调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
      that.update()
    })
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
  bindViewTap:function(){
    wx.navigateTo({
      url:'../adminLogin/adminLogin'
    });
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

function Appointment(begin_time, end_time, applicant, department, reason){
  this.init_time = new Date().getTime();
  this.begin_time = begin_time;
  this.end_time = end_time;
  this.site = "23栋3楼公用房";
  this.applicant = applicant;
  this.department = department;
  this.reason = reason;
  this.state = 2;
}