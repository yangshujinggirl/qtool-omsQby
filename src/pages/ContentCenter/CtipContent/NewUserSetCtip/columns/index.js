
import { Input, Form, DatePicker, Select, Button } from 'antd';
const FormItem = Form.Item;

const ColumnsAdd=(optionSource)=>{
  return [
    {
      title: '序号',
      dataIndex: 'key',
      align:'center',
      width:'4%',
      render:(text,record,index)=> {
        index++;
        return <span>{index}</span>
      }
    }, {
      title: '选择优惠券',
      dataIndex: 'couponId',
      align:'center',
      width:'10%',
      render:(text,record,index)=> {
        return <FormItem name={['couponIds',index]} rules={[{ required:true,message:'请输入名称'}]}>
                <Select placeholder="请选择你要发放的优惠券">
                  {optionSource && optionSource.map(item => (
                    <Option key={item.couponId} value={item.couponId} >
                      {item.couponName}
                    </Option>
                  ))}
                </Select>
              </FormItem>
      }
    },{
      title: "使用门槛",
      dataIndex: "couponFullAmount",
      render:(text,record,index)=>{
        return <p>
          {
            text ? <span>￥{text}</span> : ''
          }
        </p>
      }
    }, {
      title: "优惠金额",
      dataIndex: "couponMoney",
      render:(text,record,index)=>{
        return <p>
          {
            text ? <span>￥{text}</span> : ''
          }
        </p>
      }
    },{
      title: "已发放数量",
      dataIndex: "couponGiveCount"
    }];
}
export default ColumnsAdd;