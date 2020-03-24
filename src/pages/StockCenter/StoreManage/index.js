import React, { Component } from "react";
import { Tabs } from "antd";
import CrossGoodStore from "./CrossGoodStore";
import TradeGoodStore from "./TradeGoodStore";
const { TabPane } = Tabs;

class StoreManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      level:"1"
    }
  }
  callback = level => {
    this.setState({
      level
    });
  };
  render() {
    const { level } = this.state;
    return (
      <div>
        <Tabs activeKey={level} onChange={this.callback}>
          <TabPane tab="一般贸易商品仓" key="1">
            {level == "1" && <TradeGoodStore/>}
          </TabPane>
          <TabPane tab="跨境商品仓" key="2">
            {level == "2" && <CrossGoodStore/>}
          </TabPane>
        </Tabs>
      </div>
    );
  }
}

export default StoreManage;
 