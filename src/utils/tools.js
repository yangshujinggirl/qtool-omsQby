import moment from "moment";
// const eventEmitter = require("events").EventEmitter;
// const eventBus = new eventEmitter();
// export default eventBus;
//全局防抖
export const deBounce = (func, wait) => {
  let timer = null;
  return function(...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func(...args);
    }, wait);
  };
};
//所有input前后去空格
export const removeSpace = value => {
  for (let i in value) {
    if (typeof value[i] == "string") {
      value[i] = value[i].trim();
    }
  }
  return value;
};
//不可选日期
export function disabledDate(current) {
  return (
    current &&
    current <
      moment()
        .endOf("day")
        .subtract(1, "days")
  );
}
//不可选时分秒
const range = (start, end) => {
  const result = [];
  for (let i = start; i <= end; i++) {
    result.push(i);
  }
  return result;
};
const formatHours = date => {
  let hour = moment().hour();
  let disabledHours = [];
  const chosedDate = moment(date).date();
  if (moment().date() == chosedDate) {
    disabledHours = range(0, 24).splice(0, hour);
  }
  return disabledHours;
};
const formatMinutes = date => {
  let minute = moment().minute();
  let disabledMinutes = [];
  const chosedDate = moment(date).date();
  if (moment().date() == chosedDate) {
    disabledMinutes = range(0, 60).splice(0, minute + 1);
  }
  return disabledMinutes;
};
//DatePicker
export function disabledDateTime(date) {
  return {
    disabledHours: () => formatHours(date),
    disabledMinutes: () => formatMinutes(date),
    disabledSeconds: () => []
  };
}


