import React,{useState,useEffect} from 'react'
import { getTaskInfoApi } from "api/home/GoodsCenter/Cgoods/Ctask";
import { Columns1, Columns2, Columns3 } from "./AddTask/column";
import { Form, Button } from "antd";
import Qtable from "common/Qtable/index"; //表单
import moment from "moment";
const FormItem = Form.Item;

const TaskInfo =(props)=> {
  const [infos,setInfos] = useState({});
  const [goodList,setGoodList] = useState([])
  //初始化数据
  useEffect(()=>{
    // const {id} = props.match.params
    // getTaskInfoApi({taskId:id}).then(res=>{
    // setInfos(res)
    // setGoodList(res.skuList)
    // });
    
    const res = {
      taskName: "名字",
      taskOperateStartTime: "2018-10-09",
      taskOperateEndTime: "2018-10-10",
      taskType: 2,
      extraField: 0,
      skuList: [{ id: 1, name: 1, extraInfo: "11" }]
    };
    setInfos(res);
    setGoodList(res.skuList);
    console.log(111)
  },[]);
  const goback = () => {
    props.history.push("/account/cTask");
  };
  const { taskType } = infos;
  const Columns = taskType == 1 ? Columns1 : taskType == 2 ? Columns2 : Columns3;
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
          <span>{infos.taskOperateStartTime}</span>
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
        <Button type='primary' size='large' onClick={goback}>返回</Button>
      </div>
    </Form>
  );
}
export default TaskInfo;

