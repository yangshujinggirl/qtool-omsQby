import { Form, Input, Checkbox, Radio, DatePicker } from "antd";
import React, { useState, useEffect, Component } from "react";
import { Qbtn } from "common";
import { purposeTypesOption, levelOption } from "./optionMap";
import { RangeTime } from "common/QdisabledDateTime";
import {
  getSuppliApi,
  getBaseInfoApi
} from "api/home/MarketCenter/PromotionAct/PosAct";
import  columnsCreat  from "./columns";
import "./index.less";
const formLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 }
};

class AddAct extends Component {
  formRef = React.createRef();
  constructor(props) {
    super(props);
    this.state = {
      activityCouponStatus: "",
      otherIndex: "",
      providerIndex: "",
      tagsCouponList: [],
      supplierList: [],
      tagsList: [],
      tagsCouponList: [],
      notUseCoupons: [],
    };
  }

  componentDidMount = () => {
    const { id } = props.match.params;
    if (id) {
      this.getInfo(id);
    }
  };
   //分成校验
   validatorRatio = (rule, value, callback) => {
    let { activityInfo, ratioList } = this.props;
    let { bearers } = this.props.form.getFieldsValue(["bearers"]);
    let total = 0;
    bearers.forEach(el => {
      if (!el.proportion) {
        el.proportion = 0;
      }
      total += Number(el.proportion);
    });
    if (total > 100) {
      callback("承担比例总和不能超过100%");
    } else {
      callback();
    }
  };
  //分成change
  changeProportion = (rule, value, callback) => {
    this.props.form.resetFields(["bearers"]);
  };
  handleSearch = value => {
    getSuppliApi({ name: value }).then(res => {
      const { suppliers } = res;
      if (res.code == "0") {
        this.setState({ supplierList: suppliers });
      }
    });
  };
  onSelect = (value, option) => {
    let { ratioList } = this.props;
    let keyValue = `C${value}`;
    let idx = ratioList.findIndex(el => el.key == keyValue);
    if (idx == "-1") {
      ratioList.push({
        key: keyValue,
        bearerType: "C",
        bearerStr: option.props.children,
        bearer: value
      });
      this.props.dispatch({
        type: "ctipActivityAddOne/getRatioList",
        payload: ratioList
      });
    }
  };
  handleClose = removedTag => {
    let { ratioList } = this.props;
    const { bearers } = this.props.form.getFieldsValue(["bearers"]);
    let tags = ratioList.filter(tag => tag.key !== removedTag.key);
    this.props.dispatch({
      type: "ctipActivityAddOne/getRatioList",
      payload: tags
    });
    this.props.form.resetFields(["bearers"]);
  };

  changeRange = value => {
    this.props.form.resetFields(["logoBg"]);
  };
  changePromotion = e => {
    this.props.form.resetFields([
      "pdScope",
      "pdKind",
      "bannerSubtitle",
      "bannerTitle"
    ]);
  };
  changeTime = e => {
    this.props.form.resetFields(["warmUpBeginTime"]);
  };
  changePromotionScope = e => {
    this.props.form.resetFields(["promotionScope"]);
  };
  changeBearActi = value => {
    let { ratioList } = this.props;
    let newArr = [];
    let tagsList = ratioList.filter(el => el.bearerType == "C");
    let fixedList = ratioList.filter(el => el.bearerType != "C");
    let valMap = {};
    fixedList.map(el => {
      if (!valMap[el.bearerType]) {
        valMap[el.bearerType] = el;
      }
    });
    let isIdx = value.findIndex(el => el == "C");
    if (isIdx == "-1") {
      tagsList = [];
    }
    value &&
      value.map((el, index) => {
        if (el != "C") {
          if (valMap[el]) {
            newArr.push(valMap[el]);
          } else {
            let item = {};
            item.bearer = el;
            item.bearerType = el;
            item.bearerStr = bearMap[el];
            item.key = `${el}${index}`;
            newArr.push(item);
          }
        }
      });
    ratioList = [...newArr, ...tagsList];
    this.props.dispatch({
      type: "ctipActivityAddOne/getRatioList",
      payload: ratioList
    });
    this.props.form.resetFields(["bearers"]);
  };
  formatOption = () => {
    const { activityInfo } = this.props;
    let option;
    if (activityInfo.promotionScope == 1) {
      if (activityInfo.promotionType == "11") {
        option = prefShareOption;
      } else {
        option = prefectureOption;
      }
    } else {
      if (
        activityInfo.promotionType == "20" ||
        activityInfo.promotionType == "21"
      ) {
        option = singleShareOption;
      } else {
        option = singleOption;
      }
    }
    return option;
  };
  //搜索不可用优惠券
  handleCouponSearch = e => {
    if (e.target.value) {
      const value = e.target.value.trim();
      const { tagsCouponList } = this.props;
      let isRepeat = -1;
      if (tagsCouponList.length > 0) {
        //如果列表中有--->拒绝重复请求
        isRepeat = tagsCouponList.findIndex(item => item.couponCode == value);
      }
      if (isRepeat == -1) {
        getValidCoupon({ couponCode: value }).then(res => {
          if (res.code == "0") {
            isRepeat = -1;
            const notUseCoupons = res.activityNotUseCoupons;
            const arr = [...tagsCouponList];
            arr.push(notUseCoupons);
            this.props.dispatch({
              type: "ctipActivityAddOne/getTagCouponList",
              payload: { tagsCouponList: arr }
            });
          }
        });
      }
    }
  };
  //不可用优惠券发生变化
  notUseChange = e => {
    this.setState({
      activityCouponStatus: e.target.value
    });
    if (e.target.value == 2) {
      this.props.dispatch({
        type: "ctipActivityAddOne/getTagCouponList",
        payload: { tagsCouponList:[] }
      });
    };
  };
  //关闭
  handleCloseCoupon = removedTag => {
    const tagsCouponList = this.props.tagsCouponList.filter(
      item => item.couponId !== removedTag.couponId
    );
    this.props.dispatch({
      type: "ctipActivityAddOne/getTagCouponList",
      payload: { tagsCouponList }
    });
  };
  render() {
    const {
      activityInfo,
      ratioList,
      tagsList,
      promotionId,
      tagsCouponList,
      supplierList, 
      activityCouponStatus
    } = this.state;
    let blColumns = columnsCreat(
      this.props.form,
      this.validatorRatio,
      this.changeProportion,
      ratioList
    );
    let otherIndex =
      activityInfo.purposeTypes &&
      activityInfo.purposeTypes.findIndex(el => el == "5");
    let providerIndex =
      activityInfo.costApportion &&
      activityInfo.costApportion.findIndex(el => el == "C");
    // let linkAgeOption = this.formatOption();
    let isJoinZq = activityInfo.platform && activityInfo.platform.includes("2");
    let rangeOption =
      activityInfo.promotionScope == 1
        ? isJoinZq
          ? singleShareOption
          : singleOption
        : prefectureOption;
    let isEdit = promotionId ? true : false;
    const isEdit = Boolean(props.match.params.id);
    const {} = this.state;
    return (
      <div className="oms-common-addEdit-pages add_bAct">
        <Form
          ref={this.formRef}
          className="common-addEdit-form"
          onValuesChange={onValuesChange}
          {...formLayout}
        >
          <Form.Item
            label="活动名称"
            name="name"
            rules={[{ required: true, message: "请输入活动名称" }]}
          >
            <Input
              disabled={isEdit}
              placeholder="请输入活动名称"
              maxLength="30"
              autoComplete="off"
            />
          </Form.Item>
          <Form.Item label="活动时间" className="item_required">
            <Form.Item
              noStyle
              name="time"
              rules={[{ required: true, message: "请选择活动时间" }]}
            >
              <RangeTime />
            </Form.Item>
            <span className="suffix_tips">
              活动时间一旦选定将无法更改，请谨慎填写
            </span>
          </Form.Item>
          <Form.Item
            label="活动目的"
            name="purposeTypes"
            rules={[{ required: true, message: "请选择活动目的" }]}
          >
            <Checkbox.Group>
              {purposeTypesOption.map(el => (
                <Checkbox value={el.key} key={el.key}>
                  {el.value}
                </Checkbox>
              ))}
            </Checkbox.Group>
          </Form.Item>
          {otherIndex && (
            <Form.Item
              label="其他"
              name="otherPurpose"
              rules={[{ required: true, message: "请输入其他目的" }]}
            >
              <Input.TextArea
                placeholder="请输入其他目的"
                rows={2}
                maxLength="100"
                autoComplete="off"
              />
            </Form.Item>
          )}
          <Form.Item label="活动级别" className="item_required">
            <Form.Item
              noStyle
              name="level"
              rules={[{ required: true, message: "请选择活动级别" }]}
            >
              <Radio.Group>
                {levelOption.map(el => (
                  <Radio value={el.key} key={el.key}>
                    {el.value}
                  </Radio>
                ))}
              </Radio.Group>
            </Form.Item>
            <p className="tips-info">
              S、A级活动：总费用&#62;&#61;5万元且折扣率&#62;5&#37;，B、C级活动：总费用小于等于5万元且折扣率&#60;5&#37;
            </p>
          </Form.Item>
          <Form.Item label="活动端">
            <Form.Item
              noStyle
              name="platform"
              rules={[{ required: true, message: "请选择活动端" }]}
            >
              <Checkbox.Group style={{ width: "100%" }} disabled={isEdit}>
                <Checkbox value="1">线上App/小程序</Checkbox>
                <Checkbox value="2">门店POS</Checkbox>
              </Checkbox.Group> 
              <p className="tips-info">
                注：门店POS目前仅支持单品直降，如勾选此项则无法选择其他促销类型。
              </p>
            </Form.Item>
          </Form.Item>
          <Form.Item label="活动门店">全部门店</Form.Item>
          <Form.Item
            label="活动成本承担方"
            name="costApportion"
            rules={[{ required: true, message: "请选择活动成本承担方" }]}
          >
            <Checkbox.Group onChange={this.changeBearActi}>
              <Checkbox value="A">Qtools</Checkbox>
              <Checkbox value="B">门店</Checkbox>
              <Checkbox value="C">供应商</Checkbox>
            </Checkbox.Group>
          </Form.Item>
          {providerIndex && (
            <FormItem className="autoComplete-formItem">
              {getFieldDecorator("autoComplete")(
                <AutoComplete
                  dataSource={supplierList}
                  onSelect={this.onSelect}
                  onSearch={this.handleSearch}
                >
                  {supplierList.map(el => (
                    <AutoComplete.Option key={el.pdSupplierId}>
                      {el.name}
                    </AutoComplete.Option>
                  ))}
                </AutoComplete>
              )}
            </FormItem>
          )}
          <div className="supplier-tags-wrap">
            {tagsList.map(el => (
              <Tag closable key={el.key} onClose={() => this.handleClose(el)}>
                {el.bearerStr}
              </Tag>
            ))}
          </div>
          <Form.Item label="促销类型">单品直降</Form.Item>
          <Form.Item label="请选择不可使用的优惠券" name="activityCouponStatus">
            <Radio.Group onChange={this.notUseChange}>
              <Radio value={3}>全部优惠券不可用</Radio>
              <Radio value={1}>全部优惠券均可用</Radio>
              <Radio value={2}>部分优惠券不可用</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="请选择不可使用的优惠券">
            <Input
              placeholder="请输入优惠券批次号"
              onBlur={this.handleCouponSearch}
              onPressEnter={this.handleCouponSearch}
            />
            <div>
              {tagsCouponList.length > 0 &&
                tagsCouponList.map(el => (
                  <Tag
                    closable
                    key={el.couponId}
                    onClose={() => this.handleCloseCoupon(el)}
                  >
                    {el.couponCode}
                  </Tag>
                ))}
            </div>
          </Form.Item>
        </Form>
        <div className="handle-operate-save-action">
          <Qbtn onClick={this.handleSubmit}>保存并继续</Qbtn>
        </div>
      </div>
    );
  }
}
export default AddAct;
