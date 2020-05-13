import {Component} from 'react';
import {Button} from 'antd'
import {Qcharts, Qtable} from 'common';
import Columns from './column';
import {DataExportApi, DataExportApiColumn} from 'api/Export';
import {GetClassifyAnalysis} from 'api/home/DataCenter/BaseData/GoodsData';

//分类分析柱状图
class ClassifyAnalysisCharts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            xdata: [],
            data1: [],
            data2: [],
            data3: [],
            data4: [],
            type: 1,
            searchFilterList: {},
            dataSource: [],
        };
    }

    //请求数据
    getDataList = (values) => {
        const params = {...this.state.searchFilterList, ...values};
        GetClassifyAnalysis(params).then((res) => {
            if (res.httpCode == 200) {
                const analysisData = res.result.result;
                this.formatValue(analysisData, params);
            }
        });
    };
    //数据格式化
    formatValue = (analysisData, params) => {
        const [xdata, data1, data2, data3, data4] = [[], [], [], [], []];
        if (analysisData && analysisData.length) {
            analysisData.map((item, index) => {
                item.key = index;
                xdata.push(item.categoryName);
                data1.push(item.keeperSaleQty); //掌柜数量
                data2.push(item.posSaleQty); //pos数量
                data3.push(item.keeperSaleAmount); //掌柜金额
                data4.push(item.posSaleAmount); //pos金额
                return item;
            });
            this.setState(
                {
                    xdata,
                    type: '1',
                    data1,
                    data2,
                    data3,
                    data4,
                    dataSource: analysisData,
                    searchFilterList: params
                },
                () => {
                    this.refs['Qcharts'].writeCall();
                }
            );
        }
    };
    //类型切换
    changeType = (value) => {
        this.setState({type: value}, function () {
                this.refs['Qcharts'].writeCall();
            }
        );
    };
    //导出数据
    exportData = () => {
        DataExportApiColumn(this.state.searchFilterList, '/goods/classifyAnalysisExport', Columns, "商品数据-分类分析")
    };
    //需要传递给子组件的数据
    formatToChildValue = () => {
        const {xdata, type, data1, data2, data3, data4} = this.state;
        const title = '商品分类售卖情况';
        const legend = {
            data: [{name: '掌柜销售'}, {name: 'POS销售'}],
            top: '43',
            left: '460',
        };
        const series = [
            {
                name: '掌柜销售',
                type: 'bar',
                data: type === '1' ? data1 : data3,
            },
            {
                name: 'POS销售',
                type: 'bar',
                data: type === '1' ? data2 : data4,
            },
        ];
        const btnText = ['销售数量', '销售金额'];
        return {title, xdata, legend, series, btnText, type};
    };

    render() {
        const propsParams = this.formatToChildValue();
        const {dataSource} = this.state;
        return (
            <div>
                <Qcharts {...propsParams} getDataList={this.getDataList}
                         changeType={this.changeType} ref="Qcharts"/>
                <Button
                    type="primary"
                    size="large"
                    style={{marginTop: '20px', marginBottom: '15px'}}
                    onClick={this.exportData}
                >
                    导出数据
                </Button>
                <Qtable columns={Columns} dataSource={dataSource}/>
            </div>
        );
    }
}

export default ClassifyAnalysisCharts;
