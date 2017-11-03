Page({
  data:{
    date: '2017-11-04',
    begin_time: '12:00',
    end_time: '12:03'
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
    })
  },
  bindEndTimeChange: function(e){
    this.setData({
      end_time: e.detail.value
    })
  },
  formSubmit: function(e){
    console.log(e.detail.value);
  }
})

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