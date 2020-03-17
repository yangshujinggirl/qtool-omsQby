import React, { useState, useEffect } from "react";
import { Form, Input, Select, Radio, Button } from "antd";
import Upload from "common/QuploadImgLimt";
import { Qbtn } from "common";
import { saveApi, getInfosApi } from "api/home/OperateCenter/Boperate/Banner";
import "./index.less";
const RadioGroup = Radio.Group;
const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 }
};
const Bpush = props => {
  const [form] = Form.useForm();
  const { id } = props.match.params;
  //修改时初始化数据
  useEffect(() => {
    const { id } = props.match.params;
    if (id) {
      getInfosApi(id).then(res => {
        if (res.httpCode == 200) {
          const { url, ...infos } = res.result;
          const fileList = [
            {
              uid: "-1",
              name: "image.png",
              status: "done",
              url: sessionStorage.getItem("oms__fileDomain") + url
            }
          ];
          setFileList(fileList);
          setImgUrl(url);
          form.setFieldsValue(infos);
        }
      });
    }
  }, []);

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
    if (id) {
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
  return (
    <div className="oms-common-addEdit-pages">
      <Form
        form={form}
        {...formItemLayout}
        className="common-addEdit-form"
      >
        <Form.Item
          label="问题类型"
          name="type"
          rules={[{ required: true, message: "请选择问题类型" }]}
        >
          <Select allowClear={true} placeholder="请选择问题类型">
            <Option value={20} key={10}>
              运营问题
            </Option>
            <Option value={30} key={20}>
              商品问题
            </Option>
            <Option value={40} key={30}>
              设计问题
            </Option>
            <Option value={50} key={40}>
              招商问题
            </Option>
            <Option value={60} key={50}>
              系统问题
            </Option>
            <Option value={70} key={60}>
              其他
            </Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="问题状态"
          name="status"
          rules={[{ required: true, message: "请选择问题状态" }]}
        >
          <Select allowClear={true} placeholder="请选择问题状态">
            <Option value={1}>上线</Option>
            <Option value={0}>下线</Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="标题"
          name="title"
          rules={[{ required: true, message: "请输入标题" }]}
        >
          <Input
            placeholder="请输入30字以内标题"
            maxLength="30"
            autoComplete="off"
          />
        </Form.Item>
        <div className="handle-operate-save-action">
          <Button onClick={goBack} size="large">
            返回
          </Button>
          <Button type="primary" size="large" onClick={handleSubmit}>
            保存
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default Bpush;
