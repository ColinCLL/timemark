// 时间格式化
function timeFormat(time, format) {
  var date = new Date(time);
  var dateOption = {
    'M+': date.getMonth() + 1, // 月
    'd+': date.getDate(), // 日
    'h+': date.getHours() % 12 == 0 ? 12 : date.getHours() % 12, // 12小时制
    'H+': date.getHours(), // 24 小时制
    'm+': date.getMinutes(), // 分
    's+': date.getSeconds(), // 秒
    'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
    S: date.getMilliseconds(), // 毫秒
  };
  var week = {
    '0': '日',
    '1': '一',
    '2': '二',
    '3': '三',
    '4': '四',
    '5': '五',
    '6': '六',
  };
  if (/(y+)/.test(format)) {
    format = format.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  if (/(E+)/.test(format)) {
    format = format.replace(
      RegExp.$1,
      (RegExp.$1.length > 1 ? (RegExp.$1.length > 2 ? '星期' : '周') : '') +
        week[date.getDay() + '']
    );
  }
  for (var k in dateOption) {
    if (new RegExp('(' + k + ')').test(format)) {
      format = format.replace(
        RegExp.$1,
        RegExp.$1.length == 1
          ? dateOption[k]
          : ('00' + dateOption[k]).substr(('' + dateOption[k]).length)
      );
    }
  }
  return format;
}

var timemark = function timemark(time, marker) {
  marker = marker || new Date();
  var timestamp = Date.parse(new Date(time));
  timestamp = Math.floor(timestamp / 86400 / 1000);
  var markstamp = Date.parse(new Date(marker));
  markstamp = Math.floor(markstamp / 86400 / 1000);
  var interval = timestamp - markstamp;
  var day = interval;
  var str = void 0;
  if (day === -1) {
    str = '昨天';
  } else if (day === 0) {
    str = '今天';
  } else if (day === 1) {
    str = '明天';
  } else if (day === 2) {
    str = '后天';
  } else if (day <= 7 && day > 2) {
    str = timeFormat(time, 'EE');
  } else {
    str = timeFormat(time, 'yyyy-MM-dd');
  }
  return str;
};

module.exports = timemark;
