// * ================================================================================ helper

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

// * ================================================================================ simple calc

// * ---------------- getNearDay

// TODO make range configable // seognil LC 2019/02/01
const getNearDay = (delta: number): string | void => nearDayMap[delta];

// * ---------------- getNearWeek

// TODO make display range configable // seognil LC 2019/02/01
// TODO support Sunday ~ Saturday // seognil LC 2019/02/01
// * current week is Monday ~ Sunday
const getNearWeek = (delta: number, endWeekday: number): string | void => {
  endWeekday = endWeekday === 0 ? 7 : endWeekday;
  const shouldDisplay = 2 < delta && delta < 7;

  const rawStart = endWeekday - delta;
  const shouldMap = -6 <= rawStart && rawStart <= 14;

  let weekPrefix = '';
  if (rawStart <= 0) {
    weekPrefix = '下';
  } else if (8 <= rawStart) {
    weekPrefix = '上';
  }

  return shouldMap && shouldDisplay ? `${weekPrefix}周${weekdayMap[endWeekday]}` : undefined;
};

// * ---------------- simpleFormat

// * formatter pattern see https://momentjs.com/docs/#/displaying/format/
// * if need much more complicated formatting, import other tool such as moment.js

// * YYYY-MM-DD
const simpleFormat = (date: Date): string =>
  [
    date.getFullYear(),
    ('00' + (date.getMonth() + 1)).slice(-2),
    ('00' + date.getDate()).slice(-2),
  ].join('-');

// * ================================================================================ getTimeMark core function

// TODO version 2 would breaking change add more option // seognil LC 2019/02/01
// const getTimeMark = (
//   endDate: string | number | Date = new Date(),
//   options: {
//     startDate: string | number | Date;
//     format: string;
//   } = {
//     startDate: new Date(),
//     format: 'YYYY-MM-DD',
//   },
// ) => {}

// * -------------------------------- getTimeMark

const getTimeMark = (
  endDate: string | number | Date = new Date(),
  startDate: string | number | Date = new Date()
) => {
  // * ---------------- data preparation

  // ? if with invalid param, maybe would parse failed here
  endDate = new Date(endDate);
  startDate = new Date(startDate);

  const endWeekday = endDate.getDay();
  // const startWeekday = startDate.getDay();

  const deltaDay = getDayCount(endDate.getTime()) - getDayCount(startDate.getTime());

  // * ---------------- resulting

  // * try in order, break in half while get a very first valid result
  const result = getNearDay(deltaDay) || getNearWeek(deltaDay, endWeekday) || simpleFormat(endDate);

  if (!result) {
    // ! if still cant get a valid result
    // * return an error information or debug the methods
  }

  return result;
};

export default getTimeMark;
