import React, { useState, useEffect } from 'react';
import { Form, Input, message, Select, Cascader, Spin } from 'antd';
import { ExclamationCircleFilled } from '@ant-design/icons';
import {
	GetPurchaseOutOrderDetailApi,
	addPurchaseOutApi,
	getOrderInfoApi,
	getProvinceListApi,
} from 'api/home/OrderCenter/PurchaseOrder/PurchaseOut';
import { Qbtn } from 'common';
import Editable from './components/Editable';
import NP from 'number-precision';
import './index.less';

const TextArea = Input.TextArea;
const formItemLayout = {
	labelCol: { span: 4 },
	wrapperCol: { span: 20 },
};

const AddPurchaseOut = (props) => {
	const [form] = Form.useForm();
	const [loading, setLoading] = useState(false);
	const [totalPrice, setTotalPrice] = useState(0);
	const [goodList, setGoodList] = useState([]);
	const [options, setOptions] = useState([]);
	const [suppliersName, setSuppliersName] = useState('');
	const { id } = props.match.params;
	useEffect(() => {
		initPage();
		getProvinceList();
	}, []);
	/**
	 * 初始化
	 */
	const initPage = () => {
		if (id) {
			setLoading(false);
			GetPurchaseOutOrderDetailApi(id).then((res) => {
				setLoading(false);
				if (res.httpCode == 200) {
					const { detailList, ...infos } = res.result;
					const { province, area, city } = infos;
					infos.provinces = [province, city, area];
					countPrice(detailList);
					form.setFieldsValue({ goodList: detailList, ...infos });
				}
			});
		}
	};
	const getProvinceList = () => {
		//获取省市区
		getProvinceListApi().then((res) => {
			if (res.httpCode == 200) {
				setOptions(res.result);
			}
		});
	};

	/**
	 * 计算总价
	 */
	const countPrice = (list) => {
		let totalPrice = 0;
		if (list.length > 0) {
			list.map((item) => {
				item.key = item.id;
				item.total = NP.times(Number(item.amount), Number(item.price)).toFixed(2);
				totalPrice += Number(item.total);
			});
		}
		setGoodList(list);
		setTotalPrice(totalPrice);
	};
	/**
	 * 根据名称搜索供应商
	 * @param {*} value
	 */
	const onSearch = (value) => {
		searchSupplierApi({ sname: value }).then((res) => {
			setSupplierList(res.result);
		});
	};
	/**
	 * 提交
	 */
	const handleSubmit = async () => {
		const values = await form.validateFields();
		const { provinces, goodList: data, ..._values } = values;
		debugger;
		if (provinces) {
			_values.province = provinces[0];
			_values.city = provinces[1];
			_values.area = provinces[2];
		}
		goodList.map((item, index) => {
			if (props.match.params.id) {
				data[index].id = goodList[index].id;
			}
			data[index].thinkCode = goodList[index].thinkCode;
			data[index].itemCode = goodList[index].itemCode;
		});
		_values.detailList = data;
		_values.stockingReCode = props.match.params.id;
		addPurchaseOutApi(_values).then((res) => {
			if (res.httpCode == 200) {
				goBack();
			}
		});
	};
	//取消
	const goBack = () => {
		props.history.push('/account/purchaseRefundOrder');
	};
	/**
	 *根据采购编码查询采购商品
	 */
	const searchInfo = (e) => {
		const { value } = e.target;
		if (value.trim()) {
			getOrderInfoApi({ stockingCode: value.trim() }).then((res) => {
				if (res.httpCode == 200) {
					const { data, suppliersName, ...infos } = res.result;
					data.map((item) => (item.amount = item.returnableNum));
					setSuppliersName(suppliersName);
					countPrice(data);
					form.setFieldsValue({ goodList: data, infos });
				}
			});
		}
	};
	/**
	 * 更改goodList
	 */
	const changeDataSource = (goodList) => {
		setGoodList([...goodList]);
		let totalPrice = 0;
		goodList.map((item) => {
			totalPrice += Number(item.total);
		});
		setTotalPrice(totalPrice);
	};
	console.log();
	return (
		<Spin spinning={loading}>
			<div className="oms-common-addEdit-pages add_purchase">
				<Form className="common-addEdit-form" form={form} {...formItemLayout}>
					<Form.Item wrapperCol={{ span: 20, offset: 3 }}>
						<div className="add_purchaseout_tips">
							<p>
								<ExclamationCircleFilled style={{ color: 'orange' }} />
								1、下单请确保采退商品的在售库存充足；
							</p>
							<p>
								2、商品过多时，可按下键盘“Crtl”键 + “F”键，进行快速检索（苹果系统按“Command”键 +
								“F”键）；
							</p>
						</div>
					</Form.Item>
					<Form.Item className="item_required" label="采购单号">
						<Form.Item noStyle name="stockingCode" rules={[{ required: true, message: '请填写采购单号' }]}>
							<Input
								disabled={id}
								placeholder="请输入采购单号"
								onBlur={searchInfo}
								onPressEnter={searchInfo}
								autoComplete="off"
								maxLength="30"
							/>
						</Form.Item>
						<span>{suppliersName}</span>
					</Form.Item>
					<Form.Item
						label="采退原因"
						name="reRemark"
						rules={[{ required: true, message: ' 请输入采退原因' }]}
					>
						<Input placeholder="请输入采退原因" autoComplete="off" />
					</Form.Item>
					<Form.Item label="采退商品">
						<Editable dataSource={goodList} changeDataSource={changeDataSource} />
					</Form.Item>

					<Form.Item
						label="请输入收货人"
						name="consignee"
						rules={[{ required: true, message: ' 请输入收货人' }]}
					>
						<Input placeholder="请输入电话或手机号" autoComplete="off" />
					</Form.Item>
					<Form.Item
						label="联系电话"
						name="phone"
						rules={[{ required: true, message: '请输入电话或手机号' }]}
					>
						<Input placeholder="请输入电话或手机号" autoComplete="off" />
					</Form.Item>
					<Form.Item label="收货地址" className="item_required">
						<Form.Item
							name="provinces"
							noStyle
							label="省市区"
							rules={[{ required: true, message: '请选择省市区' }]}
						>
							<Cascader options={options} placeholder="请选择地区" />
						</Form.Item>
						<Form.Item name="address" noStyle rules={[{ required: true, message: '请输入详细地址' }]}>
							<Input
								maxLength="50"
								style={{ width: '300px' }}
								placeholder="请输入详细地址"
								autoComplete="off"
							/>
						</Form.Item>
					</Form.Item>
					<Form.Item name="remarkes" label="订单备注">
						<TextArea rows={7} placeholder="请输入订单备注，100字以内" />
					</Form.Item>
				</Form>
				<Form.Item wrapperCol={{ offset: 4 }}>
					<div>
						<Qbtn onClick={handleSubmit}>保存</Qbtn>
						<div className="return_price">
							<span>
								商品数量：
								<span className="return_price_color">{goodList.length}</span>，
							</span>
							<span>
								共计：
								<span className="return_price_color">{totalPrice.toFixed(2)}</span>元
							</span>
						</div>
					</div>
				</Form.Item>
			</div>
		</Spin>
	);
};

export default AddPurchaseOut;
