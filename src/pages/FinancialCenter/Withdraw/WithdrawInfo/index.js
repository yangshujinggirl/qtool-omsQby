import React, { useEffect, useState } from "react";
import { Form, Card } from "antd";
import { Qtable } from "common";
import { getInfosApi } from "api/home/FinancialCenter/Withdraw";
import Columns from "./columns";

const WithdrawInfo = (props) => {
  const { id } = props.match.params;
  const [infos, setInfos] = useState({});
  const [logs, setLogs] = useState([]);
  /**
   * 初始化信息
   */
  useEffect(() => {
    getInfosApi(id).then((res) => {
      if (res.httpCode == 200) {
        const { ispCarryCash, ispCarryCashLogList } = res.result;
        setInfos(ispCarryCash);
        setLogs(ispCarryCashLogList);
      }
    });
  }, []);
  return (
    <div className="oms-common-addEdit-pages base_info">
      <Card title="提现信息">
        <Form.Item label="提现单号">{infos.carryCashNo}</Form.Item>
        <Form.Item label="审核状态">{infos.statusStr}</Form.Item>
        <Form.Item label="门店名称">{infos.statusStr}</Form.Item>
        <Form.Item label="提现金额">{infos.amount}</Form.Item>
        <Form.Item label="提现时间">{infos.createTime}</Form.Item>
      </Card>
      <Card title="订单日志">
        <Qtable columns={Columns} dataSource={logs||[]} />
      </Card>
    </div>
  );
};
export default WithdrawInfo;
