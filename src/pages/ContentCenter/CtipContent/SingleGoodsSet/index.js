import React, { Component } from "react";
import SingleGoods from "./SingleGoods";
import ModuleSet from "./ModuleSet";
import TimeSet from "./TimeSet";
import { Tabs } from "antd";
const { TabPane } = Tabs;


let pans = [{
  title:'设置时段',
  key:'1',
},{
  title:'模块设置',
  key:'2',
},{
  title:'配置商品',
  key:'3',
}]
class Index extends Component {
  constructor(props) {
    super(props);
    this.state={
      activeKey:'1',
      goodsParams:{}
    }
  }
  onChange=(activeKey)=> {
    this.setState({ activeKey, goodsParams:{} })
  }
  upDateKey=(values)=> {
    let { activeKey,...val } = values
    this.setState({ activeKey, goodsParams:val })
  }
  render() {
    const { activeKey, goodsParams } = this.state;
    return (
      <div className="content_box stock-tabs" >
        <Tabs activeKey={activeKey} onChange={this.onChange}>
          <TabPane tab="设置时段" key="1">
            {
              activeKey=='1'&&
              <TimeSet {...this.props} upDateKey={this.upDateKey}/>
            }
          </TabPane>
          <TabPane tab="模块设置" key="2">
            {
              activeKey=='2'&&
              <ModuleSet {...this.props}/>
            }
          </TabPane>
          <TabPane tab="配置商品" key="3" forceRender={true} disabled={true}>
            {
              activeKey == "3"&&
              <SingleGoods {...this.props} params={goodsParams}/>
            }
          </TabPane>
        </Tabs>
      </div>
    );
  }
}

export default Index;
