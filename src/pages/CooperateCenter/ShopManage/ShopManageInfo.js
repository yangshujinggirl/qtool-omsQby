import React, { Component } from "react";
import { Card, Form, Spin } from "antd";
import BaseEdit from "./components/Infos/BaseInfo";
import Address from "./components/Infos/AddressInfo";
import Shop from "./components/Infos/ShopInfo";
import Cooperate from "./components/Infos/CooperateInfo";
import { getInfosApi } from "api/home/CooperateCenter/ShopManage";
const formLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 }
};

class ShopManageInfos extends Component {
  formRef = React.createRef();
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      infos:{}
    };
  }
  componentDidMount = () => {
    this.getInfo();
  };
  /**
   * 获取详情
   */
  getInfo = () => {
    const { id } = this.props.match.params;
    this.setState({
      loading: true
    });
    getInfosApi({ id })
      .then(res => {
        this.setState({
          loading: false
        });
        if (res.httpCode == 200) {
          this.setState({
            infos: res.result
          });
        }
      })
      .catch(() => {
        this.setState({
          loading: false
        });
      });
  };
  render() {
    const { loading,infos} = this.state;
    return (
      <Spin spinning={loading}>
        <div className="oms-common-addEdit-pages">
          <Form
            className="common-addEdit-form"
            ref={this.formRef}
            {...formLayout}
          >
            <Card title="基本信息">
              <BaseEdit infos={infos}/>
            </Card>
            <Card title="地址信息">
              <Address infos={infos}/>
            </Card>
            <Card title="店铺信息">
              <Shop infos={infos}/>
            </Card>
            <Card title="合作经营">
              <Cooperate infos={infos}/>
            </Card>
          </Form>
        </div>
      </Spin>
    );
  }
}
export default ShopManageInfos;
