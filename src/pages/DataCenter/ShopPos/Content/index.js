import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Tabs } from 'antd';
import DailyAccount from './DailyAccount';
import HotSale from './HotSale';
import ClerkSale from './ClerkSale';
import PurchaseSellStock from './PurchaseSellStock';
import ScoreReport from './ScoreReport';
import './index.less';

const { TabPane } = Tabs;
const Index = (props) => {
	console.log(props);
	const [act, setAct] = useState('1');
	const onChange = (activeKey) => {
		sessionStorage.setItem('oms_shopPos_activeKey', activeKey);
		setAct(activeKey); //无实际意义，只是为了刷新
	};
	const shop_pos_activeKey = sessionStorage.getItem('oms_shopPos_activeKey');
	const activeKey = shop_pos_activeKey ? shop_pos_activeKey : '1';
	return (
		<Tabs activeKey={activeKey} onChange={onChange} className="data_shop_pos_tabs">
			<TabPane tab="每日对账单" key="1">
				{activeKey == '1' && <DailyAccount {...props}/>}
			</TabPane>
			<TabPane tab="热销商品" key="2">
				{activeKey == '2' && <HotSale {...props}/>}
			</TabPane>
			<TabPane tab="店员销售" key="3">
				{activeKey == '3' && <ClerkSale {...props}/>}
			</TabPane>
			<TabPane tab="进销存报表" key="4">
				{activeKey == '4' && <PurchaseSellStock {...props}/>}
			</TabPane>
			<TabPane tab="积分报表" key="5">
				{activeKey == '5' && <ScoreReport {...props}/>}
			</TabPane>
		</Tabs>
	);
};

const mapStateToProps = (state) => {
	const { ShopPosReducers } = state;
	return { ...ShopPosReducers };
};
export default connect(mapStateToProps)(Index);
