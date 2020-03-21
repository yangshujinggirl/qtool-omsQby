import React, { Component } from "react";
import { Card, Form, Spin,Button } from "antd";
import BaseEdit from "./components/Edits/BaseEdit";
import Address from "./components/Edits/Address";
import Shop from "./components/Edits/Shop";
import Cooperate from "./components/Edits/Cooperate";
import { getInfos,saveInfosApi } from "api/home/CooperateCenter/ShopManage";
const formLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 }
};

class AddPosUser extends Component {
  formRef = React.createRef();
  constructor(props) {
    super(props);
    this.state = {
      loading: false
    };
  }
  componentDidMount = () => {
    // this.getInfo();
  };
  /**
   * 获取详情
   */
  getInfo = () => {
    const { id } = this.props.match.params;
    this.setState({
      loading: true
    });
    getInfos(id)
      .then(res => {
        this.setState({
          loading: false
        });
        if (res.httpCode == 200) {
          this.setState({
            info: res.result
          });
        }
      })
      .catch(() => {
        this.setState({
          loading: false
        });
      });
  };
  goBack = () => {
    this.props.history.push("/account/channel");
  };
  /**
   * 保存
   */
  handleSubmit = async () => {
    const values = await form.validateFields();
    saveInfosApi(values).then(res => {
      if (res.httpCode == 200) {
        this.goBack();
      }
    });
  };
  render() {
    const { loading } = this.state;
    return (
      <Spin spinning={loading}>
        <div className="oms-common-addEdit-pages">
          <Form
            className="common-addEdit-form"
            ref={this.formRef}
            {...formLayout}
          >
            <Card title="基本信息">
              <BaseEdit />
            </Card>
            <Card title="地址信息">
              <Address />
            </Card>
            <Card title="店铺信息">
              <Shop />
            </Card>
            <Card title="合作经营">
              <Cooperate />
            </Card>
          </Form>
          <div className="handle-operate-save-action">
            <Button onClick={this.goBack}>返回</Button>
            <Button type="primary" onClick={this.handleSubmit}>
              保存
            </Button>
          </div>
        </div>
      </Spin>
    );
  }
}
export default AddPosUser;
