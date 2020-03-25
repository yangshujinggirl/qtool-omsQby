import { Modal, Input, Radio, Form, Collapse, Spin } from 'antd';
import { GetSaveApprovalsApi } from 'api/marketCenter/PosAudit';
import withSubscription from '../../components/PosInfoWrap';
const { Panel } = Collapse;

const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
      },
    };

const Audit=({...props})=> {
  const [form] = Form.useForm();
  return(
    <Panel header="审核结果" key="3">
      <Form form={form} {...formItemLayout}>
        <Form.Item label="审核结果" name="isPass" rules={[{ required: true, message: '请填写审核结果'}]}>
          <Radio.Group>
            <Radio value={1}>审核通过</Radio>
            <Radio value={2}>审核不通过</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          noStyle
          shouldUpdate={(prevValues, currentValues) => prevValues.isPass !== currentValues.isPass}>
          {({ getFieldValue }) => {
            return getFieldValue('isPass')!="1"&&
            <FormItem label='不通过原因' name="opinion" rules={[{ required: true, message: '请填写不通过原因'}]}>
              <Input.TextArea
                className="ant-input-fixed"
                placeholder="请填写不通过原因"
                rows={4}
                maxLength='100'
                autoComplete="off"/>
             </FormItem>
          }}
        </Form.Item>
      </Form>
    </Panel>
  )
}
let PosAuditEdit=withSubscription(Audit,'edit');
export default PosAuditEdit;
