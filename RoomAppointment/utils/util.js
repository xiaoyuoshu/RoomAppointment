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

function Appointment(begin_time, end_time, applicant, department, reason){
  this.init_time = new Date().getTime();
  this.begin_time = begin_time;
  this.end_time = end_time;
  this.site = true;
  this.applicant = applicant;
  this.department = department;
  this.reason = reason;
  this.state = 0;
}


module.exports = {
  formatTime: formatTime,
  formatNumber: formatNumber
}

