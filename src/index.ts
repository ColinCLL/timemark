// 时间格式化
const timeFormat = (time: number | Date, format: string) => {
  const date = new Date(time);
  const dateOption = {
    'M+': date.getMonth() + 1, // 月
    'd+': date.getDate(), // 日
    'h+': date.getHours() % 12 === 0 ? 12 : date.getHours() % 12, // 12小时制
    'H+': date.getHours(), // 24 小时制
    'm+': date.getMinutes(), // 分
    's+': date.getSeconds(), // 秒
    'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
    S: date.getMilliseconds(), // 毫秒
  };
  const week = {
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
  for (const k in dateOption) {
    if (new RegExp('(' + k + ')').test(format)) {
      format = format.replace(
        RegExp.$1,
        RegExp.$1.length === 1
          ? dateOption[k]
          : ('00' + dateOption[k]).substr(('' + dateOption[k]).length)
      );
    }
  }
  return format;
};

const isNextWeek = (timeDay: Date, markDay: Date) => {
  if (markDay.getDay() === 0 || (timeDay.getDay() < markDay.getDay() && timeDay.getDay() !== 0)) {
    return true;
  } else {
    return false;
  }
};

const getTimeMark = (time: Date | number, day: number, weekPrefix: string) => {
  if (day === -1) {
    return '昨天';
  } else if (day === 0) {
    return '今天';
  } else if (day === 1) {
    return '明天';
  } else if (day === 2) {
    return '后天';
  } else if (day <= 7 && day > 2) {
    return timeFormat(time, `${weekPrefix}EE`);
  } else {
    return timeFormat(time, 'yyyy-MM-dd');
  }
};

const timeMark = (time: number | Date, marker?: string | number) => {
  const letMarker = marker || new Date();
  let timestamp: number | Date = new Date(time);
  let markStamp: number | Date = new Date(letMarker);
  const weekPrefix = isNextWeek(timestamp, markStamp) ? '下' : '';
  timestamp = Date.parse(timestamp + '');
  markStamp = Date.parse(markStamp + '');
  const day = Math.floor(timestamp / 86400 / 1000) - Math.floor(markStamp / 86400 / 1000);
  return getTimeMark(time, day, weekPrefix);
};

export default timeMark;
