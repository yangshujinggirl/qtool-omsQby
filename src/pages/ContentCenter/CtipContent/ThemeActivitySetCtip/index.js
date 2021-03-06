import React, { Component } from "react";
import ThemeActivitySet from "./ThemeActivitySet";
import ModuleSet from "./ModuleSet";
import { Tabs } from "antd";
const { TabPane } = Tabs;


class Index extends Component {
  constructor(props) {
    super(props);
    this.state={
      activeKey:'1'
    }
  }
  onChange=(activeKey)=> {
    this.setState({ activeKey })
  }
  render() {
    const { activeKey } = this.state;
    return (
      <div className="content_box stock-tabs" >
        <Tabs activeKey={activeKey} onChange={this.onChange}>
          <TabPane tab="设置主题" key="1">
            {
              activeKey=='1'&&
              <ThemeActivitySet {...this.props}/>
            }
          </TabPane>
          <TabPane tab="模块设置" key="2">
            {
              activeKey=='2'&&
              <ModuleSet {...this.props}/>
            }
          </TabPane>
        </Tabs>
      </div>
    );
  }
}

export default Index;
