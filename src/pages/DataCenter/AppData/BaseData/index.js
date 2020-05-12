import React from 'react';
import { Modal } from 'antd';
import { Qcards, Qtable } from 'common/index';
import TopTitleDesHeader from '../../components/TopTitleDesHeader';
import TableDataListUtil from 'utils/TableDataListUtil';
import Columns from './column';
import { GetAppBaseData } from 'api/home/DataCenter/AppData';

/**
 * 功能作用：App数据之基础数据
 * 初始注释时间： 2020/3/14 21:56
 * 注释创建人：LorenWang（王亮）
 */
export default class BaseData extends React.Component {
	state = {
		/**
		 * 基础信息列表1
		 */
		dataList1: [],
		/**
		 * 基础信息列表2
		 */
		dataList2: [],
		/**
		 * 表格数据
		 */
		tableDataList: [],
	};

	/**
	 * 第一次渲染结束操作
	 */
	componentDidMount() {
		GetAppBaseData().then((rep) => {
			let { orderStatusList, ...infos } = rep.result;
			let dataList1 = [
				{ title: '注册总用户数', value: infos.regUsers },
				{ title: '今日注册用户数', value: infos.todayRegUsers },
				{ title: '总流水', value: infos.orderTotalFlows },
				{ title: '今日流水', value: infos.todayFlow },
			];
			let dataList2 = [
				{ title: '下单总用户数', value: infos.orderTotalUsers },
				{ title: '今日下单用户数', value: infos.todayOrderUsers },
				{ title: '总下单订单数', value: infos.orderTotal },
				{ title: '今日下单订单数', value: infos.todayOrderTotal },
				{ title: '总完成订单数', value: infos.finishOrderTotal },
				{ title: '今日完成订单数', value: infos.todayFinishOrderTotal },
			];
			this.setState({
				dataList1,
				dataList2,
				tableDataList: TableDataListUtil.addKeyAndResultList(orderStatusList),
			});
		});
	}
	/**
	 * 数据定义说明
	 */
	desInfo = () => {
		Modal.info({
			title: '字段解释',
			content: (
				<div className="lists">
					<p>【注册总用户数】：截至目前注册的总用户人数</p>
					<p>【今日注册用户数】：查询当日注册用户人数</p>
					<p>【总流水】：所有支付过的订单支付总金额</p>
					<p>【今日流水】：查询当日内支付的订单的支付总金额</p>
					<p>【下单总用户数】：所有成功提交订单的用户人数</p>
					<p>【今日下单用户数】：查询当日成功提交订单的用户人数</p>
					<p>【总下单订单数】：所有成功提交的订单数</p>
					<p>【今日下单订单数】：查询当日成功提交的订单数</p>
					<p>【总完成订单数】：“已完成”状态订单总数</p>
					<p>【今日完成订单数】：查询当日更新为“已完成”的状态的订单总数</p>
				</div>
			),
		});
	};
	render() {
		const { dataList1, dataList2, tableDataList } = this.state;
		return (
			<div>
				<TopTitleDesHeader isShowUpdateTime={false} desInfoClick={this.desInfo} />
				<Qcards data={dataList1} />
				<Qcards data={dataList2} />
				<Qtable columns={Columns} dataSource={tableDataList} />
			</div>
		);
	}
}
