import React, { useState, useEffect } from 'react';

import { connect } from 'react-redux';
import NP from 'number-precision';
import { Form, Input, Radio, Spin, Button, message } from 'antd';
import { getReturnInfoApi, addReturnOrderApi } from 'api/home/OrderCenter/Corder/UserOrder';
import './index.less';
import ReturnGoods from './components/Editable';
import GiftModal from './components/GiftModal';

const formItemLayout = {
	labelCol: { span: 4 },
	wrapperCol: { span: 20 },
};
/**
 *
 * 新建退单 zhy
 */
const AddReturnOrder = (props) => {
	const [form] = Form.useForm();
	const { selectedRows } = props;
	const [loading, setLoading] = useState(false);
	const [returnWay, setReturnWay] = useState('');
	const [infos, setInfos] = useState({});
	const [deliveryList, setDeliveryList] = useState([]);
	const [visible, setVisible] = useState(false);
	const [giftList, setGiftList] = useState([]);
	const [allNotReturnLength, setAllNotReturnLength] = useState(0);
	useEffect(() => {
		getTotalAmount(selectedRows);
	}, [props.selectedRows]);
	//物流费用发生改变
	const onRadioChange = (e) => {
		setReturnWay(e.target.value);
	};
	//获取合计退款
	const getTotalAmount = (list) => {
		if (list.length > 0) {
			let totalReturnAmount = 0;
			list.map((item) => {
				totalReturnAmount += Number(item.returnPrice || 0);
			});
			if (isAddExpressFee()) {
				totalReturnAmount = totalReturnAmount + infos.expressAmount;
			}
			form.setFieldsValue({ totalReturnAmount });
		} else {
			form.setFieldsValue({ totalReturnAmount: 0 });
		}
	};
	//判断加不加上运费
	const isAddExpressFee = () => {
		const isAllSelect = allNotReturnLength == selectedRows.length; //没有全退的是否都勾选了
		const isAllNotSend = deliveryList.reduce(function (isNotSend, item) {
			return isNotSend && item['details'].every((temp) => temp.expressStatus == 0); //是否全部未发货
		}, true);
		const isAllReturn = deliveryList.reduce(function (isReturn, item) {
			return isReturn && item['details'].every((temp) => temp.num + temp.alreadyReturnNum == temp.buyNum); //是否全退了
		}, true);
		console.log(isAllSelect + '-' + isAllNotSend + '-' + isAllReturn);
		return isAllSelect && isAllNotSend && isAllReturn;
	};
	// 提交
	const handleSubmit = async () => {
		const values = await form.validateFields();
		if (selectedRows.length == 0) {
			return message.warning('请选择退货商品');
		}
		const _values = formatValues(values);
		setLoading(true);
		addReturnOrderApi(_values)
			.then((res) => {
				setLoading(false);
				if (res.httpCode == 200) {
					if (res.result.code == 200) {
						props.dispatch({
							type: 'addReturn/setSelectRows',
							payload: [],
						});
						goBack();
					}
					if (res.result.code == 'E_9020') {
						setGiftList(res.result.needReturnGifts);
						setVisible(true);
					} else {
						message.error(res.result.windowMessage);
					}
				}
			})
			.catch((err) => {
				setLoading(false);
			});
		[];
	};
	//数据格式化
	const formatValues = (_values) => {
		const { goodList0, goodList1, ...values } = _values;
		const { channelOrderNo, orderType, isDelivery, expressAmount } = infos;
		values.channelOrderNo = channelOrderNo;
		values.orderType = orderType;
		values.isDelivery = isDelivery;
		values.expressAmount = expressAmount;
		let details = [];
		selectedRows.map((item) => {
			const { channelOrderDetailNo, skuCode, isGift } = item;
			//为了解决用户先勾选后输入退货数量
			const tempArr = deliveryList[item.parentId]['details'];
			const tempIndex = tempArr.findIndex((temp) => temp.key == item.key);
			const num = tempArr[tempIndex]['num'];
			//为了解决用户先勾选后输入退货数量
			details.push({ channelOrderDetailNo, skuCode, num, isGift });
		});

		values.details = details;
		return values;
	};
	//取消
	const goBack = () => {
		props.history.push('/account/subscriber_orders');
	};
	//更改商品信息
	const changeDataSource = (list) => {
		setDeliveryList(list);
	};
	//输入订单子单号回车
	const getDetail = (e) => {
		//重置页面数据
		form.resetFields();
		props.dispatch({
			type: 'addReturn/setSelectRows',
			payload: [],
		});
		props.dispatch({
			type: 'addReturn/setParentId',
			payload: '',
		});
		props.dispatch({
			type: 'addReturn/setExpressStatus',
			payload: '',
		});
		props.dispatch({
			type: 'addReturn/setSelectRowKeys',
			payload: [],
		});
		//重置页面数据
		const { value } = e.target;
		if (value.trim()) {
			getReturnInfoApi({ channelOrderNo: value.trim() }).then((res) => {
				if (res.httpCode == 200) {
					let NotReturnLength = 0;
					const { deliveryList, ...infos } = res.result;
					const { orderType, isDelivery } = infos;
					setInfos(infos);
					deliveryList.map((item, index) => {
						item.key = index;
						item.details.map((subItem) => {
							subItem.isDelivery = isDelivery;
							subItem.orderType = orderType;
							subItem.channelOrderDetailNo = item.channelOrderDetailNo;
							subItem.needPush = item.needPush;
							subItem.pushStatus = item.pushStatus;
							subItem.key = index + '_' + subItem.skuCode;
							subItem.parentId = index;
							if (subItem.isDelivery == 0 || subItem.expressStatus == 0 || subItem.isGift == 1) {
								subItem.num = subItem.buyNum;
								subItem.returnPrice = NP.times(subItem.actualPayPrice, subItem.buyNum);
							}
							if (subItem.buyNum == subItem.alreadyReturnNum) {
								subItem.num = 0;
								subItem.returnPrice = 0;
							}
							if (Number(subItem.num) + subItem.alreadyReturnNum != subItem.buyNum) {
								NotReturnLength += 1;
							}
							return subItem;
						});
						const name = 'goodList' + index;
						form.setFieldsValue({ [name]: item.details, ...infos });
						return item;
					});
					setDeliveryList(deliveryList);
					setAllNotReturnLength(NotReturnLength);
				}
			});
		}
	};
	console.log(allNotReturnLength);
	return (
		<Spin spinning={loading}>
			<div className="oms-common-addEdit-pages add_toC_return">
				<Form initialValues={{ returnWay: 1 }} className="common-addEdit-form" form={form} {...formItemLayout}>
					<Form.Item label="用户订单" className="item_required">
						<Form.Item
							noStyle
							rules={[
								{
									required: true,
									message: '请输入普通订单订单号或保税订单子单号',
								},
							]}
						>
							<Input
								onPressEnter={getDetail}
								placeholder="请输入普通订单订单号或保税订单子单号"
								autoComplete="off"
								allowClear={true}
							/>
						</Form.Item>
						<Form.Item noStyle>
							<span className="suffix_tips">请输入普通订单订单号或保税订单子单号，并回车确认</span>
						</Form.Item>
					</Form.Item>
					{deliveryList.length > 0 && (
						<React.Fragment>
							<Form.Item label="商品信息" className="item_required">
								<Form.Item>
									<div className="add_return_order_tips">
										<p>
											若订单已生成出库单，则一张退款单中的商品必须由同一个仓出货，且发货信息必须相同。要退款的商品若还未发货，则不可选择商品的退款数量，只能全部退掉。
										</p>
										<p>
											若订单还未生成出库单，则不可选择要退款商品的退款数量，只能该商品全部退掉。
										</p>
										<p>退款中状态的商品不可再次创建退款单，需先处理上一张退单。</p>
									</div>
								</Form.Item>
								<ReturnGoods
									form={form}
									changeDataSource={changeDataSource}
									getTotalAmount={getTotalAmount}
									deliveryList={deliveryList}
								/>
							</Form.Item>
							{selectedRows.length == 0 ||
							(selectedRows.length > 0 && selectedRows[0].expressStatus == 1) ? (
								<Form.Item label="退款方式">
									<Form.Item
										noStyle
										name="returnWay"
										rules={[{ required: true, message: '请选择退款方式' }]}
									>
										<Radio.Group onChange={onRadioChange} disabled={selectedRows.length == 0}>
											<Radio value={1}>仅退款</Radio>
											<Radio value={2}>退货退款</Radio>
										</Radio.Group>
									</Form.Item>
									<Form.Item noStyle>
										<span className="suffix_tips">勾选退款商品后选择退款方式</span>
									</Form.Item>
								</Form.Item>
							) : (
								<Form.Item label="退款方式" name="returnWay">
									<Radio.Group value={1}>
										<Radio value={1} disabled>
											仅退款
										</Radio>
									</Radio.Group>
								</Form.Item>
							)}
							{returnWay == 2 && (
								<Form.Item label="退货地址" className="item_required">
									<Form.Item
										name="returnName"
										rules={[
											{
												required: true,
												message: '请输入姓名',
											},
										]}
									>
										<Input placeholder="请输入姓名" autoComplete="off" allowClear={true} />
									</Form.Item>
									<Form.Item
										name="returnMobile"
										rules={[
											{
												required: true,
												message: '请输入联系电话',
											},
										]}
									>
										<Input placeholder="请输入联系电话" autoComplete="off" allowClear={true} />
									</Form.Item>
									<Form.Item
										name="returnAddress"
										rules={[
											{
												required: true,
												message: '请输入地址',
											},
										]}
									>
										<Input placeholder="请输入地址" autoComplete="off" allowClear={true} />
									</Form.Item>
								</Form.Item>
							)}
							<Form.Item label="运费">{infos.expressAmount}</Form.Item>
							<Form.Item label="合计退款">
								<Form.Item name="totalReturnAmount">
									<Input disabled />
								</Form.Item>
								<Form.Item>
									<div className="add_return_order_tips">
										<p>合计退款为所退商品的退款金额之和。</p>
										<p>
											若该退单所对应的订单还未产生物流成本，且此退单中勾选的商品为订单中剩余的所有商品，则退回用户运费。
										</p>
										<p>
											仓库出货的商品合单后即视为产生物流成本。门店出货的商品输入物流单号即视为产生物流成本。
										</p>
									</div>
								</Form.Item>
							</Form.Item>
							<Form.Item
								label="退款原因"
								name="returnReason"
								rules={[
									{
										required: true,
										message: '请输入退单原因',
									},
								]}
							>
								<Input placeholder="请输入退单原因，50字以内" autoComplete="off" allowClear={true} />
							</Form.Item>
						</React.Fragment>
					)}
				</Form>
				<div className="handle-operate-save-action">
					<Button type="primary" size="large" onClick={goBack}>
						取消
					</Button>
					<Button type="primary" size="large" onClick={handleSubmit}>
						确定
					</Button>
				</div>
				<GiftModal visible={visible} dataSource={giftList} onOk={() => setVisible(false)} />
			</div>
		</Spin>
	);
};
const mapStateToProps = (state) => {
	const { AddReturnOrderReducers } = state;
	return AddReturnOrderReducers;
};
export default connect(mapStateToProps)(AddReturnOrder);
