// * ================================================================================ helper

type DateType = string | number | Date;

// * ---------------- num-Chinese mapper

// * manually configable
const nearDayMap: { [index: string]: string } = {
  // '-3': '大前天',
  // '-2': '前天',
  '-1': '昨天',
  '0': '今天',
  '1': '明天',
  '2': '后天',
  // '3': '大后天',
};

const weekdayMap: { [index: string]: string } = {
  '1': '一',
  '2': '二',
  '3': '三',
  '4': '四',
  '5': '五',
  '6': '六',
  '7': '日',
};

// * ---------------- helper

// * get day count from Date(0), while in China its necessary to add 8 hour
const getDayCount = (stamp: number): number => Math.floor((stamp + 8 * 3600 * 1000) / 86400 / 1000);

// * also support number, ES8 String.prototype.padStart()
const padStart = (str: number | string, targetLength: number, padString: string): string => {
  str = String(str);
  while (str.length < targetLength) {
    str = padString + str;
  }
  return str;
};

// * ================================================================================ simple calc

// * ---------------- getNearDay

const getNearDay = (delta: number): string => nearDayMap[delta];

// * ---------------- getNearWeek

// TODO support Sunday ~ Saturday // seognil LC 2019/02/01
// * current week is Monday ~ Sunday
const getNearWeek = (delta: number, endWeekday: number): string => {
  endWeekday = endWeekday === 0 ? 7 : endWeekday;

  const rawStart = endWeekday - delta;

  let weekPrefix = '';
  if (rawStart <= 0) {
    weekPrefix = '下';
  }
  // * not necessary by current range
  // else if (8 <= rawStart) {
  // weekPrefix = '上';
  // }

  return `${weekPrefix}周${weekdayMap[endWeekday]}`;
};

// * ---------------- simpleFormat

// * formatter pattern see https://momentjs.com/docs/#/displaying/format/
// * if need much more complicated formatting, import other tool such as moment.js

// * YYYY-MM-DD
const simpleFormat = (date: Date): string =>
  [padStart(date.getMonth() + 1, 2, '0'), padStart(date.getDate(), 2, '0')].join('-');

// * ================================================================================ getTimeMark core function

// TODO version 2 would breaking change add more option // seognil LC 2019/02/01
// const getTimeMark = (
//   endDate: DateType = new Date(),
//   options: {
//     startDate: DateType;
//     format: string;
//   } = {
//     startDate: new Date(),
//     format: 'YYYY-MM-DD',
//   },
// ) => {}

// * -------------------------------- getTimeMark

const getTimeMark = (endDate: DateType = new Date(), startDate: DateType = new Date()): string => {
  // * ---------------- data preparation

  // ? if with invalid param, maybe would parse failed here
  endDate = new Date(endDate);
  startDate = new Date(startDate);

  const endWeekday = endDate.getDay();
  // const startWeekday = startDate.getDay();

  const deltaDay = getDayCount(endDate.getTime()) - getDayCount(startDate.getTime());

  // * ---------------- resulting

  if (-1 <= deltaDay && deltaDay <= 2) {
    return getNearDay(deltaDay);
  } else if (3 <= deltaDay && deltaDay <= 6) {
    return getNearWeek(deltaDay, endWeekday);
  }
  // ! catch empty result here
  // if (!result) {
  // * return an error information or debug the methods
  // }
  return simpleFormat(endDate);
};

export default getTimeMark;
