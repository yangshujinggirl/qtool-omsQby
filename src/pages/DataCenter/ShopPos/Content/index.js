import React, { useState } from 'react';
import { Tabs } from 'antd';
import DailyAccount from './DailyAccount';
import HotSale from './HotSale';
import ClerkSale from './ClerkSale';
import PurchaseSellStock from './PurchaseSellStock';
import ScoreReport from './ScoreReport';
import './index.less'

const { TabPane } = Tabs;
const Index = () => {
	const [activeKey, setActivekey] = useState('1');
	const onChange = (activeKey) => {
		setActivekey(activeKey);
	};
	return (
		<Tabs activeKey={activeKey} onChange={onChange}>
			<TabPane tab="每日对账单" key="1">
				<DailyAccount />
			</TabPane>
			<TabPane tab="热销商品" key="2">
				<HotSale />
			</TabPane>
			<TabPane tab="店员销售" key="3">
				<ClerkSale />
			</TabPane>
			<TabPane tab="进销存报表" key="4">
				<PurchaseSellStock />
			</TabPane>
			<TabPane tab="积分报表" key="5">
				<ScoreReport />
			</TabPane>
		</Tabs>
	);
};

export default Index;
