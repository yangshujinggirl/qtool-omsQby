import React, { useEffect, useState } from 'react';
import { Card, Form } from 'antd';
import { Qtable } from 'common';
import { GoodColumns, handleLogColumns, giftSkuColumns } from '../columns';
import StoreOutInfo from './components/StoreOutInfo';
import { getInfoApi } from 'api/home/OrderCenter/Corder/UserOrder';
import Utils from 'utils/CommonUtils';

/**
 *
 * 用户订单详情
 */
const UserOrderInfo = (props) => {
	const [orderInfo, setOrderInfo] = useState({});
	const [userInfo, setUserInfo] = useState({});
	const [skuList, setSkuList] = useState([]);
	const [spShopInfo, setSpShopInfo] = useState({});
	const [orderPackageList, setOrderPackageList] = useState([]);
	const [orderOperateLogList, setOrderOperateLogList] = useState([]);
	const [giftSkuList, setGiftSkuList] = useState([]);
	const { id } = props.match.params;
	useEffect(() => {
		getInfoApi({ orderNo: id }).then((res) => {
			if (res.httpCode == 200) {
				const {
					orderInfo,
					userInfo,
					skuList,
					spShopInfo,
					orderPackageList,
					orderOperateLogList,
					giftSkuList,
				} = res.result;
				setOrderInfo(orderInfo);
				setUserInfo(userInfo);
				setSkuList(Utils.addKey(skuList));
				setSpShopInfo(spShopInfo);
				setOrderPackageList(Utils.addKey(orderPackageList));
				setOrderOperateLogList(Utils.addKey(orderOperateLogList));
				setGiftSkuList(Utils.addKey(giftSkuList));
			}
		});
	}, []);
	return (
		<div>
			<Card title="订单信息" className="base_info">
				<Form.Item label="订单号">{orderInfo.orderNo}</Form.Item>
				<Form.Item label="虚拟单号">{orderInfo.virtualOrderNo}</Form.Item>
				<Form.Item label="下单时间">{orderInfo.createTimeStr}</Form.Item>
				<Form.Item label="订单状态">{orderInfo.orderStatusStr}</Form.Item>
				<Form.Item label="订单序号">{orderInfo.orderNum}</Form.Item>
				<Form.Item label="下单平台">{orderInfo.platformStr}</Form.Item>
				<Form.Item label="订单类型">{orderInfo.orderTypeStr}</Form.Item>
				<Form.Item label="配送方式">{orderInfo.deliveryTypeStr}</Form.Item>
				<Form.Item label="订单金额">{orderInfo.orderAmount}</Form.Item>
				<Form.Item label="商品金额">{orderInfo.amountSum}</Form.Item>
				<Form.Item label="用户支付配送费">{orderInfo.standardExpressAmount}</Form.Item>
				<Form.Item label="优惠金额">{orderInfo.discountAmount}</Form.Item>
				<Form.Item label="优惠券">{orderInfo.couponAmount}</Form.Item>
				<Form.Item label="优惠券批次号">{orderInfo.couponCode}</Form.Item>
				<Form.Item label="版本号">{orderInfo.appVersion}</Form.Item>
			</Card>

			<Card title="用户信息" className="base_info">
				<Form.Item label="昵称">{userInfo.nickname}</Form.Item>
				<Form.Item label="注册手机">{userInfo.mobilePhone}</Form.Item>
				<Form.Item label="会员等级">{userInfo.userMemberLevelStr}</Form.Item>
				<Form.Item label="本单用户下单次序">{userInfo.orderUserNum}</Form.Item>
				<Form.Item label="本单本店下单次序">{userInfo.orderShopNum}</Form.Item>
			</Card>

			<Card title="商品信息">
				<Qtable columns={GoodColumns} dataSource={skuList} />
				<div style={{ color: 'red' }}>(以下为赠品)</div>
				<Qtable columns={giftSkuColumns} dataSource={giftSkuList} />
			</Card>

			<Card title="门店信息" className="base_info">
				<Form.Item label="门店名称">{spShopInfo.spShopName}</Form.Item>
				<Form.Item label="店主姓名">{spShopInfo.spShoper}</Form.Item>
				<Form.Item label="店主电话">{spShopInfo.spShoperTel}</Form.Item>
				<Form.Item label="门店电话">{spShopInfo.spShopTel}</Form.Item>
			</Card>

			<StoreOutInfo orderPackageList={orderPackageList} />

			<Card title="处理日志">
				<Qtable columns={handleLogColumns} dataSource={orderOperateLogList} />
			</Card>
		</div>
	);
};
export default UserOrderInfo;
