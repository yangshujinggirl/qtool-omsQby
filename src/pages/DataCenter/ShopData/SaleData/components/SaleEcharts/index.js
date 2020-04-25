import { Component } from 'react';
import Qcharts from 'common/Qcharts';
import { Button } from 'antd';
import { Qtable } from 'common';
import Columns from './column';
import { DataExportApi } from 'api/Export';
import { GetSpChartsData,GetSpTableData } from 'api/home/DataCenter/ShopData';

//销售数据折线图
class SaleDataEcharts extends Component {
	constructor(props) {
		super(props);
		this.state = {
			xdata: [],
			data1: [],
			data2: [],
			data3: [],
			data4: [],
			type: 1,
			searchFilterList:{},
			analysisData:[]
		};
	}
	//请求数据
	getDataList = (values) => {
		const params = {...this.state.searchFilterList,...values}
		GetSpChartsData(params).then((res) => {
			if (res.httpCode == 200) {
				const analysisData = res.result;
				this.formatValue(analysisData,params);
			}
		});
		GetSpTableData(params).then(res=>{
			if(res.httpCode==200){
				const {result} = res.result;
				if(result&&result.length){
					result.map((item,index)=>(item.key=index))
					this.setState({
						analysisData:result
					})
				}
			}
		})
	};
	//数据格式化
	formatValue = (analysisData,params) => {
		const [xdata, data1, data2, data3, data4] = [[], [], [], [], []];
		analysisData.map((item,index) => {
            if(params.startDate == params.endDate){
                xdata.push(item.rpDateTm);
            }else{
                xdata.push(item.rpDateMd);
            }
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
				searchFilterList: { ...this.state.searchFilterList, ...params },
			},
			() => {
				this.refs['Qcharts'].writeCall();
			}
		);
	};
	//类型切换
	changeType = (value) => {
		this.setState(
			{
				type: value,
			},
			function () {
				this.refs['Qcharts'].writeCall();
			}
		);
	};
	exportData = () => {
		DataExportApi('/shop/querySaleDataExport', {});
	};
	render() {
		const { xdata, type, data1, data2, data3, data4 ,analysisData} = this.state;
		const title = '门店销售趋势图';
		const legend = {
			data: [
				{
					name: '掌柜销售',
				},
				{
					name: 'POS销售',
				},
			],
			top: '43',
			left: '460',
		};
		const series = [
			{
				name: '掌柜销售',
				type: 'line',
				data: type === '1' ? data1 : data3,
			},
			{
				name: 'POS销售',
				type: 'line',
				data: type === '1' ? data2 : data4,
			},
		];
		const btnText = ['销售数量', '销售金额'];
		return (
			<div>
				<Qcharts
					{...{ title, type, xdata, legend, series, isHaveGoodSearch: false, btnText }}
					getDataList={this.getDataList}
					changeType={this.changeType}
					ref="Qcharts"
				/>
				<Button style={{ marginLeft: '10px', marginBottom: '10px' }} type="primary" onClick={this.exportData}>
					导出数据
				</Button>
				<Qtable columns={Columns} dataSource={analysisData} />
			</div>
		);
	}
}
export default SaleDataEcharts;
