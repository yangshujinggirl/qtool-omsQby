import React, { useEffect, useState } from "react";
import { Modal, Form, Select, Button } from "antd";
import { QenlargeImg } from "common";
import { getInfosApi, auditRecharge } from "api/home/FinancialCenter/Recharge";
import {deBounce} from 'utils/tools'
import '../index.less'
const Option = Select.Option;
const FormItem = Form.Item;

const AuditRechargeModal = (props) => {
  const [form] = Form.useForm();
  const { spVoucherId, visible } = props;
  console.log(props);
  const [infos, setInfos] = useState({});
  const [repeatNos, setRepeatNos] = useState([]);
  const [imgs, setImgs] = useState([]);
  const [checkStatus, setCheckStatus] = useState(false);
  //页面初始化
  useEffect(() => {
    getInfosApi(spVoucherId).then((res) => {
      if (res.httpCode == 200) {
        const { spVoucherDto, repeatNos, spVoucherDetails } = res.result;
        setImgs(spVoucherDetails);
        setInfos(spVoucherDto);
        setRepeatNos(repeatNos);
      }
    });
  }, []);
  const clearForm = () => {
    form.resetFields();
  };
  //审核通过、不通过
  const handlePass = deBounce(async (status) => {
    if (status == 2) {
      setCheckStatus(true);
    }
    const values = await form.validateFields();
    values.spVoucherId = spVoucherId;
    values.status = status;
    auditRecharge(values)
      .then((res) => {
        if (res.httpCode == 200) {
          props.onClear(clearForm);
        }
      })
  },500);
  return (
    <div>
      <Modal
        className='recharge_modal'
        visible={visible}
        title="充值审核"
        footer={[
          <Button key="back" onClick={() => handlePass(2)}>
            审核不通过
          </Button>,
          <Button key="submit" type="primary" onClick={() => handlePass(1)}>
            审核通过
          </Button>,
        ]}
        onCancel={() => props.onClear(clearForm)}
      >
        <Form form={form}>
          <FormItem
            label="充值门店"
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 12 }}
          >
            {infos.shopName}
          </FormItem>
          <FormItem
            label="充值金额"
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 12 }}
          >
            {infos.amount}
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
                  marginTop: 5,
                }}
              >
                此凭证与
                {repeatNos.join("，")}
                图片相同
              </p>
            ) : (
              <div className="cz_imgboxsLists">
                {imgs &&
                  imgs.length &&
                  imgs.map((item, index) => (
                    <QenlargeImg
                      url={
                        sessionStorage.getItem("oms_fileDomain") + item.picUrl
                      }
                    />
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
export default AuditRechargeModal;
