import { Tabs } from 'antd';
const { TabPane } = Tabs;
import React, { Component } from 'react';
import { connect } from 'react-redux';
import BaseConfig from './BaseConfig/index';
import GoodsTable from './GoodsTable/index';

const index = (props) => {
	//更改activeKey
	const callback = (activeKey) => {
		props.dispatch({
			type: 'newUser/setActiveKey',
			payload: {activeKey},
		});
	};
  const { activeKey, newUserGiftId } = props.NewUserGiftReducers;
  console.log(props)
	return (
		<div className="content_box stock-tabs">
			<Tabs onChange={callback} activeKey={activeKey}>
				<TabPane tab="基础配置" key="1">
					<BaseConfig {...props} />
				</TabPane>
				{newUserGiftId && (
					<TabPane tab="配置商品" key="2">
						<GoodsTable {...props} />
					</TabPane>
				)}
			</Tabs>
		</div>
	);
};

const mapStateToProps = (state) => {
	const { NewUserGiftReducers } = state;
	return { NewUserGiftReducers };
};
export default connect(mapStateToProps)(index);
