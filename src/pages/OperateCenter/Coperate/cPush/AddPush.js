import React, { useState, useEffect } from "react";
import {
  Form,
  Input,
  DatePicker,
  Radio,
  Checkbox,
  Select,
  message,
  Button
} from "antd";
import { Qbtn } from "common";
import moment from "moment";
const TextArea = Input.TextArea;
const RadioGroup = Radio.Group;
import {
  savePushApi,
  getInfosApi
} from "api/home/OperateCenter/Coperate/Cpush";
import { GetCategoryApi } from "api/home/BaseGoods";
import linkOption from "./data.js";

const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 }
};
const Bpush = props => {
  const [form] = Form.useForm();
  const [pushNow, setPushNow] = useState(1);
  const [alertType, setAlertType] = useState(true);
  const [status, setStatus] = useState(true);
  const [linkInfoType, setLinkInfoType] = useState("");
  const [pushPersonType, setPushPersonType] = useState(0);
  const [categoryLists, setCategoryLists] = useState([]);
  const { id } = props.match.params;
  //修改时初始化数据
  useEffect(() => {
    getInfoApi();
    getCategoryList();
  }, []);
  /**
   * 获取详情
   */
  const getInfoApi = () => {
    const { id } = props.match.params;
    if (id) {
      getInfosApi(id).then(res => {
        if (res.httpCode == 200) {
          const {
            alertType,
            pushTime,
            alertTypeContent,
            pushNow,
            status
          } = res.result;
          let content = {};
          switch (alertType) {
            case 20:
              content.code = alertTypeContent;
              break;
            case 30:
              content.H5Url = alertTypeContent;
              break;
            case 40:
              content.textInfo = alertTypeContent;
              break;
          }
          setPushNow(pushNow);
          setAlertType(alertType);
          setStatus(status);
          form.setFieldsValue({
            ...res.result,
            alertTypeContent: content,
            pushTime: pushNow == 0 ? moment(pushTime) : undefined
          });
        }
      });
    }
  };
  /**
   * 获取商品分类列表
   */
  const getCategoryList = () => {
    GetCategoryApi({ level: 1, parentId: "" }).then(res => {
      if (res.httpCode == 200) {
        const list = res.result.filter(item => item.status == 1);
        console.log(list);
        setCategoryLists(list);
      }
    });
  };
  /**
   * form表单变化
   * @param {*} changedValues
   * @param {*} allValues
   */
  const onValuesChange = (changedValues, allValues) => {
    const { pushNow, alertType, linkInfoType, pushPersonType } = changedValues;
    if (pushNow == 0 || pushNow == 1) {
      if (pushNow == 1) {
        form.resetFields(["pushTime"]);
      }
      setPushNow(pushNow);
    }
    if (alertType) {
      form.resetFields(["alertTypeContent", "linkInfoType", "linkInfo"]);
      setAlertType(alertType);
    }
    if (linkInfoType) {
      setLinkInfoType(linkInfoType);
    }
    if (pushPersonType == 0 || pushPersonType == 1) {
      setPushPersonType(pushPersonType);
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
    const {
      pushTime,
      alertTypeContent,
      ..._values
    } = values;
    if (_values.pushPersonType == 1) {
      const pushPer = _values.pushPerson.replace(/\s+/g, "").split("\n");
      if (pushPer.length > 10000) {
        return message.error("最多支持10000条用户数据", 0.8);
      }
      pushPer.map(item => {
        if (item.length > 11) {
          return message.error("一行只能输入一个手机号码", 0.8);
        }
      });
    }else{
      _values.pushPerson = 0;
    }
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
    _values.pushType = 20;
    return _values;
  };
  /**
   * 取消
   */
  const goBack = () => {
    props.history.push("/account/c_push");
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
                二级页面
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
            <div style={{ display: "inline-flex" }}>
              <Form.Item
                name="linkInfoType"
                rules={[
                  { required: alertType == 10, message: "请选择二级页面" }
                ]}
              >
                <Select
                  placeholder="请选择二级页面"
                  disabled={alertType !== 10}
                >
                  {linkOption.map(item => (
                    <Select.Option value={item.key} key={item.key}>
                      {item.value}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
              {alertType == 10 && linkInfoType == 1 && (
                <Form.Item
                  name="linkInfo"
                  rules={[{ required: true, message: "请输入页面编码" }]}
                >
                  <Input placeholder="请输入页面编码" autoComplete="off" />
                </Form.Item>
              )}
              {alertType == 10 && linkInfoType == 10 && (
                <Form.Item
                  name="linkInfo"
                  rules={[{ required: true, message: "请输入促销活动ID" }]}
                >
                  <Input placeholder="请输入促销活动ID" autoComplete="off" />
                </Form.Item>
              )}
              {alertType == 10 && linkInfoType == 8 && (
                <Form.Item
                  name="linkInfo"
                  rules={[{ required: true, message: "请选择分类" }]}
                >
                  <Select placeholder="请选择分类">
                    {categoryLists.map(el => (
                      <Select.Option key={el.id} value={el.id}>
                        {el.categoryName}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              )}
            </div>
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
        <Form.Item label="推送人群">
          <Form.Item
            name="pushPersonType"
            noStyle
            rules={[{ required: true, message: "请选择推送人群" }]}
          >
            <RadioGroup>
              <Radio style={radioStyle} value={0}>
                全部用户
              </Radio>
              <Radio style={radioStyle} value={1}>
                特定用户
              </Radio>
            </RadioGroup>
          </Form.Item>
          <Form.Item
            name="pushPerson"
            noStyle
            rules={[
              { required: pushPersonType == 1, message: "请输入特定用户" }
            ]}
          >
            <TextArea
              placeholder="最多支持10000条用户数据，多个用户请换行"
              disabled={pushPersonType !== 1}
              rows={6}
            />
          </Form.Item>
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
