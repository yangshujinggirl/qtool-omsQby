import React, { Component } from "react";
import { Upload, Button, message, Modal } from "antd";
import { Qbtn } from 'common';
import "./index.less";

class index extends Component {
  downLoadTemp = () => {
    const { promotionType } = this.props;
    switch (promotionType) {
      case 10:
        window.open("../../../../../../static/market/c_down.xlsx");
        break;
      case 11:
        window.open("../../../../../../static/market/c_single_give.xlsx");
        break;
      case 20:
        window.open("../../../../../../static/market/c_yuan_zeng.xlsx");
        break;
      case 21:
        window.open("../../../../../../static/market/c_jian_zeng.xlsx");
        break;
      case 22:
        window.open("../../../../../../static/market/c_yuan_low.xlsx");
        break;
      case 23:
        window.open("../../../../../../static/market/c_jian_low.xlsx");
        break;
    }
  };
  handleChange = info => {
    let file = info.file;
    const { response } = file;
    if (file.status == "done") {
      if (response) {
        if (response.httpCode == "200") {
          let {
            promotionProducts,successSize,
            noPro,formatWrong,priceGapWrong,
            productKindWrong,huchiWrong,
            enableEnjoyActivityWrong,purChaseWrong,
            paramWrong,requiredWrong,repeatWrong
          } = response.result;
          Modal.success({
            title: "",
            content: (
              <div>
                <p className='import_error'>共成功导入商品  {successSize}  条</p>
                {noPro.length>0 && (
                  <p  className='import_error'>
                    {noPro.map(
                      (item, index) =>`${item}${index == noPro.length - 1 ? "" : "/ "}`
                    )} 商品不存在
                  </p>
                )}
                {formatWrong.length>0 && (
                  <p className='import_error'>
                    {formatWrong.map(
                      (item, index) =>`${item}${index == formatWrong.length - 1 ? "" : "/ "}`
                    )} 商品填写格式错误或商品C端售价为空
                  </p>
                )}
                {priceGapWrong.length>0 && (
                  <p className='import_error'>
                    {priceGapWrong.map(
                      (item, index) =>`${item}${index == priceGapWrong.length - 1 ? "" : "/ "}`
                    )} 商品填写格式错误
                  </p>
                )}
                {productKindWrong.length>0 && (
                  <p className='import_error'>
                    {productKindWrong.map(
                      (item, index) =>`${item}${index == productKindWrong.length - 1 ? "" : "/ "}`
                    )} 商品不符合活动商品范围
                  </p>
                )}
                 {huchiWrong.length>0 && (
                  <p className='import_error'>
                    {huchiWrong.map(
                      (item, index) =>`${item}${index == huchiWrong.length - 1 ? "" : "/ "}`
                    )}
                    商品已参加其他和此活动互斥的活动
                  </p>
                )}
                {purChaseWrong.length>0 && (
                  <p className='import_error'>
                    {purChaseWrong.map(
                      (item, index) =>`${item}${index == purChaseWrong.length - 1 ? "" : "/ "}`
                    )} 商品限购数量的大小关系不对
                  </p>
                )}
                {enableEnjoyActivityWrong.length>0 && (
                  <p className='import_error'>
                    {enableEnjoyActivityWrong.map(
                      (item, index) =>`${item}${index == enableEnjoyActivityWrong.length - 1 ? "" : "/ "}`
                    )} 商品为保税商品，不能参与单品满件赠活动
                  </p>
                )}
                {paramWrong.length>0 && (
                  <p className='import_error'>
                    {paramWrong.map(
                      (item, index) =>`${item}${index == paramWrong.length - 1 ? "" : "/ "}`
                    )} 商品填写格式错误
                  </p>
                )}
                {requiredWrong.length>0 && (
                  <p className='import_error'>
                    {requiredWrong.map(
                      (item, index) =>`${item}${index == requiredWrong.length - 1 ? "" : "/ "}`
                    )} 必填项未填写完整
                  </p>
                )}
                {repeatWrong.length>0 && (
                  <p className='import_error'>
                    {repeatWrong.map(
                      (item, index) =>`${item}${index == repeatWrong.length - 1 ? "" : "/ "}`
                    )} 商品重复
                  </p>
                )}
              </div>
            ),
            footer: null
          });
          promotionProducts = promotionProducts?promotionProducts:[];
          promotionProducts.map((el,index)=>el.key=index);
          this.props.upDateList(promotionProducts)
        } else {
          message.error(file.response.message, 0.8);
        }
        return file.response.status === "success";
      }
    }
  };
  beforeUpload = () => {};
  render() {
    const { promotionType, beginTime, endTime, pdKind } = this.props.currentdata;
    const { promotionId } = this.props;
    const params = JSON.stringify({
      type: promotionType,
      beginTime,
      endTime,
      pdKind,
      promotionId
    });
    const props = {
      action:`/qtoolsApp/promotions/product/import`,
      onChange: this.handleChange,
      beforeUpload: this.beforeUpload,
      name: "mfile",
      data: { data: params },
      showUploadList: false
    };
    return (
      <div className="c_act_import">
        <div>
          <Upload {...props}>
            <Qbtn>导入商品</Qbtn>
          </Upload>
          <a className="act_down" onClick={this.downLoadTemp}>
            下载导入模板
          </a>
        </div>
        <div className="tips">
          注：导入为覆盖导入，即第二次导入的商品将覆盖前一次导入的所有商品
        </div>
      </div>
    );
  }
}
export default index;