import React from 'react';
import { Card, Tabs, Form } from 'antd';
import { Qtable } from 'common';
const { TabPane } = Tabs;
import { GoodColumns, LogColumns } from './columns';
import './index';

const StoreOutInfo = (props) => {
	const { orderPackageList } = props;
	orderPackageList.map((item) => {
		if (item.skuList && item.skuList.length) {
			item.skuList.map((subItem, index) => (subItem.key = index));
		}
		return item;
	});
	return (
		<React.Fragment>
			<Card title="出库信息" className="base_info">
				<Tabs type="card">
					{orderPackageList.map((item, index) => (
						<TabPane tab={item.titleName} key={`${index + 1}`}>
							<div>
								<div>包裹{index + 1}</div>
								<div>
									<Form.Item label="物流公司">{item.packageList.expressCompany}</Form.Item>
									<Form.Item label="快递公司">{item.packageList.expressNo}</Form.Item>
								</div>
								<div>
									<Qtable columns={GoodColumns} dataSource={item.skuList} />
								</div>
								<div>日志信息</div>
								<div>
									<Qtable columns={LogColumns} dataSource={item.operateLogList} />
								</div>
							</div>
						</TabPane>
					))}
				</Tabs>
			</Card>
		</React.Fragment>
	);
};
export default StoreOutInfo;
