import React, { Component } from 'react';
import { Form, DatePicker } from 'antd';
import moment from 'moment';

const RangePicker = DatePicker.RangePicker;
const FormItem = Form.Item;
const formatType='YYYY-MM-DD H:mm:ss';

class RangeTime extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dateTime:[]
    }
  }
  componentDidMount(props) {
    this.getNowDate()
  }
  getNowDate() {
    let endDate  = moment();
    let startDate = moment().subtract(30, 'days');
    startDate = startDate.format(formatType);
    endDate = endDate.format(formatType);
    this.setState({ dateTime: [startDate,endDate] })
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const { name, label } =this.props;
    return(
      <FormItem label={label}>
        {getFieldDecorator(name,{
          initialValue:[
            moment(this.state.dateTime[0],formatType),
            moment(this.state.dateTime[1],formatType)
          ]
        })(
          <RangePicker allowClear={false} format={formatType}/>
        )}
      </FormItem>
    )
  }
}

export default RangeTime;
