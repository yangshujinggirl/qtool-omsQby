import moment from "moment";
//全局防抖
export function deBounce(func, wait) {
  let timer = null;
  return function(...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func(...args);
    }, wait);
  };
}
//不可选日期
export function disabledDate(current) {
  return current && current < moment().endOf('day').subtract(1,'days');
}
//不可选时分秒
const range = (start, end) => {
  const result = [];
  for (let i = start; i <= end; i++) {
    result.push(i);
  }
  return result;
};
const formatHours = (date,type) => {
  let hour = moment().hour();
  let disabledHours = [];
  const chosedDate = type == "date" ? moment(date).date() : moment(date[0]).date();
  if (moment().date() == chosedDate) {
    disabledHours = range(0, 24).splice(0, hour);
  };
  return disabledHours;
};
const formatMinutes = (date,type) => {
  let minute = moment().minute();
  let disabledMinutes = [];
  const chosedDate = type == "date" ? moment(date).date() : moment(date[0]).date();
  if (moment().date() == chosedDate) {
    disabledMinutes = range(0, 60).splice(0, minute+1);
  };
  return disabledMinutes;
};
//DatePicker
export function disabledDateTime(date) {
  return {
    disabledHours: () => formatHours(date,'date'),
    disabledMinutes: () => formatMinutes(date,'date'),
    disabledSeconds: () => []
  };
}
//RangePicker
export function disabledRangeTime(date, type) {
  if (type === "start") {
    return {
      disabledHours: () => formatHours(date,'range'),
      disabledMinutes: () => formatMinutes(date,'range'),
      disabledSeconds: () => []
    };
  }
}

