import React from 'react'
import {FilterSearchRangeTime} from "common/QdisabledDateTime";
import moment from "moment";

// 引入 ECharts 主模块
const echarts = require('echarts');
/**
 * 功能作用：分类分析页面图表
 * 初始注释时间： 2020/3/15 19:45
 * 注释创建人：LorenWang（王亮）
 * 方法介绍：
 * 思路：
 * 修改人：
 * 修改时间：
 * 备注：
 */
export default class ClassifyAnalysisCharts extends React.Component {
    state = {
        type: '1'
    };

    /**
     * 图表绘制
     */
    componentWillReceiveProps(nextProps) {
        this.writeCall(nextProps)
    };

    /**
     * 绘制图表
     */
    writeCall = (nextProps) => {
        nextProps = nextProps == null ? this.props : nextProps;
        const xdata = nextProps.dataInfo.xdata;
        const data1 = nextProps.dataInfo.data1;
        const data2 = nextProps.dataInfo.data2;
        const data3 = nextProps.dataInfo.data3;
        const data4 = nextProps.dataInfo.data4;
        const type = this.state.type;
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('mainClass'));
        // 绘制图表
        myChart.setOption({
            title: {
                text: '商品分类售卖情况'
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data: ['掌柜销售', 'POS销售'],
                top: "43",
                left: "350",
            },
            grid: {
                left: "80",
                top: '100',
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
            xAxis: [{
                type: 'category',
                axisTick: {show: false},
                data: xdata
            }],
            yAxis: {
                type: 'value',
                axisLabel: {
                    formatter: '{value}'
                }
            },
            series: [
                {
                    name: '掌柜销售',
                    type: 'bar',
                    barGap: 0,
                    data: type === '1' ? data1 : data3

                },
                {
                    name: 'POS销售',
                    type: 'bar',
                    data: type === '1' ? data2 : data4
                }
            ]
        });
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

    render() {
        return (
            <div className='charts-container'>
                <div style={{position: "absolute", left: "0px", top: "40px", zIndex: '1000'}}>
                    <FilterSearchRangeTime
                        selectTimeChange={this.props.selectTimeChange}
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
                <div id="mainClass" style={{height: 400}}/>
            </div>
        );
    }
}
