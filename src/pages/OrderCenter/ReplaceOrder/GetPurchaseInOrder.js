import React, { useState, useEffect } from 'react';
import { Form, AutoComplete, Button, Input, Spin, Modal } from 'antd';
import { ExclamationCircleFilled } from '@ant-design/icons';
import { Qtable } from 'common';
import NP from 'number-precision';
import './index.less';
import accounting from 'accounting';
import { getSupplierListApi, createPurchaseinOrderApi } from 'api/home/OrderCenter/ReplaceOrder';
const { Option } = AutoComplete;

const GetPurchaseInOrder = (props) => {
	const [form] = Form.useForm();
	const [supplierList, setSupplierList] = useState([]);
	const [dataSource, setDataSource] = useState([]);
	const [totalNum, setTotalNum] = useState([]); //保存右边的共计数量
	const [allTotalPrice, setTotalPrice] = useState([]); //保存右边的共计金额
	const [visible, setVisible] = useState(false); //生成失败
	const [failList, setFailList] = useState([]); //生成失败列表
	const [id, setId] = useState('');
  const [loading, setLoading] = useState('');
  
	const replaceList = JSON.parse(sessionStorage.getItem('replaceList'));
	useEffect(() => {
		getDataSource();
	}, []);
	//获取采购列表
	const getDataSource = () => {
		let [dataSource, obj, totalNum, allTotalPrice] = [[], {}, 0, 0];
		replaceList.map((item) => {
			obj[item['skuCode']] = obj[item['skuCode']]
				? {
						...item,
						orderNum: obj[item['skuCode']]['orderNum'] + 1,
						num: obj[item['skuCode']]['num'] + item.num,
						totalPrice: NP.plus(obj[item['skuCode']]['totalPrice'] , item.totalPrice),
						purchasePriceStr: obj[item['skuCode']]['purchasePriceStr'],
				  }
				: {
						...item,
						orderNum: 1,
						num: item.num,
						totalPrice: item.totalPrice,
						purchasePriceStr: accounting.formatMoney(item.purchasePrice, { symbol: '', precision: 4 }),
				  };
			return item;
		});
		for (let key in obj) {
			dataSource.push(obj[key]);
		}
		dataSource.map((item) => {
			totalNum += item.num;
			allTotalPrice += item.num * Number(item.purchasePrice);
		});
		form.setFieldsValue({ dataSource });
		setTotalNum(totalNum);
		setTotalPrice(allTotalPrice);
		setDataSource(dataSource);
	};

	const Columns = [
		{
			title: 'SKU编码',
			dataIndex: 'skuCode',
		},
		{
			title: '商品名称',
			dataIndex: 'productName',
		},
		{
			title: '规格',
			dataIndex: 'salesAttributeName',
		},
		{
			title: '订单数',
			dataIndex: 'orderNum',
		},
		{
			title: '实付总价',
			dataIndex: 'totalPrice',
		},
		{
			title: '商品数',
			dataIndex: 'num',
		},
		{
			title: '采购单价',
			dataIndex: 'purchasePriceStr',
			render: (text, record, index) => (
				<Form.Item
					name={['dataSource', index, 'purchasePriceStr']}
					rules={[
						{ required: true, message: '请输入采购单价' },
						{ pattern: /^\d+(\.\d{0,4})?$/, message: '仅限四位小数' },
					]}
				>
					<Input
						placeholder="采购单价"
						onBlur={(e) => onChange(e, record, 'purchasePrice')}
						autoComplete="off"
					/>
				</Form.Item>
			),
		},
		{
			title: '备注',
			dataIndex: 'remarks',
			render: (text, record, index) => (
				<Form.Item name={['dataSource', index, 'remarks']}>
					<Input
						placeholder="可输入30字备注"
						maxLength={30}
						onBlur={(e) => onChange(e, record, 'remarks')}
						autoComplete="off"
					/>
				</Form.Item>
			),
		},
		{
			title: '总毛利',
			dataIndex: 'totalProfit',
			render: (text, record, index) => (
				<span>{NP.minus(record.totalPrice, record.num * record.purchasePrice)}</span>
			),
		},
		{
			title: '综合毛利率',
			dataIndex: 'grossProfitRate',
			render: (text, record, index) => (
				<span>
					{(
						NP.divide(
							NP.minus(record.totalPrice, record.num * record.purchasePrice),
							record.num * record.purchasePrice
						) * 100
					).toFixed(2)}
					%
				</span>
			),
		},
	];
	//采购单价发生改变时
	const onChange = (e, record, type) => {
		const value = e.target.value;
		if (value) {
			const newData = [...dataSource];
			const index = newData.findIndex((item) => record.key == item.key);
			const item = newData[index];
			newData.splice(index, 1, { ...item, [type]: value.trim() });
			if (type == 'purchasePrice') {
				let allTotalPrice = 0;
				newData.map((item) => {
					allTotalPrice += item.num * Number(item.purchasePrice);
				});
				setTotalPrice(allTotalPrice);
			}
			setDataSource(newData);
		}
	};
	//供应上搜索时
	const onSearch = (value) => {
		getSupplierListApi({ sname: value }).then((res) => {
			if (res.httpCode == 200) {
				setSupplierList(res.result);
			}
		});
	};
	//供应商选中时
	const onSelect = (value, option) => {
		setId(option.key);
	};
	//提交
	const handleSubmit = () => {
		const values = form.validateFields();
		let dfList = [];
		replaceList.map((item) => {
			const index = dataSource.findIndex((el) => el.skuCode == item.skuCode);
			const { purchasePrice, remarks } = dataSource[index];
			dfList.push({ id: item.id, purchasePrice, remarks });
		});
		setLoading(true);
		createPurchaseinOrderApi({ dfList, id })
			.then((res) => {
				setLoading(false);
				if (res.httpCode == 200) {
					if (res.result.failList.length > 0) {
						setVisible(true);
						setFailList(res.result.failList);
						return;
					}
					props.history.push('/account/agency_delivery_orders');
				}
			})
			.catch(() => {
				setLoading(false);
			});
	};
	const onCancel = () => {
		setVisible(false);
	};
	return (
		<Spin spinning={loading}>
			<div className="replace_order_get_puchasein">
				<div className="tips">
					<ExclamationCircleFilled style={{ color: 'orange' }} />
					<div className="wrapper">
						<p>1、每次采购只能选择一个供应商；</p>
						<p>2、为避免商品采购单价录入错误，建议单次商品采购的SKU数不超过10个；</p>
					</div>
				</div>
				<Form form={form}>
					<Form.Item label="供应商" name='id' rules={[{ required: true, message: '请选择供应商' }]}>
						<AutoComplete
							placeholder="请输入供应商"
							style={{ width: '300px' }}
							onSearch={onSearch}
							onSelect={onSelect}
						>
							{supplierList.map((item) => (
								<Option key={item.id} value={item.name}>
									{item.name}
								</Option>
							))}
						</AutoComplete>
					</Form.Item>
					<Qtable dataSource={dataSource} columns={Columns} />
				</Form>
				<div className="save_puserchase_in_order">
					<Button type="primary" size="large" onClick={handleSubmit}>
						保存
					</Button>
					<div className="show_price">
						<p>
							<span>
								商品数量：<span className="brandColor">{totalNum}</span>,
							</span>
							<span>
								共计：
								<span className="brandColor">{Number(allTotalPrice).toFixed(2)}</span>元
							</span>
						</p>
					</div>
				</div>
			</div>
			{visible && (
				<Modal visible={visible} onCancel={onCancel} title="提示" footer={null}>
					<div>
						<p style={{'color':'red'}}>以下订单创建代发采购单失败，失败原因：订单已取消或已创建采购单</p>
						<p>
							{failList &&
								failList.length > 0 &&
								failList.map((item, index) => (
									<span key={index}>
										{item}
										{index == failList.length-1 ? '' : '、'}
									</span>
								))}
						</p>
					</div>
				</Modal>
			)}
		</Spin>
	);
};
export default GetPurchaseInOrder;
