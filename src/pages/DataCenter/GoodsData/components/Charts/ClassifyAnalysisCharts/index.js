import React, { Component } from "react";
import { Input, DatePicker } from "antd";
import { GetClassifyAnalysis } from "api/home/DataCenter/BaseData/GoodsData";
import moment from "moment";
import echarts from "echarts";
import "./index.less";
const { RangePicker } = DatePicker;
const startDate = moment().format("YYYY-MM-DD HH:mm:ss");
const endDate = moment().format("YYYY-MM-DD HH:mm:ss");
/**
 * 功能作用：商品分析---->门店售卖趋势图
 * 初始注释时间： 2020/3/15 15:01
 * 注释创建人：LorenWang（王亮）
 */
export default class ClassifyAnalysisCharts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      xdata: [],
      type: "1",
      data1: [],
      data2: [],
      data3: [],
      data4: [],
      searchFilterList: {},
    };
  }
  componentDidMount() {
    this.getDataList({
      startDate,
      endDate,
    });
  }

  /**
   * 获取数据列表
   * @param values 搜索条件
   */
  getDataList = (values) => {
    GetClassifyAnalysis(values).then((res) => {
    if (result.httpCode == 200) {
      const analysis = result.result;
      const [xdata, data1, data2, data3, data4] = [[], [], [], [], []];
      analysis.map((item) => {
        xdata.push(item.rpDateMd);
        data1.push(item.keeperSaleQty); //掌柜数量
        data2.push(item.posSaleQty); //pos数量
        data3.push(item.keeperSaleAmount); //掌柜金额
        data4.push(item.posSaleAmount); //pos金额
        return item;
      });
      this.setState({ xdata, type: "1", data1, data2, data3, data4 }, () => {
        this.writeCall();
      });
    }
    });
  };

  //时间改变
  onDateChange = (time) => {
    const startDate = moment(time[0]).format("YYYY-MM-DD");
    const endDate = moment(time[1]).format("YYYY-MM-DD");
    const params = { ...this.state.searchFilterList, startDate, endDate };
    this.setState({ searchFilterList: { ...params } });
    this.getDataList(params);
  };

  /**
   * 修改切换类型
   * @param value 切换类型
   */
  changeType = (value) => {
    this.setState(
      {
        type: value,
      },
      function () {
        this.writeCall();
      }
    );
  };
  //商品编码回车
  onPressEnter = (e) => {
    if (e.target.value.trim()) {
      const searchFilterList = {
        ...this.state.searchFilterList,
        goodsCode: e.target.value.trim(),
      };
      this.setState({ searchFilterList });
      this.getDataList(searchFilterList);
    }
  };
  /**
   * 绘制
   */
  writeCall = () => {
    const { xdata, data1, data2, data3, data4, type } = this.state;
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById("maingod"));
    // 绘制图表 
    myChart.setOption({
      title: {
        text: "商品分类售卖情况",
      },
      tooltip: {
        trigger: "axis",
      },
      legend: {
        data: [
          {
            name: "掌柜销售",
          },
          {
            name: "POS销售",
          },
        ],
        top: "43",
        left: "460",
      },
      grid: {
        left: "80",
        top: "100",
      },
      toolbox: {
        show: false,
        feature: {
          dataZoom: {
            yAxisIndex: "none",
          },
          dataView: { readOnly: false },
          magicType: { type: ["line", "bar"] },
          restore: {},
          saveAsImage: {},
        },
      },
      xAxis: {
        type: "category",
        boundaryGap: false,
        data: xdata,
      },
      yAxis: {
        type: "value",
        axisLabel: {
          formatter: "{value}",
        },
      },
      series: [
        {
          name: "掌柜销售",
          type: "line",
          data: type === "1" ? data1 : data3,
        },
        {
          name: "POS销售",
          type: "line",
          data: type === "1" ? data2 : data4,
        },
      ],
    });
  };
  render() {
    return (
      <div className="charts-container data_classify_analysis">
        <div className="good_code">
          <Input
            placeholder="请输入商品编码"
            style={{ width: "150px" }}
            onPressEnter={this.onPressEnter}
          />
        </div>
        <div className="time">
          <RangePicker
            onChange={this.onDateChange}
            defaultValue={[
              moment(moment().subtract(30, "days")),
              moment(moment()),
            ]}
            format='YYYY-MM-DD'
            allowClear={false}
          />
        </div>
        <div className="sale_btn_container">
          <div className="clearfix sale_qty">
            <div
              className={
                this.state.type === "1"
                  ? "charts-container-switch-y"
                  : "charts-container-switch-n"
              }
              onClick={() => this.changeType("1")}
            >
              销售数量
            </div>
            <div
              className={
                this.state.type === "1"
                  ? "charts-container-switch-n"
                  : "charts-container-switch-y"
              }
              onClick={() => this.changeType("2")}
            >
              销售金额
            </div>
          </div>
        </div>
        <div id="maingod" style={{ height: 400 }} />
      </div>
    );
  }
}
