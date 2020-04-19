import React, { Component } from "react";
import { Tabs } from "antd";
import AllReturn from "./AllReturn";
import AuditReturn from "./AuditReturn";
const { TabPane } = Tabs;

class UserOrder extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount=()=>{
    sessionStorage.setItem('returnTab',1)
  }
  callback = level => {
    sessionStorage.setItem('returnTab',level)
    this.setState({
      level
    })
  };
  render() {
    const  level  =  sessionStorage.getItem('returnTab')?sessionStorage.getItem('returnTab'):"1";
    return (
      <div>
        <Tabs activeKey={level} onChange={this.callback}>
          <TabPane tab="待审核" key="1">
            {level == "1" && <AuditReturn {...this.props}/>}
          </TabPane>
          <TabPane tab="全部退单" key="2">
            {level == "2" && <AllReturn {...this.props}/>}
          </TabPane>
        </Tabs>
      </div>
    );
  }
}

export default UserOrder;
 