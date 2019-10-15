import { Tabs } from "antd";
import CommonSort from "./components/CommonSort";
const { TabPane } = Tabs;

class Classify extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activityKey: 1
    };
  }
  callback = key => {
    this.setState({
      activityKey: key
    });
  };
  render() {
    const { activityKey } = this.state;
    return (
      <div className="oms-common-index-pages-wrap">
        <Tabs defaultActiveKey={activityKey} onChange={this.callback}>
          <TabPane tab="一级目录" key="1">
            {activityKey == 1 && <CommonSort level={1} text="一级" />}
          </TabPane>
          <TabPane tab="二级目录" key="2">
            {activityKey == 2 && <CommonSort level={2} text="二级" />}
          </TabPane>
          <TabPane tab="三级目录" key="3">
            {activityKey == 3 && <CommonSort level={3} text="三级" />}
          </TabPane>
          <TabPane tab="四级目录" key="4">
            {activityKey == 4 && <CommonSort level={4} text="四级" />}
          </TabPane>
        </Tabs>
      </div>
    );
  }
}

export default Classify;
