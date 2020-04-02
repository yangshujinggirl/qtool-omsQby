import React, { useState, useEffect } from "react";
import { Form, Input, DatePicker, Radio,Button , Checkbox } from "antd";
import { Qbtn } from "common";
import moment from "moment";
const TextArea = Input.TextArea;
const RadioGroup = Radio.Group;
const CheckboxGroup = Checkbox.Group;
import {
  savePushApi,
  getInfosApi
} from "api/home/OperateCenter/Boperate/Bpush";
const options = [
  { label: "店主", value: "1" },
  { label: "店长", value: "2" },
  { label: "店员", value: "3" }
];
const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 }
};
const Bpush = props => {
  const [form] = Form.useForm();
  const [pushNow, setPushNow] = useState(1);
  const [alertType, setAlertType] = useState(true);
  const [status, setStatus] = useState(true);
  const { id } = props.match.params;
  //修改时初始化数据
  useEffect(() => {
    const { id } = props.match.params;
    if (id) {
      getInfosApi(id).then(res => {
        if (res.httpCode == 200) {
          const {
            alertType,
            pushTime,
            alertTypeContent,
            pushNow,
            status,
            pushPerson
          } = res.result;
          let content = {};
          switch (alertType) {
            case 10:
              content.bannerIdNum = alertTypeContent;
              break;
            case 20:
              content.code = alertTypeContent;
              break;
            case 30:
              content.H5Url = alertTypeContent;
              break;
            case 40:
              content.textInfo = alertTypeContent;
              break;
          };
          setPushNow(pushNow);
          setAlertType(alertType);
          setStatus(status);
          form.setFieldsValue({
            ...res.result,
            pushPerson: pushPerson.split("-"),
            alertTypeContent: content,
            pushTime: pushNow == 0 ? moment(pushTime) : undefined
          });
        }
      });
    }
  }, []);
  /**
   * form表单变化
   * @param {*} changedValues
   * @param {*} allValues
   */
  const onValuesChange = (changedValues, allValues) => {
    console.log(allValues);
    const { pushNow, alertType } = changedValues;
    if (pushNow == 0 || pushNow == 1) {
      if (pushNow == 1) {
        form.resetFields(["pushTime"]);
      }
      setPushNow(pushNow);
    }
    if (alertType) {
      form.resetFields(["alertTypeContent"]);
      setAlertType(alertType);
    }
   
  };
  //保存
  const handleSubmit = async e => {
    const values = await form.validateFields();
    const params = formatValue(values);
    savePushApi(params).then(res => {
      if (res.httpCode == 200) {
        goBack();
      }
    });
  };
  //请求数据格式化
  const formatValue = values => {
    const { pushPerson, pushTime, alertTypeContent, ..._values } = values;
    _values.pushPerson = pushPerson.join("-");
    _values.pushType = 10;
    for (const key in alertTypeContent) {
      if (alertTypeContent[key]) {
        _values.alertTypeContent = alertTypeContent[key];
      }
    }
    if (id) {
      _values.status = status;
      _values.bsPushId = id;
    } else {
      _values.status = 10;
    }
    if (pushTime) {
      _values.pushTime = moment(values.pushTime).format("YYYY-MM-DD HH:mm:ss");
    }
    console.log(_values);
    return _values;
  };
  /**
   * 取消
   */
  const goBack = () => {
    props.history.push("/account/b_push");
  };
  const radioStyle = {
    display: "block",
    height: "30px",
    lineHeight: "30px",
    marginBottom: "20px"
  };
  return (
    <div className="oms-common-addEdit-pages">
      <Form
        onValuesChange={onValuesChange}
        form={form}
        {...formItemLayout}
        className="common-addEdit-form"
      >
        <Form.Item
          label="推送主题"
          name="title"
          rules={[{ required: true, message: "请输入推送主题" }]}
        >
          <Input
            placeholder="请输入10字以内推送主题"
            maxLength="10"
            autoComplete="off"
          />
        </Form.Item>
        <Form.Item label="推送时间">
          <Form.Item
            name="pushNow"
            noStyle
            rules={[{ required: true, message: "请选择推送时间" }]}
          >
            <RadioGroup>
              <Radio style={radioStyle} value={1}>
                立即推送
              </Radio>
              <Radio style={radioStyle} value={0}>
                定时推送
              </Radio>
            </RadioGroup>
          </Form.Item>
          <Form.Item
            noStyle
            name="pushTime"
            rules={[
              {
                required: pushNow == 0,
                message: "请输入定时推送时间"
              },
              {
                validator: (rule, value) => {
                  if (pushNow == 0) {
                    const time = new Date(value).getTime();
                    const currentTime = new Date().getTime();
                    if (time >= currentTime) {
                      return Promise.resolve();
                    }
                    return Promise.reject("请选择当前时间之后的时间");
                  }
                  return Promise.resolve();
                }
              }
            ]}
          >
            <DatePicker
              disabled={pushNow !== 0}
              showTime
              format="YYYY-MM-DD HH:mm:ss"
            />
          </Form.Item>
        </Form.Item>
        <Form.Item
          label="推送内容"
          name="msgContent"
          rules={[{ required: true, message: "请选择推送内容" }]}
        >
          <TextArea
            className="ant-textarea"
            placeholder="请输入30字以下推送内容"
            maxLength="30"
            rows={6}
          />
        </Form.Item>
        <Form.Item label="推送类型">
          <Form.Item
            noStyle
            name="alertType"
            rules={[{ required: true, message: "请选择推送类型" }]}
          >
            <RadioGroup>
              <Radio style={radioStyle} value={10}>
                banner id
              </Radio>
              <Radio style={radioStyle} value={20}>
                商品编码
              </Radio>
              <Radio style={radioStyle} value={30}>
                H5连接URL
              </Radio>
              <Radio style={radioStyle} value={40}>
                文本信息
              </Radio>
            </RadioGroup>
          </Form.Item>
          <div style={{ display: "inline-block", verticalAlign: "top" }}>
            <Form.Item
              name={["alertTypeContent", "bannerIdNum"]}
              rules={[{ required: alertType == 10, message: "请输入bannerid" }]}
            >
              <Input disabled={alertType !== 10} autoComplete="off" />
            </Form.Item>
           <Form.Item
              name={["alertTypeContent", "code"]}
              rules={[{ required: alertType == 20, message: "请输入商品编码" }]}
            >
              <Input disabled={alertType !== 20} autoComplete="off" />
            </Form.Item>
            <Form.Item
              name={["alertTypeContent", "H5Url"]}
              rules={[
                { required: alertType == 30, message: "请输入H5连接URL" }
              ]}
            >
              <Input disabled={alertType !== 30} autoComplete="off" />
            </Form.Item>
            <Form.Item
              name={["alertTypeContent", "textInfo"]}
              rules={[{ required: alertType == 40, message: "请输入文本信息" }]}
            >
              <TextArea
                className="ant-textarea"
                disabled={alertType !== 40}
                placeholder="请输入300字以下推送内容"
                maxLength="300"
                rows={6}
              />
            </Form.Item>
          </div>
        </Form.Item>
        <Form.Item
          label="推送人群"
          name="pushPerson"
          rules={[{ required: true, message: "请输入推送人群" }]}
        >
          <CheckboxGroup options={options} />
        </Form.Item>
        <div className="handle-operate-save-action">
          <Button onClick={goBack} size='large'>返回</Button>
          <Button type="primary" size='large' onClick={handleSubmit}>
            保存
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default Bpush;
