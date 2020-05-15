import { useState } from 'react';
import { Tabs } from 'antd';
const { TabPane } = Tabs;
import ShopSale from './ShopSale';
import ShopDivide from './ShopDivide';

const DailyAccount = () => {
	return (
		<Tabs activeKey='1'>
			<TabPane key='1' tab="门店销售对账单">
				<ShopSale />
			</TabPane>
			<TabPane key='2' tab="门店分成对账单">
				<ShopDivide />
			</TabPane>
		</Tabs>
	);
};
export default DailyAccount;
