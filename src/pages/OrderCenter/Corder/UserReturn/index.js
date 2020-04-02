import React, { Component } from "react";
import { Tabs } from "antd";
import AllReturn from "./AllReturn";
import AuditReturn from "./AuditReturn";
const { TabPane } = Tabs;

class UserOrder extends Component {
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
          <TabPane tab="待审核" key="1">
            {level == "1" && <AuditReturn/>}
          </TabPane>
          <TabPane tab="全部退单" key="2">
            {level == "2" && <AllReturn/>}
          </TabPane>
        </Tabs>
      </div>
    );
  }
}

export default UserOrder;
 