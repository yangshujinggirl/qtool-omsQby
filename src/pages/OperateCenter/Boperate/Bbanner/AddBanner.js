import React, { useState, useEffect } from "react";
import { Form, Input, Select, Radio, Button } from "antd";
import Upload from "common/QupLoadImgLimt";
import { Qbtn } from "common";
import {
  saveApi,
  getInfosApi
} from "api/home/OperateCenter/Boperate/Banner";
import "./index.less";
const RadioGroup = Radio.Group;
const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 }
};
const Bpush = props => {
  const [form] = Form.useForm();
  const [jumpCode, setJumpCode] = useState(0);
  const [fileList, setFileList] = useState([]);
  const [imgUrl, setImgUrl] = useState('');
  const { id } = props.match.params;
  //修改时初始化数据
  useEffect(() => {
    const { id } = props.match.params;
    if (id) {
      getInfosApi(id).then(res => {
        if (res.httpCode == 200) {
          const {
            url,
           ...infos
          } = res.result;
          const fileList = [{
            uid: '-1',
            name: 'image.png',
            status: 'done',
            url:sessionStorage.getItem('oms__fileDomain')+url
          }]
          setFileList(fileList)
          setImgUrl(url)
          form.setFieldsValue(infos);
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
    const { jumpCode } = changedValues;
    if (jumpCode) {
      form.resetFields(["configureCode", "configureUrl"]);
      setJumpCode(jumpCode);
    }
  };
  //保存
  const handleSubmit = async e => {
    const values = await form.validateFields();
    const params = formatValue(values);
    saveApi(params).then(res => {
      if (res.httpCode == 200) {
        goBack();
      }
    });
  };
  //请求数据格式化
  const formatValue = values => {
    values.url = imgUrl;
    values.type = 10;
    if(id){
      values.pdBannerId = id;
    }
    return values;
  };
  /**
   * 取消
   */
  const goBack = () => {
    props.history.push("/account/b_banner");
  };
  const upDateList = fileList => {
    setFileList(fileList);
    if(fileList[0]&&fileList[0].response&&fileList[0].response.httpCode== 200){
      setImgUrl(fileList[0].response.result[0])
    }
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
          label="banner名称"
          name="name"
          rules={[{ required: true, message: "请输入推送主题" }]}
        >
          <Input
            placeholder="请输入10字以内推送主题"
            maxLength="10"
            autoComplete="off"
          />
        </Form.Item>
        <Form.Item
          label="banner状态"
          name="status"
          rules={[{ required: true, message: "请选择banner状态" }]}
        >
          <Select placeholder="请选择banner状态">
            <Option value={1}>上线</Option>
            <Option value={0}>下线</Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="banner权重"
          name="rank"
          rules={[
            { required: true, message: "请输入banner权重" },
            {
              pattern: /^100(\.0*)?$|^0*$|^[0-9]?[0-9]?(\.[0-9]*)?$/,
              message: "权重在0-100之间"
            }
          ]}
        >
          <Input placeholder="请输入banner权重" autoComplete="off" />
        </Form.Item>
        <Form.Item label="跳转">
          <Form.Item
            noStyle
            name="jumpCode"
          >
            <RadioGroup>
              <Radio style={radioStyle} value={1}>
                后台配置页面
              </Radio>
              <Radio style={radioStyle} value={2}>
                跳转链接
              </Radio>
            </RadioGroup>
          </Form.Item>
          <div style={{ display: "inline-block", verticalAlign: "top" }}>
            <Form.Item
              name="configureCode"
              rules={[
                { required: jumpCode == 1, message: "请输入跳转页面编码" }
              ]}
            >
              <Input
                disabled={jumpCode !== 1}
                placeholder="请输入跳转页面编码"
                autoComplete="off"
              />
            </Form.Item>
            <Form.Item
              name="configureUrl"
              rules={[{ required: jumpCode == 2, message: "请输入商品编码" }]}
            >
              <Input
                placeholder="请输入跳转链接"
                disabled={jumpCode !== 2}
                autoComplete="off"
              />
            </Form.Item>
          </div>
        </Form.Item>
        <Form.Item label="展示App">Q掌柜App</Form.Item>
        <Form.Item label="banner图片">
          <div className="add_b_banner">
            <Upload
              action="/qtoolsErp/upload/img?type=banner"
              limit={1}
              fileList={fileList}
              upDateList={upDateList}
            />
          </div>
        </Form.Item>
        <div className="handle-operate-save-action">
          <Button onClick={goBack} size='large'>返回</Button>
          <Button type="primary"  size='large'onClick={handleSubmit}>
            保存
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default Bpush;
