import React, { Component } from "react";
import { Tabs } from "antd";
const { TabPane } = Tabs;
import TradeGoods from "./TradeGoods";
import PassGoods from "./PassGoods";
class GoodsAudit extends Component {
  render() {
    return (
      <div>
        <Tabs defaultActiveKey="1">
          <TabPane tab="一般贸易商品" key="1">  
            <TradeGoods/>
          </TabPane>
          <TabPane tab="跨境商品" key="2">
            111
          </TabPane>
        </Tabs>
      </div>
    );
  }
}

export default GoodsAudit;
