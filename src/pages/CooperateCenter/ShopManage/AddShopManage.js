import React, { Component } from "react";
import { Card, Form, Spin, Button } from "antd";
import BaseEdit from "./components/Edits/BaseEdit";
import Address from "./components/Edits/Address";
import Shop from "./components/Edits/Shop";
import Cooperate from "./components/Edits/Cooperate";
import moment from "moment";
import { getInfosApi, saveInfosApi } from "api/home/CooperateCenter/ShopManage";
const formLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 }
};

class AddShopManage extends Component {
  formRef = React.createRef();
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      channelPic: [],
      contractPic: []
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
          let {
            openingTime,
            businessHoursS,
            businessHoursE,
            channelPic,
            contractPic,
            province,
            city,
            area,
            shProvince,
            shCity,
            shArea,
            ...infos
          } = res.result;
          infos.openingTime = openingTime ? moment(openingTime) : null;
          infos.businessHoursE = businessHoursE ? moment(businessHoursE,'HH:mm') : null;
          infos.businessHoursS = businessHoursS ? moment(businessHoursS,'HH:mm') : null;
          console.log(infos)
          infos.channelPic = channelPic
            ? [
                {
                  uid: "1",
                  name: "image.png",
                  status: "done",
                  url: sessionStorage.getItem("oms_fileDomain") + channelPic,
                  img: channelPic
                }
              ]
            : [];
          infos.contractPic = contractPic
            ? [
                {
                  uid: "2",
                  name: "images.png",
                  status: "done",
                  url: sessionStorage.getItem("oms_fileDomain") + contractPic,
                  img: contractPic
                }
              ]
            : [];
          infos.areacode = [province, city, area];
          infos.shAreacode = [shProvince, shCity, shArea];
          this.formRef.current.setFieldsValue({ ...infos });
          this.setState({
            channelPic: channelPic || [],
            contractPic: contractPic || [],
            businessHoursE,
            businessHoursS
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
    const values = await this.formRef.current.validateFields();
    const _values = this.formatValue(values);
    saveInfosApi(_values).then(res => {
      if (res.httpCode == 200) {
        this.goBack();
      }
    });
  };
  formatValue = values => {
    const { channelPic, contractPic } = this.state;
    const { openingTime, businessHoursS, businessHoursE, ..._values } = values;
    if (channelPic.length) {
      _values.channelPic = channelPic[0].response
        ? channelPic[0].response.result
        : channelPic[0].img;
    }
    if (contractPic.length) {
      _values.contractPic = contractPic[0].response
        ? contractPic[0].response.result
        : contractPic[0].img;
    }
    if (openingTime) {
      _values.openingTime = moment(openingTime).format("YYYY-MM-DD HH:mm:ss");
    }
    if (businessHoursS) {
      _values.businessHoursS = moment(businessHoursS).format("HH:mm");
    }
    if (businessHoursE) {
      _values.businessHoursE = moment(businessHoursE).format("HH:mm");
    }
    const { id } = this.props.match.params;
    if(id){
      _values.id = id
    }
    return _values;
  };
  //合同信息图片修改
  upDateContractList = fileList => {
    this.setState({
      contractPic: fileList
    });
  };
  upDateChannelPicList = fileList => {
    this.setState({
      channelPic: fileList
    });
  };
  render() {
    const { loading, contractPic, channelPic } = this.state;
    return (
      <Spin spinning={loading}>
        <div className="oms-common-addEdit-pages">
          <Form
            className="common-addEdit-form"
            ref={this.formRef}
            {...formLayout}
          >
            <Card title="基本信息">
              <BaseEdit
                upDateChannelPicList={this.upDateChannelPicList}
                channelPic={channelPic}
              />
            </Card>
            <Card title="地址信息">
              <Address />
            </Card>
            <Card title="店铺信息">
              <Shop />
            </Card>
            <Card title="合作经营">
              <Cooperate
                contractPic={contractPic}
                upDateContractList={this.upDateContractList}
              />
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
export default AddShopManage;