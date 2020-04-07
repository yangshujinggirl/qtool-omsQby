import { Modal, DatePicker, Form } from 'antd';
import React, { Component } from 'react';
import moment from 'moment';

const formItemLayout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 16 },
};
const dateFormat = 'YYYY-MM-DD HH:mm';
const disabledDate = current => {
  // return current && current < moment().subtract(1,'days');
  return current && current < moment().endOf('day').subtract(1,'days');
};
const range = (start, end) => {
  const result = [];
  for (let i = start; i <= end; i++) {
    result.push(i);
  }
  return result;
};
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

class ReleaseModalF extends Component {
  render() {
    const { getFieldDecorator } =this.props.form;
    const { confirmLoading, type } =this.props;

    return(
      <Modal
        title={type==2?'定时发布':'立即发布'}
        confirmLoading={confirmLoading}
        visible={this.props.visible}
        onOk={this.props.onOk}
        onCancel={this.props.onCancel}>
        <div>
          {
            type == '2'?
            <div>
              <Form.Item label="定时发布时间" {...formItemLayout}>
                {getFieldDecorator('timingReleaseTime',{
                  rules:[{
                    required:true,message:'请设定发布时间'
                  }]
                })(
                  <DatePicker
                    format={dateFormat}
                    disabledDate={disabledDate}
                    disabledTime={disabledDateTime}
                    allowClear={false}
                    showTime={{
                      hideDisabledOptions: true,
                      defaultValue: moment('00:00:00', 'HH:mm:ss'),
                    }}
                    />
                )}
              </Form.Item>
              <p>亲，建议定时发布时间避开流量高峰哦</p>
            </div>
            :
            <p>
              您确定立即发布吗？发布成功后此次设置将同步到C端首页，不可撤销
            </p>
          }
        </div>
      </Modal>
    )
  }
}
// const ReleaseModal = Form.create()(ReleaseModalF);
export default ReleaseModalF;
