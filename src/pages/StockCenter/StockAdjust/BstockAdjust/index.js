import { QbaseDetail, Qtable } from 'common';
import React, { useState } from 'react';
import { Form, Input, Button,message } from 'antd';
import { columns1, columns2 } from './columns';
import { getStockListApi, getChangedStockApi } from 'api/home/StockCenter/StockAdjust/BstockAdjust';
import './index.less';
const formLayout = {
	labelCol: { span: 8 },
	wrapperCol: { span: 16 },
};

const StockAdjust = () => {
	const [form] = Form.useForm();
	const [topList, setTopList] = useState([]);
	const [showLoading, setShowLoading] = useState(false);
	const [bottomList, setBottomList] = useState([]);
	//编码查询查询库存列表
	const searchStock = (e) => {
		const { value } = e.target;
		if (value.trim()) {
			setShowLoading(true);
			getStockListApi(value)
				.then((res) => {
					if (res.httpCode == 200) {
						const { skuCode, productName, salesAttributeName, stockQty } = res.result;
						const obj = {
							skuCode,
							productName,
							salesAttributeName,
							stockQty,
							key: 0,
						};
						setTopList([obj]);
					}
				})
				.finally(() => setShowLoading(false));
		}
	};
	//库存调整
	const operateStock = async () => {
		const values = await form.validateFields();
		if (values.skuCode.trim()) {
			setShowLoading(true);
			getChangedStockApi(values)
				.then((res) => {
					if (res.httpCode == 200) {
						const { skuCode, productName, salesAttributeName, stockQty } = res.result;
						const obj = {
							skuCode,
							productName,
							salesAttributeName,
							stockQty,
						};
						let arr = [...bottomList];
						arr.push(obj);
						arr.map((item, index) => (item.key = index));
						setBottomList(arr);
					}
				})
				.finally(() => setShowLoading(false));
		}else{
      message.warning('请先填写商品编码',.8)
    }
	};
	return (
		<QbaseDetail
			showLoading={showLoading}
			childComponent={
				<div className="stock_adjust">
					<Form form={form} {...formLayout}>
						<Form.Item
							name="skuCode"
							label="SKU编码"
							rules={[{ required: true, message: '请输入商品编码' }]}
						>
							<Input
								style={{ width: '300px' }}
								placeholder="请输入商品编码"
								onPressEnter={searchStock}
								autoComplete="off"
							/>
						</Form.Item>
						{topList.length > 0 && (
							<div className="stock_table">
								<Qtable columns={columns1} dataSource={topList} />
							</div>
						)}
						<Form.Item
							name="qty"
							label="增减库存"
							rules={[
								{ required: true, message: '请输入增减库存' },
								{ pattern: /^[^[+]{0,1}(\d+)$/, message: '请输入整数' },
							]}
						>
							<Input
								style={{ width: '300px' }}
								autoComplete="off"
								placeholder="请输入增减库存"
								onPressEnter={operateStock}
							/>
						</Form.Item>
						<div className="stock_btn">
							<Button type="primary" size="large" onClick={operateStock}>
								提交
							</Button>
						</div>
						{bottomList.length > 0 && (
							<div className="stock_table">
								<Qtable columns={columns2} dataSource={bottomList} />
							</div>
						)}
					</Form>
				</div>
			}
		/>
	);
};
export default StockAdjust;
