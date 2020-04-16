import React, { Component } from "react";
import { Tabs } from "antd";
import MarketStatistic from "./Market";
import OffLineStatistic from "./OffLine";

const { TabPane } = Tabs;

/**
 * 渠道统计 zhy
 */
class ChangelStatictic extends Component {
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
          <TabPane tab="线下店" key="1">
            {level == "1" && <OffLineStatistic/>}
          </TabPane>
          <TabPane tab="市场推广" key="2">
            {level == "2" && <MarketStatistic/>}
          </TabPane>
        </Tabs>
      </div>
    );
  }
}

export default ChangelStatictic;
 