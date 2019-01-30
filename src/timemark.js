
// 通过闭包设置私有属性
let Timemark = (function () {
  let weekOption = {
    "CN": {
      "0": { first: "日", second: "周日", third: "星期日" },
      "1": { first: "一", second: "周一", third: "星期一" },
      "2": { first: "二", second: "周二", third: "星期二" },
      "3": { first: "三", second: "周三", third: "星期三" },
      "4": { first: "四", second: "周四", third: "星期四" },
      "5": { first: "五", second: "周五", third: "星期五" },
      "6": { first: "六", second: "周六", third: "星期六" },
    },
    "EN": {
      "0": { first: "7", second: "Sun", third: "SunDay" },
      "1": { first: "1", second: "Mon", third: "Monday" },
      "2": { first: "2", second: "Tues", third: "Tuesday" },
      "3": { first: "3", second: "Wed", third: "Wednesday" },
      "4": { first: "4", second: "Thur", third: "Thursday" },
      "5": { first: "5", second: "Fri", third: "Friday" },
      "6": { first: "6", second: "Sat", third: "Saturday" },
    },
  }

  // 类
  class Timemark {
    /*
      option = {
        mark: new Data(),
        lang: "CN",
        rules: {
          "=": [{step: int, formatter: function(time, mark, step)}]
          ">": [{step: int, formatter: function}]
          "<": [{step: int, formatter: function}]
          "each": [{step: int, formatter: function}]
        }
      }
    **********************/
    constructor (option) {
      // 检查模式，避免忘记new
      if (this instanceof Timemark) {

        if (option.weekOption) {
          weekOption = option.weekOption
        }
        this.lang = !!option.lang ? option.lang : "CN"
        this.mark = !!option.mark ? option.mark : new Data()

        // todo.. 主要逻辑
      } else {
        return new Timemark(option)
      }
    }

    // 时间格式化
    timeFormat (time, format) {
      let date = new Date(time)
      let dateOption = {
        "M+": date.getMonth() + 1, // 月
        "d+": date.getDate(), // 日
        "h+": date.getHours() % 12 == 0 ? 12 : date.getHours() % 12, // 12小时制
        "H+": date.getHours(), // 24 小时制
        "m+": date.getMinutes(), // 分
        "s+": date.getSeconds(), // 秒
        "q+": Math.floor((date.getMonth() + 3) / 3), // 季度
        "S": date.getMilliseconds() // 毫秒
      }
      let week = {
        "0": "日",
        "1": "一",
        "2": "二",
        "3": "三",
        "4": "四",
        "5": "五",
        "6": "六"
      }
      if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length))
      }
      if (/(E+)/.test(format)) {
        format = format.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? "星期" : "周") : "") + week[date.getDay() + ""])
      }
      for (let k in dateOption) {
        if (new RegExp("(" + k + ")").test(format)) {
          format = format.replace(RegExp.$1, (RegExp.$1.length == 1) ? (dateOption[k]) : (("00" + dateOption[k]).substr(("" + dateOption[k]).length)))
        }
      }
      return format
    }

    getWeekOption () {
      return weekOption
    }

    setWeekOption = function (option) {
      weekOption = option
    }

  }

  return Timemark
})()

export default TimeFormat
