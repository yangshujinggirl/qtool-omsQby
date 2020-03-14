import React, { useState, useEffect } from "react";
import { getTimeInfoApi, AddTimeApi } from "api/home/GoodsCenter/Bgoods/Btimer";
import Columns from "./column";
import { Form, Input, Button, message, Radio, Modal } from "antd";
import moment from "moment";
import ImportBtn from "common/QupLoadFileList";
import { DateTime } from "common/QdisabledDateTime";
const formLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 }
};

const AddTimer = props => {

  const [form] = Form.useForm();
  const [goodList, setGoodList] = useState([]);
  const [visible, setVisible] = useState(false);
  const [errMessage, setErrMessage] = useState("");

  //初始化数据
  useEffect(() => {
    const { id } = props.match.params;
    if (id) {
      getTimeInfoApi({ pdTaskTimeId: id }).then(res => {
        if (res.httpCode == 200) {
          let { taskDetails, ...infos } = res.result;
          if (taskDetails.length) {
            taskDetails.map(item => (item.key = item.pdTaskTimeId));
          }
          infos.taskTime = moment(infos.taskTime);
          setGoodList(taskDetails);
          form.setFieldsValue(infos);
        }
      });
    }
  }, []);

  /**
   * 保存
   * @param {*} e
   */
  const handleSubmit = async e => {
    const { salestatus, statusnew, statushot } = form.getFieldsValue(["salestatus", "statusnew", "statushot"]);
    if (!(salestatus || statusnew || statushot)) {
      form.setFields([{ name: ["salestatus"], errors: ["请选择调整状态"] }]);
    };
    const values = await form.validateFields();
    if (!form.getFieldError("salestatus")[0]) {
      let { taskTime, ..._values } = values;
      _values.taskTime = moment(taskTime).format("YYYY-MM-DD HH:mm:ss");
      _values.codes = goodList;
      AddTimeApi(_values).then(res => {
        if (res.code == "200") {
          message.success("保存成功", 0.8);
          goback();
        }
      });
    }
  };

  /**
   *
   * @param {*}
   */
  const onChange = () => {
    form.setFields([{ name: ["salestatus"], errors: [""] }]);
  };

  /**
   * 修改上传数据
   * @param {*} res
   */
  const changeDataList = res => {
    const { result, msg } = res;
    result.map((list, index) => (list.key = index));
    setGoodList(result);
    setErrMessage(msg);
    setVisible(Boolean(msg));
  };

  /**
   * 下载模板
   */
  const downLoadTemp = () => {
    window.open("src/static/timing.xlsx");
  };
  
  /**
   * 返回
   */
  const goback = () => {
    props.history.push("/account/cTask");
  };

  /**
   * modal消失
   */
  const onCancel = () => {
    setVisible(false);
  };
  return (
    <div className="oms-common-addEdit-pages">
      <Form className="common-addEdit-form" form={form} {...formLayout}>
        <Form.Item
          label="定时名称"
          name="taskName"
          rules={[{ required: true, message: "请输入定时名称" }]}
        >
          <Input
            placeholder="请输入定时名称，最多60个字符"
            maxLength={60}
            autoComplete="off"
          />
        </Form.Item>
        <Form.Item
          name="taskTime"
          label="执行时间"
          rules={[{ required: true, message: "请选择定时时间" }]}
        >
          <DateTime />
        </Form.Item>
        <Form.Item label="状态调整" className="item_required">
          <Form.Item name="salestatus" noStyle>
            <Radio.Group onChange={onChange}>
              <Radio value={1}>上架</Radio>
              <Radio value={0}>下架</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item name="statusnew" noStyle>
            <Radio.Group onChange={onChange}>
              <Radio value={1}>上新</Radio>
              <Radio value={0}>下新</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item name="statushot" noStyle>
            <Radio.Group onChange={onChange}>
              <Radio value={1}>上畅销</Radio>
              <Radio value={0}>下畅销</Radio>
            </Radio.Group>
          </Form.Item>
        </Form.Item>
        <Form.Item label="请选择要修改的sku">
          <ImportBtn
            changeDataList={changeDataList}
            downLoadTemp={downLoadTemp}
            Columns={Columns}
            dataList={goodList}
            action="/qtoolsErp/inputcode/taskTime"
          >
            {visible && (
              <Modal
                title="导入商品结果"
                visible={visible}
                footer={null}
                onCancel={onCancel}
              >
                <div>
                  <p style={{ color: "#35bab0" }}>
                    共成功导入商品{goodList.length}
                  </p>
                  {errMessage && <p>{errMessage}</p>}
                </div>
              </Modal>
            )}
          </ImportBtn>
        </Form.Item>
        <Form.Item wrapperCol={{ push: 4, span: 20 }}>
          <Button className="edit_btn" size="large" onClick={goback}>
            取消
          </Button>
          <Button type="primary" size="large" onClick={handleSubmit}>
            保存
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddTimer;
