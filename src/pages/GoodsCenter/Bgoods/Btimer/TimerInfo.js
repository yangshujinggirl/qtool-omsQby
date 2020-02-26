import React, { useState, useEffect } from "react";
import { getTimeInfoApi } from "api/home/GoodsCenter/Bgoods/Btimer";
import  Columns from "./AddTimer/column";
import { Form, Button, } from "antd";
import Qtable from "common/Qtable/index"; //表单
import moment from "moment";
const FormItem = Form.Item;

const TimerInfo = props => {
  const [infos, setInfos] = useState({});
  const [goodList, setGoodList] = useState([]);
  //初始化数据
  useEffect(() => {
    const { id } = props.match.params;
    getTimeInfoApi({ pdTaskTimeId: id }).then(res => {
      setInfos(res);
      setGoodList(res.skuList);
    });
    // const res = {
    //   taskName: "名字",
    //   taskOperateStartTime: "2018-10-09",
    //   taskOperateEndTime: "2018-10-10",
    //   taskType: 2,
    //   extraField: 0,
    //   skuList: [{ id: 1, name: 1, extraInfo: "11" }]
    // };
    // setInfos(res);
    // setGoodList(res.skuList);
    // console.log(111)
  }, []);
  const goback = () => {
    props.history.push("/account/cTask");
  };
  const { taskType } = infos;
  return (
    <Form className="addUser-form addcg-form">
      <FormItem
        label="定时名称"
        labelCol={{ span: 3, offset: 1 }}
        wrapperCol={{ span: 8 }}
      >
        {infos.taskName}
      </FormItem>
      <FormItem
        label="执行时间"
        labelCol={{ span: 3, offset: 1 }}
        wrapperCol={{ span: 8 }}
      >
        <span>{infos.taskOperateStartTime}</span>
      </FormItem>
      <FormItem
        label="状态调整"
        labelCol={{ span: 3, offset: 1 }}
        wrapperCol={{ span: 8 }}
      >
        {infos.extraField == 0 ? "上架" : "下架"}
      </FormItem>

      <FormItem
        label="商品列表"
        labelCol={{ span: 3, offset: 1 }}
        wrapperCol={{ span: 20 }}
      >
        <Qtable dataSource={goodList} columns={Columns}/>
      </FormItem>
      <div className="btn_center">
        <Button type="primary" size="large" onClick={goback}>
          返回
        </Button>
      </div>
    </Form>
  );
};
export default TimerInfo;
