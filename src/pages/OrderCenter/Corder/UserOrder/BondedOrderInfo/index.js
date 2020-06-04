import React, { useState, useEffect } from 'react';
import { Card, Form, Modal } from 'antd';
import { Qtable } from 'common';
import Utils from 'utils/CommonUtils';
import { GoodColumns, SubOrderColumns, ExpressColumns, OrderLogsColumns, HangzhouClearLogsColumns } from './columns';
import { getBonedInfoApi } from 'api/home/OrderCenter/Corder/UserOrder';

/**
 * 保税订单详情
 * @param {*} props
 */
const BondedOrderInfo = (props) => {
	const [orderInfo, setOrderInfo] = useState({});
	const [receiveInfo, setReceiveInfo] = useState({});
	const [skuList, setSkuList] = useState([]);
	const [packageList, setPackageList] = useState([]);
	const [expressInfo, setExpressInfo] = useState([]);
	const [orderOperateLogList, setOrderOperateLogList] = useState([]);
	const [otherOperateLogList, setOtherOperateLogList] = useState([]);
	const [visible, setVisible] = useState(false);
	const { id } = props.match.params;
	useEffect(() => {
		getBonedInfoApi({ orderNo: id }).then((res) => {
			if (res.httpCode == 200) {
				const {
					orderInfo,
					receiveInfo,
					skuList,
					packageList,
					expressInfo,
					orderOperateLogList,
					otherOperateLogList,
				} = res.result;
				setOrderInfo(orderInfo);
				setReceiveInfo(receiveInfo);
				setSkuList(Utils.addKey(skuList));
				setPackageList(Utils.addKey(packageList));
				setExpressInfo(Utils.addKey(expressInfo));
				setOrderOperateLogList(Utils.addKey(orderOperateLogList));
				setOtherOperateLogList(otherOperateLogList);
			}
		});
	}, []);
	console.log(orderOperateLogList);
	const showModal = () => {
		setVisible(true);
	};
	const onCancel = () => {
		setVisible(false);
	};
	const fileDomain = sessionStorage.getItem('oms_fileDomain');
	return (
		<div>
			<Card title="订单信息" className="base_info">
				<Form.Item label="订单号">{orderInfo.onlineOrderNo}</Form.Item>
				<Form.Item label="下单时间">{orderInfo.createTimeStr}</Form.Item>
				<Form.Item label="订单状态">{orderInfo.orderStatusStr}</Form.Item>
				<Form.Item label="归属门店">{orderInfo.deliveryTypeStr}</Form.Item>
				<Form.Item label="订单金额">{orderInfo.orderAmount}</Form.Item>
				<Form.Item label="优惠金额">{orderInfo.discountAmount}</Form.Item>
				<Form.Item label="优惠券">{orderInfo.couponAmount}</Form.Item>
				<Form.Item label="优惠券批次号">{orderInfo.couponCode}</Form.Item>
				<Form.Item label="来源">{orderInfo.source}</Form.Item>
			</Card>
			<Card title="收货信息" className="base_info">
				<Form.Item label="姓名">{receiveInfo.nickname}</Form.Item>
				<Form.Item label="身份证号">
					{receiveInfo.idCardFrontPic && receiveInfo.idCardBackPic ? (
						<p>
							<span>{receiveInfo.idCardNo}</span>
							<a className="theme-color" onClick={showModal}>
								查看身份证正反面
							</a>
						</p>
					) : (
						<span>{receiveInfo.idCardNo}</span>
					)}
				</Form.Item>
				<Form.Item label="收货人">{receiveInfo.receiveUserName}</Form.Item>
				<Form.Item label="收货电话">{receiveInfo.receiveUserMobile}</Form.Item>
				<Form.Item label="收货地址">{receiveInfo.receiveAddress}</Form.Item>
			</Card>

			<Card title="商品信息">
				<Qtable columns={GoodColumns} dataSource={skuList} />
			</Card>

			{packageList&&packageList.length > 0 &&
				packageList.map((item, index) => (
					<Card title={`子单${index + 1}信息`} className="base_info">
						<div>
							<div>
								<Form.Item label="子单号">{item.outNo}</Form.Item>
								<Form.Item label="保税仓">{item.warehouseName}</Form.Item>
								<Form.Item label="子单状态">{item.orderStatus}</Form.Item>
							</div>
							<Qtable columns={SubOrderColumns} dataSource={skuList} />
						</div>
					</Card>
				))}

			<Card title="物流信息">
				<Qtable columns={ExpressColumns} dataSource={expressInfo} />
			</Card>

			<Card title="订单日志">
				<Qtable columns={OrderLogsColumns} dataSource={orderOperateLogList} />
			</Card>

			{otherOperateLogList &&
				otherOperateLogList.length > 0 &&
				otherOperateLogList.map((item, index) => (
					<Card title={`${item.titleName}`}>
						<Qtable columns={HangzhouClearLogsColumns} dataSource={item.operateLogList} />
					</Card>
				))}
			<Modal visible={visible} onCancel={onCancel} footer={null}>
				<img style={{ width: '100%' }} src={fileDomain + receiveInfo.idCardFrontPic}></img>
				<br />
				<img style={{ width: '100%' }} src={fileDomain + receiveInfo.idCardBackPic}></img>
			</Modal>
		</div>
	);
};
export default BondedOrderInfo;
