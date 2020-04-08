import React, { useState, useEffect } from "react";
import { Form, Input, Button, Modal, message } from "antd";
import Upload from "common/QupLoadImgLimt";
import UploadList from "common/QupLoadImgLimt";
import { saveApi, getInfosApi } from "api/home/OperateCenter/Coperate/ThemeAct";
import "./index.less";
import img from "./imgs/ex6.png";
const TextArea = Input.TextArea;
const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};
const Bpush = (props) => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [listFileList, setListFileList] = useState([]);
  const [visible, setVisible] = useState(false);
  const { id } = props.match.params;
  //修改时初始化数据
  useEffect(() => {
    const { id } = props.match.params;
    if (id) {
      getInfosApi(id).then((res) => {
        if (res.httpCode == 200) {
          const { indexPicUrl, listPagePicUrl, ...infos } = res.result;
          const fileList = [
            {
              uid: "-1",
              name: "image.png",
              status: "done",
              url: sessionStorage.getItem("oms_fileDomain") + indexPicUrl,
              img: indexPicUrl,
            },
          ];
          const listFileList = [
            {
              uid: "-2",
              name: "image.png",
              status: "done",
              url: sessionStorage.getItem("oms_fileDomain") + listPagePicUrl,
              img: listPagePicUrl,
            },
          ];
          setFileList(fileList);
          setListFileList(listFileList);
          form.setFieldsValue({
            ...infos,
            indexPicUrl: fileList,
            listPagePicUrl: listFileList,
          });
        }
      });
    }
  }, []);

  //保存
  const handleSubmit = async () => {
    const values = await form.validateFields();
    const { indexPicUrl, listPagePicUrl, ..._values } = values;
    if (indexPicUrl.length == 0) {
      return message.warning("请先上传首页展示图片", 0.8);
    }
    if (listPagePicUrl.length == 0) {
      return message.warning("请先上传列表页展示图片", 0.8);
    }
    _values.indexPicUrl = indexPicUrl[0].response
      ? indexPicUrl[0].response.result
      : indexPicUrl[0].img;
    _values.listPagePicUrl = listPagePicUrl[0].response
      ? listPagePicUrl[0].response.result
      : listPagePicUrl[0].img;
    if (id) {
      _values.themeActivityId = id;
    }
    saveApi(_values).then((res) => {
      if (res.httpCode == 200) {
        goBack();
      }
    });
  };

  /**
   * 取消
   */
  const goBack = () => {
    props.history.push("/account/themati_activities");
  };
  /**
   *
   * 首页展示图片
   */
  const upDateList = (fileList) => {
    setFileList(fileList);
  };
  /**
   *
   * @param {*} 列表展示图片
   */
  const upDateListFileList = (fileList) => {
    setListFileList(fileList);
  };
  /**
   * 查看示例
   */
  const onlookEx = () => {
    setVisible(true);
  };
  /**
   * 查看示例关闭掉
   */
  const onCancel = () => {
    setVisible(false);
  };
  return (
    <div className="oms-common-addEdit-pages add_theme">
      <Form form={form} {...formItemLayout} className="common-addEdit-form">
        <Form.Item
          label="主题活动名称"
          name="themeName"
          rules={[{ required: true, message: "请输入主题活动名称" }]}
        >
          <Input
            placeholder="请输入主题活动名称，15字符以内"
            maxLength="15"
            autoComplete="off"
          />
        </Form.Item>
        <Form.Item
          label="主题活动副标题"
          name="subtitle"
          rules={[{ required: true, message: "请输入主题活动副标题" }]}
        >
          <Input
            placeholder="请输入主题活动副标题，15字符以内"
            maxLength="15"
            autoComplete="off"
          />
        </Form.Item>
        <Form.Item
          label="主题活动描述"
          name="description"
          rules={[{ required: true, message: "请输入主题活动描述" }]}
        >
          <TextArea
            rows="3"
            maxLength="50"
            placeholder="请输入主题活动名称，50字符以内"
          />
        </Form.Item>
        <Form.Item label="活动图片">
          <Form.Item>
            <div className="add_theme_img">
              <Upload
                name="indexPicUrl"
                action="/qtoolsApp/upload/img"
                limit={1}
                fileList={listFileList}
                upDateList={upDateListFileList}
                width="366"
                height="339"
              />
            </div>
            <span className="suffix_tips">
              首页展示图片，图片尺寸为366*339，格式为jpg
            </span>
          </Form.Item>
          <a className="theme-color look-exp" onClick={onlookEx}>
            查看示例
          </a>
          <Form.Item>
            <div className="add_theme_img">
              <UploadList
                name="listPagePicUrl"
                name="listPagePicUrl"
                action="/qtoolsErp/upload/img"
                limit={1}
                fileList={fileList}
                upDateList={upDateList}
                width="686"
                height="365"
              />
            </div>
            <span className="suffix_tips">
              列表页展示图片，图片尺寸为686*365，格式为jpg
            </span>
          </Form.Item>
        </Form.Item>
        <Form.Item
          label="跳转页面编码"
          name="pageCode"
          rules={[{ required: true, message: "请输入跳转页面编码" }]}
        >
          <Input placeholder="请输入跳转页面编码" autoComplete="off" />
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
      <Modal visible={visible} onCancel={onCancel} footer={null}>
        <img style={{ width: "470px" }} src={img} />
      </Modal>
    </div>
  );
};

export default Bpush;
