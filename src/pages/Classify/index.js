import { QbyConnect } from "common";
import * as Actions from "./actions/actionsIndex";
import { CommonSort } from "./components/CommonSort";
import { Tabs } from "antd";
class Classify extends React.Component {
  render() {
    return (
      <div className="oms-common-index-pages-wrap">
        <Tabs defaultActiveKey="1" onChange={this.callback}>
          <TabPane tab="一级目录" key="1">
            <CommonSort level={1} text="一级" />
          </TabPane>
          <TabPane tab="二级目录" key="2">
            <CommonSort level={2} text="二级" />
          </TabPane>
          <TabPane tab="三级目录" key="3">
            <CommonSort level={3} text="三级" />
          </TabPane>
          <TabPane tab="四级目录" key="4">
            <CommonSort level={4} text="四级" />
          </TabPane>
        </Tabs>
      </div>
    );
  }
}

export default Classify;
