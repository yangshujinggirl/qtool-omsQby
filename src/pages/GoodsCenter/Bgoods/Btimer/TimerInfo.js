import React, { useState, useEffect } from "react";
import { getTimeInfoApi } from "api/home/GoodsCenter/Bgoods/Btimer";
import  Columns from "./AddTimer/column";
import { Button,Form } from "antd";
import Qtable from "common/Qtable/index"; //表单
import moment from 'moment'
const FormItem = Form.Item;

const TimerInfo = props => {
  const [infos, setInfos] = useState({});
  const [goodList, setGoodList] = useState([]);
  //初始化数据
  useEffect(() => {
    const { id } = props.match.params;
    getTimeInfoApi({ pdTaskTimeId: id }).then(res => {
      setInfos(res.result);
      setGoodList(res.result.taskDetails);
    });
  }, []);
  const goback = () => {
    props.history.push("/account/b_timing");
  };
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
        <span>{infos.taskTime&&moment(infos.taskTime).format('YYYY-MM-DD HH:mm:ss')}</span>
      </FormItem>
      <FormItem
        label="状态调整"
        labelCol={{ span: 3, offset: 1 }}
        wrapperCol={{ span: 8 }}
      >
          <div>
          {infos.statusnew == 1 ? <span>上新　</span> : <span>下新　</span>}
          {infos.statushot == 1 ? (
            <span>上畅销　</span>
          ) : (
            <span>下畅销　</span>
          )}
          {infos.salestatus == 1 ? <span>上架　</span> : <span>下架　</span>}
        </div>
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
