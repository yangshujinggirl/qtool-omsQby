import React, { useState, useEffect } from "react";
import { Row, Col, Collapse } from "antd";
import DetailSecond from "./components/DetailSecond";
import { getInfosApi } from "api/home/ChannelManage/Statistics";
const { Panel } = Collapse;

const OffLineStatisticInfo = props => {
  //获取路由参数
  const getParams =(props)=>{
    const temp = props.location.search.slice(1).split("&");
    let obj = {}
    temp.map(item => {
      const arr = item.split("=");
      obj[arr[0]] = arr[1]
    });
    return obj
  }
  const { id,source } = getParams(props);
  const [info, setInfos] = useState({});
  useEffect(() => {
    getInfo();
  },[]);
  //获取基本信息
  const getInfo = () => {
    getInfosApi(id).then(res => {
      if (res.httpCode == 200) {
        setInfos(res.result);
      }
    });
  };
  return (
    <div>
      <Collapse  defaultActiveKey={[1,2]}>
        <Panel key={1} header="一级渠道基础信息">
          <div>
            <Row>
              <Col span={6}>一级渠道ID：{info.channelPopularizeCoding}</Col>
              <Col span={6}>一级渠道名称：{info.name}</Col>
              <Col span={6}>
                渠道类型：{source == 2 ? "市场推广" : "线下店"}
              </Col>
              {source == 2 ? (
                <Col span={6}>负责人：{info.principal}</Col>
              ) : (
                <Col span={6}>省份：{info.provinceName}</Col>
              )}
              <Col span={6}>二级渠道数：{info.levelTwoQty}</Col>
              {source == 2 && <Col span={6}>备注：{info.remark}</Col>}
            </Row>
          </div>
        </Panel>
        <Panel key={2}  header="二级渠道">
          <DetailSecond source={source} id={id}/>
        </Panel>
      </Collapse>
    </div>
  );
};

export default OffLineStatisticInfo;
