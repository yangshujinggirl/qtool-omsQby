
import { Input, Form, DatePicker, Select, Button } from 'antd';
const FormItem = Form.Item;

const ColumnsAdd=(optionSource,onSelect)=>{
  return [
    {
      title: '序号',
      dataIndex: 'key',
      align:'center',
      render:(text,record,index)=> {
        index++;
        return <span>{index}</span>
      }
    }, {
      title: '选择主题',
      dataIndex: 'showThemeTitle',
      align:'center',
      render:(text,record,index)=> {
        return <FormItem name={['list',index,'themeId']} rules={[{ required:true,message:'请输入名称'}]}>
                <Select placeholder="请选择选择主题" onSelect={(value,option)=>onSelect(value,index)}>
                  {optionSource && optionSource.map(item => (
                    <Select.Option key={item.themeId} value={item.themeId} >
                      {item.title}
                    </Select.Option>
                  ))}
                </Select>
              </FormItem>
      }
    },{
      title: "副标题",
      dataIndex: "showSubtitle",
    },{
      title: "主题状态",
      dataIndex: "showThemeStatusStr",
    }];
}
export default ColumnsAdd;
