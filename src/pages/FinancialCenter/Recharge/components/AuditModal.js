import { useEffect,useState } from "react";
import { Modal, Form, Input, Select,Button } from "antd";
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
  // useEffect(() => {
  //   if (spVoucherId) {
  //     getInfoApi({spVoucherId }).then(res => {
  //       if (res.httpCode == 200) {
  //         const { spVoucher, spVoucherDetails, repeatNos } = res.result;
  //         setSpVoucher(spVoucher);
  //         setSpVoucherDetails(spVoucherDetails);
  //         setRepeatNos(repeatNos);
  //       }
  //     });
  //   }
  // }, []);
  const clearForm = () => {
    form.resetFields();
  };
  const onOk= async () => {
    const values = await form.validateFields();
    values.spVoucherId = spVoucherId;
    values.status = 1;
    props.onOk(values, clearForm);
  };
  const onCancel=()=>{
    clearForm();
    props.onCancel()
  }
  const onNotPass = async() => {
    await setCheckStatus(true)
    const values = await form.validateFields();
    values.spVoucherId = spVoucherId;
    values.status = 2;
    props.onNotPass(values, clearForm);
  };
  return (
    <div>
      <Modal
        title="充值审核"
        visible={visible}
        onCancel={onCancel}
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
            label="充值门店"
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 12 }}
          >
            {spVoucher.shopName}
          </FormItem>
          <FormItem
            label="充值金额"
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 12 }}
          >
            {spVoucher.amount}
          </FormItem>
          <FormItem
            label="充值凭证"
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 12 }}
          >
            {repeatNos.length ? (
              <p
                style={{
                  color: "red",
                  lineHeight: "16px",
                  marginBottom: 5,
                  marginTop: 5
                }}
              >
                此凭证与
                {repeatNos.join("，")}
                图片相同
              </p>
            ) : (
              <div className="cz_imgboxsLists">
                {spVoucherDetails &&
                  spVoucherDetails.map((item, index) => (
                    <QenlargeImg key={index} picUrl={item.picUrl} />
                  ))}
              </div>
            )}
          </FormItem>
          <FormItem
            label="不通过理由"
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 12 }}
            name="remark"
            rules={[{ required: checkStatus, message: "请选择不通过理由" }]}
          >
            <Select placeholder="请选择不通过理由">
              <Option value="充值金额模糊">充值金额模糊</Option>
              <Option value="金额填写不一致">金额填写不一致</Option>
              <Option value="收款户名错误">收款户名错误</Option>
              <Option value="收款账号信息错误">收款账号信息错误</Option>
              <Option value="收款银行信息错误">收款银行信息错误</Option>
              <Option value="未查收到该笔银行转账">未查收到该笔银行转账</Option>
            </Select>
          </FormItem>
        </Form>
      </Modal>
    </div>
  );
};
export default AuditModal;
