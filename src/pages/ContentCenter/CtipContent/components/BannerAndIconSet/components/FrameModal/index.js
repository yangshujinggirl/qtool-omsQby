import { Modal, Button, InputNumber, Form, message, Select } from 'antd';
import './index.less';

const optionBannerData=[{
    key:1,
  },{
    key:2,
  },{
    key:3,
  },{
    key:4,
  },{
    key:5,
  }]
const optionIconData=[{
    key:1,
  },{
    key:2,
  },{
    key:3,
  },{
    key:4,
  }]
const { Option } = Select;

const App=({...props})=> {
  const onOk = async () => {
    try {
      let values = await props.form.validateFields(['frameNum']);
      props.onOk(values);
    } catch (errorInfo) {
      console.log('Failed:', errorInfo);
    }
  }
  let text, optionData, unit;
  if(props.modType=='2') {
    text='将当前icon调整至第';
    optionData = optionIconData;
    unit="坑"
  } else {
    text='将当前banner调整至第';
    optionData = optionBannerData;
    unit="帧"
  }
  return (
    <Modal
      className="frame-modal-wrap"
      visible={props.visible}
      onOk={onOk}
      onCancel={props.onCancel}>
      <div>
        {text}
        <Form.Item className="frame-item" name="frameNum" rules={[{ required: true, message: '请选择'}]}>
          <Select>
            {
              optionData.map((el,index) =>(
                <Option key={el.key} value={el.key}>{el.key}</Option>
              ))
            }
          </Select>
        </Form.Item>
        {unit}
      </div>
    </Modal>
  );
}
export default App;
