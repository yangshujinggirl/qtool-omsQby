import { useEffect } from "react";
import { Modal, Form, Input, Select } from "antd";
import { QenlargeImg } from "common";
const FormItem = Form.Item;
import { getInfoApi } from "api/home/FinancialCenter/ShoperRecharge";
const Option = Select.Option;
const TextArea = Input.TextArea;

const AuditModal = props => {
  const [form] = Form.useForm();
  const { spVoucherId, visible } = props;
  const [spVoucher, setSpVoucher] = useState({});
  const [spVoucherDetails, setSpVoucherDetails] = useState([]);
  const [repeatNos, setRepeatNos] = useState([]);
  const [checkStatus, setCheckStatus] = useState(false);
  useEffect(() => {
    if (spVoucherId) {
      GetInfoApi({ id: spVoucherId }).then(res => {
        if (res.httpCode == 200) {
          const { spVoucher, spVoucherDetails, repeatNos } = res.result;
          setSpVoucher(spVoucher);
          setSpVoucherDetails(spVoucherDetails);
          setRepeatNos(repeatNos);
        }
      });
    }
  }, []);
  const clearForm = () => {
    form.resetFields();
  };
  const onOk= async () => {
    const values = await form.validateFields();
    values.spVoucherId = spVoucherId;
    values.status = 1;
    props.onOk(values, clearForm);
  };
  const onNotPass = async() => {
    setCheckStatus(true)
    const values = await form.validateFields();
    values.spVoucherId = spVoucherId;
    values.status = 2;
    props.onNotPass(values, clearForm);
  };
  return (
    <div>
      <Modal
        title="提现审核"
        visible={visible}
        footer={[
          <Button key="back" onClick={onNotPass}>
            审核不通过
          </Button>,
          <Button key="submit" type="primary" onClick={onOk}>
            审核通过
          </Button>
        ]}
      >
        <Form form={form}>
          <FormItem
            label="提现门店"
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 12 }}
          >
            {spVoucher.shopName}
          </FormItem>
          <FormItem
            label="提现金额"
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 12 }}
          >
            {spVoucher.amount}
          </FormItem>
          <FormItem
            label="不通过理由"
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 12 }}
            name="remark"
            rules={[{ required: checkStatus, message: "请输入不通过理由" }]}
          >
            <Input placeholder='请输入不通过理由'/>
          </FormItem>
        </Form>
      </Modal>
    </div>
  );
};
export default AuditModal;
