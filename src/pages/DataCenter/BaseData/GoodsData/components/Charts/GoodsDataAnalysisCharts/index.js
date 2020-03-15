import React from 'react'
import {Input} from "antd";
import {GetGoodsAnalysisChartData} from "../../../../../../../api/home/DataCenter/BaseData/GoodsData";
import moment from "moment";
import {FilterSearchRangeTime} from "common/QdisabledDateTime";
import '../index.css'
// 引入 ECharts 主模块
const echarts = require('echarts');
/**
 * 功能作用：商品数据分析图表
 * 初始注释时间： 2020/3/15 15:01
 * 注释创建人：LorenWang（王亮）
 * 方法介绍：
 * 思路：
 * 修改人：
 * 修改时间：
 * 备注：
 */
export default class GoodsDataAnalysisCharts extends React.Component {
    state = {
        xdata: [],
        type: '1',
        data1: [],
        data2: [],
        data3: [],
        data4: [],
        searchFilterList: {}
    };

    componentDidMount() {
        this.getDataList()
    }

    /**
     * 获取数据列表
     * @param values 搜索条件
     */
    getDataList(values) {
        const result = new GetGoodsAnalysisChartData();
        if (result.code === '0') {
            const analysis = result.analysis;
            const xdata = [];
            const data1 = [];
            const data2 = [];
            const data3 = [];
            const data4 = [];
            for (var i = 0; i < analysis.length; i++) {
                xdata.push(analysis[i].rpDateMd);
                data1.push(analysis[i].qbyQty); //掌柜数量
                data2.push(analysis[i].posQty); //pos数量
                data3.push(analysis[i].qbyAmount);//掌柜金额
                data4.push(analysis[i].posAmount); //pos金额
            }
            this.setState({
                xdata: xdata,
                type: '1',
                data1: data1,
                data2: data2,
                data3: data3,
                data4: data4
            }, function () {
                this.writeCall()
            })
        }
    }

    /**
     * 时间选择改变
     * @param values 改变的时间
     * @param isDefaultInitFinish 默认值初始化完成
     */
    selectTimeChange(values, isDefaultInitFinish) {
        const params = {...this.state.searchFilterList, ...values};
        //设置数据
        this.setState({searchFilterList: {...params}});
        //请求数据
        this.getDataList(params);
    };

    /**
     * 修改切换类型
     * @param value 切换类型
     */
    changeType(value) {
        this.setState({
            type: value
        }, function () {
            this.writeCall()
        });
    }

    /**
     * 键盘输入后点击
     * @param e
     */
    hindKeyUp = (e) => {
        if (e.keyCode.toString() === '13') {
            const params = {...this.state.searchFilterList, ...e.target.value};
            //设置数据
            this.setState({searchFilterList: {...params}});
            //请求数据
            this.getDataList(params);
        }
    };

    /**
     * 绘制
     */
    writeCall = () => {
        const xdata = this.state.xdata;
        const data1 = this.state.data1;
        const data2 = this.state.data2;
        const data3 = this.state.data3;
        const data4 = this.state.data4;
        const type = this.state.type;
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('maingod'));
        // 绘制图表
        myChart.setOption({
            title: {
                text: '门店销售趋势图'
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data: [{
                    name: '掌柜销售'
                }, {
                    name: 'POS销售'
                }],
                top: "43",
                left: "460"
            },
            grid: {
                left: "80",
                top: '100'
            },
            toolbox: {
                show: false,
                feature: {
                    dataZoom: {
                        yAxisIndex: 'none'
                    },
                    dataView: {readOnly: false},
                    magicType: {type: ['line', 'bar']},
                    restore: {},
                    saveAsImage: {}
                }
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: xdata
            },
            yAxis: {
                type: 'value',
                axisLabel: {
                    formatter: '{value}'
                }
            },
            series: [
                {
                    name: '掌柜销售',
                    type: 'line',
                    data: type === '1' ? data1 : data3
                },
                {
                    name: 'POS销售',
                    type: 'line',
                    data: type === '1' ? data2 : data4
                }
            ]
        });
    };

    render() {
        return (
            <div className='charts-container'>
                <div style={{position: "absolute", left: '300px', top: '40px', zIndex: '1000'}}>
                    <Input placeholder="请输入商品编码" style={{width: "150px"}}
                           onKeyUp={this.hindKeyUp.bind(this)}/></div>
                <div style={{position: "absolute", left: "0px", top: "40px", zIndex: '1000'}}>
                    <FilterSearchRangeTime
                        selectTimeChange={this.selectTimeChange.bind(this)}
                        defaultValue={[moment(moment().subtract(30, 'days')), moment(moment())]}
                        startTimeName="startRpDate" endTimeName="endRpDate"
                        label="" allowClear={false}/>
                </div>
                <div style={{position: "absolute", right: "50px", top: "40px", zIndex: '1000'}}>
                    <div style={{width: "150px", border: "1px solid #e8e8e8"}} className='clearfix'>
                        <div
                            className={this.state.type === '1' ? 'charts-container-switch-y' : 'charts-container-switch-n'}
                            onClick={this.changeType.bind(this, '1')}>销售数量
                        </div>
                        <div
                            className={this.state.type === '1' ? 'charts-container-switch-n' : 'charts-container-switch-y'}
                            onClick={this.changeType.bind(this, '2')}>销售金额
                        </div>
                    </div>
                </div>
                <div id="maingod" style={{height: 400}}/>
            </div>
        );
    }
}
