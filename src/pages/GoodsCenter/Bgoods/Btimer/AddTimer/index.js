import React, { useState, useEffect } from "react";
import { getTimeInfoApi, AddTimeApi } from "api/home/GoodsCenter/Bgoods/Btimer";
import Columns from "./column";
import { Form, Input, Button, message, Select, Checkbox } from "antd";
import moment from "moment";
import ImportBtn from "common/QupLoadFileList";
import { DateTime } from "common/QdisabledDateTime";

const AddTimer = (props) => {
  const [form] = Form.useForm();
  const [goodList, setGoodList] = useState([]);
  //初始化数据
  useEffect(() => {
    const { id } = props.match.params;
    if (id) {
      getTimeInfoApi({ pdTaskTimeId: id }).then(res => {
        if (res.httpCode == 200) {
          let {
            taskDetails,
            taskName,
            taskTime,
            salestatus,
            statusnew,
            statushot
          } = res.result;
          let goodList = [];
          if (taskDetails.length > 0) {
            taskDetails.map(item => (item.key = item.pdTaskTimeId));
          }
          setGoodList(goodList);
          taskTime = moment(taskTime).format("YYYY-MM-DD HH:mm:ss");
          form.setFieldsValue({
            taskName,
            taskTime,
            salestatus,
            statusnew,
            statushot
          });
        }
      });
    }
  }, []);

  //保存
  const handleSubmit = async e => {
    const values = await form.validateFields();
    let {taskTime,..._values} = values;
    _values.taskTime = moment(taskTime).format('YYYY-MM-DD HH:mm:ss');
    console.log(_values)
    
    
    // form.validateFields((err, values) => {
      // if (!err) {
        // values.taskTime = moment(values.taskTime, "YYYY-MM-DD HH:mm:ss");
        AddTimeApi({taskName:1,taskTime:'2020-09-09 23:09:09',statusnew:1,codes:[{code:'11111',sku_name:''}]}).then(res => {
          if (res.code == "200") {
            message.success("保存成功", 0.8);
          };
        });
      // }
    // });
  };
  //修改上传数据
  const changeDataList = dataList => {
    setGoodList(dataList);
    // setState({
    //   goodList: [
    //     {
    //       id: 1,
    //       name: "商品名称",
    //       extraInfo: "xinxi"
    //     }
    //   ]
    // });
  };
  //下载模板
  const downLoadTemp = () => {
    window.open("src/static/timing.xlsx");
  };
  const goback = () => {
    props.history.push("/account/cTask");
  };
  return (
    <Form form={form} className="addUser-form addcg-form" onFinish={handleSubmit}>
      <Form.Item
        label="定时名称"
        name="taskName"
        labelCol={{ span: 4, offset: 1 }}
        wrapperCol={{ span: 8 }}
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
        labelCol={{ span: 4, offset: 1 }}
        wrapperCol={{ span: 8 }}
        rules={[{ required: true, message: "请选择定时时间" }]}
      >
        <DateTime />
      </Form.Item>
      <Form.Item
        name="salestatus"
        label="状态调整"
        labelCol={{ span: 4, offset: 1 }}
        wrapperCol={{ span: 8 }}
        // rules={[{ required: true, message: "请选择状态" }]}
      > 
        {/* <Form.Item name="statusnew" noStyle>
          <Checkbox.Group>
            <Checkbox value={1}>上新</Checkbox>
            <Checkbox value={0}>下新</Checkbox>
          </Checkbox.Group>
        </Form.Item>
        <Form.Item name="statushot" noStyle>
          <Checkbox.Group>
            <Checkbox value={1}>上畅销</Checkbox>
            <Checkbox value={0}>下畅销</Checkbox>
          </Checkbox.Group>
        </Form.Item> */}
        <Checkbox.Group>
          <Checkbox value={1}>上架</Checkbox>
          <Checkbox value={0}>下架</Checkbox>
        </Checkbox.Group>
      
      </Form.Item>
      <Form.Item
        label="请选择要修改的sku"
        labelCol={{ span: 4, offset: 1 }}
        wrapperCol={{ span: 19 }}
      >
        <ImportBtn
          changeDataList={changeDataList}
          downLoadTemp={downLoadTemp}
          Columns={Columns}
          dataList={goodList}
          action="/qtoolsErp/taskTime/inputcode"
        />
      </Form.Item>
      <Form.Item wrapperCol={{ push: 4, span: 20 }}>
        <Button className="edit_btn" size="large" onClick={goback}>
          取消
        </Button>
        <Button type="primary" size="large" htmlType='submit'>
          保存
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AddTimer;
