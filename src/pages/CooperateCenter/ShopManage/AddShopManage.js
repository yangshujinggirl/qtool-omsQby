import React, { Component } from "react";
import { Card, Form, Spin, Button, Modal, message } from "antd";
import BaseEdit from "./components/Edits/BaseEdit";
import Address from "./components/Edits/Address";
import Shop from "./components/Edits/Shop";
import Cooperate from "./components/Edits/Cooperate";
import moment from "moment";
import {
  getInfosApi,
  saveInfosApi,
  resetPwdApi,
} from "api/home/CooperateCenter/ShopManage";
import {QbaseDetail} from "common/index";
const formLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};

class AddShopManage extends Component {
  formRef = React.createRef();
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      channelPic: [],
      contractPic: [],
    };
  }
  componentDidMount = () => {
    this.getInfo();
  };
  //获取详情
  getInfo = () => {
    const { id } = this.props.match.params;
    this.setState({loading: true});
    getInfosApi({ id })
      .then((res) => {
        if (res.httpCode === 200) {
          this.formatInfos(res);
        }
      })
      .finally(() => {
        this.setState({loading: false,});
      });
  };
  //格式化详情数据
  formatInfos = (res) => {
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
    infos.businessHoursE = businessHoursE
      ? moment(businessHoursE, "HH:mm")
      : null;
    infos.businessHoursS = businessHoursS
      ? moment(businessHoursS, "HH:mm")
      : null;
    infos.channelPic = channelPic
      ? [
          {
            uid: "1",
            name: "image.png",
            status: "done",
            url: sessionStorage.getItem("oms_fileDomain") + channelPic,
            img: channelPic,
          },
        ]
      : [];
    infos.contractPic = contractPic
      ? [
          {
            uid: "2",
            name: "images.png",
            status: "done",
            url: sessionStorage.getItem("oms_fileDomain") + contractPic,
            img: contractPic,
          },
        ]
      : [];
    infos.areacode = [province, city, area];
    infos.shAreacode = [shProvince, shCity, shArea];
    this.formRef.current.setFieldsValue({ ...infos });
    this.setState({
      channelPic: channelPic || [],
      contractPic: contractPic || [],
      businessHoursE,
      businessHoursS,
      channelCode: infos.channelCode,
    });
  };
  //返回
  goBack = () => {
    this.props.history.push("/account/channel");
  };
  //保存
  handleSubmit = async () => {
     this.formRef.current.scrollToField(err=>{
      consle.log(err)
    });
    const values = await this.formRef.current.validateFields();
    const _values = this.formatValue(values);
    this.setState({loading: true});
    saveInfosApi(_values)
      .then((res) => {
        if (res.httpCode === 200) {
          if (!_values.id) {
            this.resetModal(res, _values.id);
          }else{
            message.success('门店修改成功',.8)
            this.goBack()
          }
        }
      })
      .finally(() => {
        this.setState({loading: false,});
      });
  };
  //保存格式化
  formatValue = (values) => {
    const { channelPic, contractPic } = this.state;
    const { openingTime, businessHoursS, businessHoursE, ..._values } = values;
    if (channelPic.length) {
      _values.channelPic = channelPic[0].response
        ? channelPic[0].response.result
        : channelPic[0].img;
    }else{
      _values.channelPic=''
    }
    if (contractPic.length) {
      _values.contractPic = contractPic[0].response
        ? contractPic[0].response.result
        : contractPic[0].img;
    }else{
      _values.contractPic = ''
    }
    if (openingTime) {
      _values.openingTime = moment(openingTime).format("YYYY-MM-DD");
    }
    if (businessHoursS) {
      _values.businessHoursS = moment(businessHoursS).format("HH:mm");
    }
    if (businessHoursE) {
      _values.businessHoursE = moment(businessHoursE).format("HH:mm");
    }
    const { id } = this.props.match.params;
    if (id) {
      _values.id = id;
    }
    return _values;
  };
  //合同信息图片修改
  upDateContractList = (fileList) => {
    this.setState({
      contractPic: fileList,
    });
  };
  //门店图片
  upDateChannelPicList = (fileList) => {
    this.setState({
      channelPic: fileList,
    });
  };
  //密码modal
  resetModal = (res, id) => {
    const { channelName, personMobile, userPwd } = res.result;
    const text = id ? "重置" : "新建";
    Modal.success({
      title: `Qtools门店账户密码${text}成功`,
      content: (
        <div>
          <p>门店:{channelName}</p>
          <p>账号:{personMobile}</p>
          <p>密码:{userPwd}</p>
        </div>
      ),
      onOk: () => {
        this.goBack();
      },
    });
  };
  //重置密码
  resetPwd = () => {
    this.setState({loading:true})
    const { id } = this.props.match.params;
    const { channelCode } = this.state;
    resetPwdApi({ channelCode }).then((res) => {
      if (res.httpCode === 200) {
        this.resetModal(res, id);
      }
    }).finally(()=>{
      this.setState({loading:false})
    })

  };
  render() {
    const { loading, contractPic, channelPic } = this.state;
    const {id} = this.props.match.params;
    return<QbaseDetail showLoading={loading} childComponent={<div className="oms-common-addEdit-pages">
          <Form
            className="common-addEdit-form"
            ref={this.formRef}
            {...formLayout}
          >
            <Card title="基本信息">
              <BaseEdit
                {...{channelPic,id}}
                upDateChannelPicList={this.upDateChannelPicList}
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
                id={id}
                contractPic={contractPic}
                upDateContractList={this.upDateContractList}
              />
            </Card>
          </Form>
          <div className="handle-operate-save-action">
            <Button onClick={this.goBack}>返回</Button>
            {this.props.match.params.id && (
              <Button type="primary" onClick={this.resetPwd}>
                重置密码
              </Button>
            )}
            <Button type="primary" onClick={this.handleSubmit}>
              保存
            </Button>
          </div>
        </div>}/>
  }
}
export default AddShopManage;
