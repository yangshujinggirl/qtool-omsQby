import React, { useState, useEffect } from "react";
import { getTaskInfoApi } from "api/home/GoodsCenter/Cgoods/Ctask";
import { Columns1, Columns2, Columns3 } from "./AddTask/column";
import { Form } from "@ant-design/compatible";
import "@ant-design/compatible/assets/index.css";
import { Button } from "antd";
import Qtable from "common/Qtable/index"; //表单
import moment from "moment";
const FormItem = Form.Item;

const TaskInfo = props => {
  const [infos, setInfos] = useState({});
  const [goodList, setGoodList] = useState([]);
  //初始化数据
  useEffect(() => {
    const { id } = props.match.params;
    getTaskInfoApi({ taskId: id }).then(res => {
      const {skuList,...infos} = res.result;
      const goodList = skuList.map((item,index)=>{item.key = index;return item})
      setInfos(infos);
      setGoodList(goodList);
    });
  }, []);
  const goback = () => {
    props.history.push("/account/c_batch_task");
  };
  const { taskType } = infos;
  const Columns =
    taskType == 1 ? Columns1 : taskType == 2 ? Columns2 : Columns3;
  return (
    <Form className="addUser-form addcg-form">
      <FormItem
        label="定时名称"
        labelCol={{ span: 3, offset: 1 }}
        wrapperCol={{ span: 8 }}
      >
        {infos.taskName}
      </FormItem>
      {taskType == 1 && (
        <FormItem
          label="执行时间"
          labelCol={{ span: 3, offset: 1 }}
          wrapperCol={{ span: 8 }}
        >
          <span>{moment(infos.taskOperateStartTime).format('YYYY-MM-DD HH:mm:ss')}</span>
        </FormItem>
      )}
      {(taskType == 2 || taskType == 3) && (
        <FormItem
          label="执行时间段"
          labelCol={{ span: 3, offset: 1 }}
          wrapperCol={{ span: 8 }}
        >
          <span>
            {infos.taskOperateStartTime} — {infos.taskOperateEndTime}
          </span>
        </FormItem>
      )}
      {taskType == 1 && (
        <FormItem
          label="状态调整"
          labelCol={{ span: 3, offset: 1 }}
          wrapperCol={{ span: 8 }}
        >
          {infos.extraField == 0 ? "上架" : "下架"}
        </FormItem>
      )}
      {taskType == 3 && (
        <div>
          <FormItem
            label="标签"
            labelCol={{ span: 3, offset: 1 }}
            wrapperCol={{ span: 8 }}
          >
            {infos.extraField}
          </FormItem>
        </div>
      )}
      <FormItem
        label="商品列表"
        labelCol={{ span: 3, offset: 1 }}
        wrapperCol={{ span: 20 }}
      >
        <Qtable dataSource={goodList} columns={Columns} />
      </FormItem>
      <div className="btn_center">
        <Button type="primary" size="large" onClick={goback}>
          返回
        </Button>
      </div>
    </Form>
  );
};
export default TaskInfo;
