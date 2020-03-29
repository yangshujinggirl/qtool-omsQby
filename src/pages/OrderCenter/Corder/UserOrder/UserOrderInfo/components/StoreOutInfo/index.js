import React from "react";
import { Card, Tabs } from "antd";
import { Qtable } from "common";
const { TabPane } = Tabs;
import { GoodColumns, LogColumns } from "./columns";

const StoreOutInfo = props => {
  const { operateLogList } = props;
  return (
    <React.Fragment>
      <Card title="出库信息" className="base_info">
        <Tabs type="card">
          {operateLogList.map(item => (
            <TabPane tab="华东仓配中心" key="1">
              <div>
                <div>{item.titleName}</div>
                <div>
                  <Form.Item label="物流公司">
                    {item.packageList.expressCompany}
                  </Form.Item>
                  <Form.Item label="快递公司">
                    {item.packageList.expressNo}
                  </Form.Item>
                </div>
                <div>商品信息</div>
                <div>
                  <Qtable columns={GoodColumns} dataSource={item.skuList} />
                </div>
                <div>日志信息</div>
                <div>
                  <Qtable
                    columns={LogColumns}
                    dataSource={item.operateLogList}
                  />
                </div>
              </div>
            </TabPane>
          ))}
        </Tabs>
      </Card>
    </React.Fragment>
  );
};
export default StoreOutInfo;
