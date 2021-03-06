import moment from 'moment';

const disabledDate = current => {
  return current && current < moment().endOf('day').subtract(1,'days');
};
const range = (start, end) => {
  const result = [];
  for (let i = start; i <= end; i++) {
    result.push(i);
  }
  return result;
};
//[开始时间，结束时间]--时间段//////////////////////
const formatHoursRange =(date)=> {
  let currentDate = moment().format('YYYY-MM-DD');
  let hour = moment().hour();
  let setDate, disabledHours;
  if(date instanceof Array === true) {
    setDate = moment(date[0]).format('YYYY-MM-DD');
  } else {
    setDate = moment(date).format('YYYY-MM-DD');
  }
  if(setDate != currentDate) {
    disabledHours = [];
  }else {
    disabledHours = range(0, 24).splice(0,hour);
  }
  return disabledHours;
}
const formatMinutesRange =(date)=> {
  let minute = moment().minute();
  let currentDate = moment().format('YYYY-MM-DD HH');

  let setDate, disabledMinutes;
  if(date instanceof Array === true) {
    setDate = moment(date[0]).format('YYYY-MM-DD HH');
  } else {
    setDate = moment(date).format('YYYY-MM-DD HH');
  }
  if(setDate != currentDate) {
    disabledMinutes = [];
  }else {
    disabledMinutes = range(0, 60).splice(0, minute+1);
  }
  return disabledMinutes;
}
const disabledDateTimeRange = (date,type) => {
  if (type === 'start') {
    return {
      disabledHours: () => formatHoursRange(date),
      disabledMinutes: () => formatMinutesRange(date),
      disabledSeconds: () => [],
    };
  }
  return {
    disabledHours: () => [],
    disabledMinutes: () => [],
    disabledSeconds: () => [],
  };
};
//开始时间--------------------/////////////////////
const formatHours =(date)=> {
  let hour = moment().hour();
  let selDat = moment(date).date();//设置日
  let currDat = moment().date();//当前日
  let selMon = moment(date).month();//设置月
  let currMon = moment().month();//当前月
  let disabledHours;
  if(selMon > currMon) {
    disabledHours = [];
    return disabledHours;
  }
  if(selDat > currDat) {
    disabledHours = [];
  } else if(selDat == currDat) {
    disabledHours = range(0, 24).splice(0,hour);
  } else {
    disabledHours = range(0, 24);
  }
  return disabledHours;
}
const formatMinutes =(date)=> {
  let minute = moment().minute();
  let selMon = moment(date).month();//设置月
  let currMon = moment().month();//当前月
  let selDat = moment(date).date();//设置日
  let currDat = moment().date();//当前日
  let selHour = moment(date).hour();//设置时
  let currHour = moment().hour();//当前时
  let disabledMinutes;
  if(selDat > currDat || selHour > currHour || selMon > currMon) {
    disabledMinutes = [];
    return disabledMinutes;
  }
  if(selDat == currDat) {
    if(selHour > currHour) {
      disabledMinutes = [];
    } else if(selHour == currHour){
      disabledMinutes = range(0, 60).splice(0, minute+1);
    } else {
      disabledMinutes = [];
    }
  } else {
    disabledMinutes = range(0, 60);
  }
  return disabledMinutes;
}
const disabledDateTime = (date) => {
  return {
    disabledHours: ()=> formatHours(date),
    disabledMinutes: ()=> formatMinutes(date),
  };
};

const DisabledDateUtils = {
  disabledDate,disabledDateTimeRange,disabledDateTime
}
export default DisabledDateUtils;
// export {
//   disabledDate, disabledDateTimeRange, disabledDateTime
// }
