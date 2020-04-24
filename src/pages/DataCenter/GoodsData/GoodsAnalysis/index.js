import React from "react";
import { Modal } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { GetGoodsAnalysis } from "api/home/DataCenter/BaseData/GoodsData";
import CommonUtils from "utils/CommonUtils";
import { QcardList, Qcards } from "common/index";
import GoodsDataAnalysisCharts from "./components/GoodsDataAnalysisCharts";
import TopTitleDesHeader from "../../components/TopTitleDesHeader";
import moment from 'moment'

/**
 * 功能作用：商品分析
 * 初始注释时间： 2020/3/14 21:56
 * 注释创建人：LorenWang（王亮）
 */
export default class GoodsAnalysis extends React.Component {
  state = {
    updateTime: "",
    data: [],
    listData: [],
  };

  //头部数据请求
  componentDidMount() {
    GetGoodsAnalysis().then((res) => {
      if (res.httpCode == 200) {
        const analysis = res.result;
        const updateTime = moment().format('YYYY-MM-DD HH:mm:ss');
        analysis.qbyAmountRate = CommonUtils.dataDifferenceValueComparison(
          analysis.keeperSaleAmount,
          analysis.upKeeperSaleAmount
        ); //掌柜销售金额
        analysis.qbyQtyRate = CommonUtils.dataDifferenceValueComparison(
          analysis.keeperSaleQty,
          analysis.upKeeperSaleQty
        ); //掌柜销售数量
        analysis.posAmountRate = CommonUtils.dataDifferenceValueComparison(
          analysis.posSaleAmount,
          analysis.upPosSaleAmount
        ); //pos销售金额
        analysis.posQtyRate = CommonUtils.dataDifferenceValueComparison(
          analysis.posSaleQty,
          analysis.upPosSaleQty
        ); //pos销售数量
        const data = [
          {
            title: "掌柜销售金额",
            value: analysis.qbyAmount,
            rate: Math.abs(analysis.qbyAmountRate),
            text: "同比上周",
            type: analysis.qbyAmountRate < 0 ? "0" : "1",
          },
          {
            title: "掌柜销售数量",
            value: analysis.qbyQty,
            rate: Math.abs(analysis.qbyQtyRate),
            text: "同比上周",
            type: analysis.qbyQtyRate < 0 ? "0" : "1",
          },
          {
            title: "POS销售金额",
            value: analysis.posAmount,
            rate: Math.abs(analysis.posAmountRate),
            text: "同比上周",
            type: analysis.posAmountRate < 0 ? "0" : "1",
          },
          {
            title: "POS销售数量",
            value: analysis.posQty,
            rate: Math.abs(analysis.posQtyRate),
            text: "同比上周",
            type: analysis.posQtyRate < 0 ? "0" : "1",
          },
        ];
        const listData = [
          {
            title: "POS热销商品",
            value: analysis.posHotSell,
            type: "1",
            bg: "#949494",
            linkToPage: "/account/hot_cold_good/?id=1&sellType=1",
          },
          {
            title: "掌柜热销商品",
            value: analysis.keeperHotSell,
            type: "2",
            bg: "#ABDB7D",
            linkToPage: "/account/hot_cold_good/?id=1&sellType=2",
          },
          {
            title: "建议采购商品",
            value: analysis.proposalQty,
            type: "3",
            bg: "#71A6F1",
            linkToPage: "/account/hot_cold_good/?id=2&sellType=1",
          },
          {
            title: "掌柜滞销商品",
            value: analysis.unsalableQty,
            type: "4",
            bg: "#BC2739",
            linkToPage: "/account/hot_cold_good/?id=2&sellType=2",
          },
        ];
        this.setState({
          updateTime,
          data,
          listData,
        });
      }
    });
  }

  /**
   * 数据定义说明
   */
  desInfo = () => {
    Modal.info({
      title: "字段解释",
      content: (
        <div className="lists">
          <p>【掌柜销售金额】：掌柜产生的所有订单总金额 （去除取消订单）</p>
          <p>【掌柜销售数量】：掌柜销售出的商品的总数量（去掉取消订单）</p>
          <p>【POS销售金额】：POS产生的所有门店销售总金额（去除退货）</p>
          <p>【POS销售数量】：POS产生的所有门店销售数量（去除退货）</p>
          <p>
            【同比上周】：
            同比上周=（今日数据-上周今日整日数据）/上周今日整日数据
          </p>
          <p>【门店热销商品】：在POS上历史7天销售数量大于等于100的商品</p>
          <p>【掌柜热销商品】：在掌柜中历史7天销售数量大于等于100的商品</p>
          <p>
            【建议采购商品】：明星商品，建议采购的商品。可售库存/掌柜历史10天的销售量小于等于30%
          </p>
          <p>
            【滞销商品】：销售较差，不受欢迎的商品。掌柜历史10天的销售量/可售库存小于等于20%
          </p>
        </div>
      ),
      onOk() {},
    });
  };
  render() {
    return (
      <div>
        <TopTitleDesHeader
          updateTime={this.state.updateTime}
          desInfoClick={this.desInfo.bind(this)}
        />
        <Qcards data={this.state.data} />
        <QcardList data={this.state.listData} />
        <div
          style={{
            border: "1px solid #e8e8e8",
            padding: "20px",
            marginTop: "30px",
          }}
        >
          <GoodsDataAnalysisCharts/>
        </div>
      </div>
    );
  }
}
