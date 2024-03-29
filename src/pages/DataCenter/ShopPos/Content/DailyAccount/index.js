import { useState } from 'react';
import { Tabs } from 'antd';
const { TabPane } = Tabs;
import ShopSale from './ShopSale';
import ShopDivide from './ShopDivide';

const DailyAccount = (props) => {
	const [activeKey, setActivekey] = useState('1');
	const onChange = (activeKey) => {
		setActivekey(activeKey);
	};
	return (
		<Tabs {...{ activeKey, onChange }}>
			<TabPane key="1" tab="门店销售对账单">
				{activeKey == '1' && <ShopSale {...props}/>}
			</TabPane>
			<TabPane key="2" tab="门店分成对账单">
				{activeKey == '2' && <ShopDivide {...props}/>}
			</TabPane>
		</Tabs>
	);
};
export default DailyAccount;
