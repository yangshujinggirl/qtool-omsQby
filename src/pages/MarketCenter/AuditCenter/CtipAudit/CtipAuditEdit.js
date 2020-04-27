import { Modal, Col, Input, Radio, Form, Collapse, Spin } from 'antd';
import { useEffect } from 'react';
import { Qbtn } from 'common';
import { Sessions } from 'utils';
import { GetSaveApprovalsApi } from 'api/marketCenter/CtipAudit';
import withSubscription from '../../components/CtipInfoWrap';
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
  let approvalId = props.match.params.auditId;

  const submit = async (saveType) => {
    try {
      let values = await form.validateFields();
      let params={...values,approvalId};
      GetSaveApprovalsApi(params)
      .then((res)=> {
        props.history.push('/account/posAudit')
      })
    } catch (errorInfo) {
      console.log('Failed:', errorInfo);
    }
  }

  return(
    <Panel header="审核结果" key="6">
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
            return getFieldValue('isPass')&&getFieldValue('isPass')!="1"&&
            <Form.Item label='不通过原因' name="opinion" rules={[{ required: true, message: '请填写不通过原因'}]}>
              <Input.TextArea
                placeholder="请填写不通过原因"
                rows={4}
                maxLength='100'
                autoComplete="off"/>
             </Form.Item>
          }}
        </Form.Item>
        <Col offset={4}>
          <Qbtn size="free" onClick={()=>submit()}>审核完成</Qbtn>
        </Col>
      </Form>
    </Panel>
  )
}
let PosAuditEdit=withSubscription(Audit,'edit');
export default PosAuditEdit;
