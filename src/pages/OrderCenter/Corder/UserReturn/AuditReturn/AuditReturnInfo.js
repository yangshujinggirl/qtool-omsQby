import React, { useEffect, useState } from 'react';
import { Card, Form, Radio, Input, Button } from 'antd';
import {QbaseDetail, Qtable} from 'common';
import { AbnormalGoodsColumns } from './columns';
import { getInfoApi, operateReturnApi } from 'api/home/OrderCenter/Corder/UserReturn/AllReturn';
import moment from 'moment';
const TextArea = Input.TextArea;

/**
 * 审核  zhy
 */
const AuditReturnInfo = (props) => {
	const [form] = Form.useForm();
	const [status, setStatus] = useState('');
	const [infos, setInfos] = useState({});
	const [detailList, setDetailList] = useState([]);
	const [showLoading, setShowLoading] = useState(false);
	const { id } = props.match.params;
	useEffect(() => {
		setShowLoading(true)
		getInfoApi({ reOrderNo: id }).then((res) => {
			if (res.httpCode == 200) {
				const { detailList, ...infos } = res.result;
				setInfos(infos);
				if (detailList && detailList.length > 0) {
					detailList.map((item, index) => {
						item.key = index;
					});
					setDetailList(detailList);
				}
			}
		}).finally(()=>setShowLoading(false));
	}, []);
	//审核状态修改
	const onChange = (e) => {
		setStatus(e.target.value);
	};
	/**
	 * 提交
	 */
	const handleSubmit = async () => {
		const values = await form.validateFields();
		setShowLoading(true)
		values.operation = 1;
		values.reOrderNo = id;
		operateReturnApi(values).then((res) => {
			if (res.httpCode == 200) {
				props.history.push('/account/subscriber_refund_orders');
			}
		}).finally(()=>setShowLoading(false));
	};
	const formLayout = {
		labelCol: { span: 2 },
		wrapperCol: { span: 8 },
	};
	const consignee = '蔻兔售后部'
	const shPhone='0511-87285073'
	const shAddress = 'Qtools华东仓配中心（江苏省镇江市句容市开发区宁杭北路与石狮路交叉口东南侧）'
	return <QbaseDetail showLoading={showLoading} childComponent={<div>
		<Card title="退单信息" className="base_info">
			<Form.Item label="退单号">{infos.reOrderNo}</Form.Item>
			<Form.Item label="关联用户订单">{infos.channelOrderNo}</Form.Item>
			<Form.Item label="订单类型">{infos.deliveryTypeStr}</Form.Item>
			<Form.Item label="用户手机号">{infos.phone}</Form.Item>
			<Form.Item label="退款类型">{infos.refundTypeStr}</Form.Item>
			<Form.Item label="退款运费">{infos.rePostage}</Form.Item>
			<Form.Item label="退款商品金额">{infos.totalPrice}</Form.Item>
			<Form.Item label="退款总金额">{infos.totalPrice}</Form.Item>
			<Form.Item label="创建时间">
				{infos.createTime && moment(infos.createTime).format('YYYY-MM-DD HH:mm:ss')}
			</Form.Item>
		</Card>
		<Card title="订单商品">
			<Qtable columns={AbnormalGoodsColumns} dataSource={detailList} />
		</Card>
		<Card title="异常处理">
			<Form form={form} {...formLayout} initialValues={{
				consignee:(infos.deliveryType==1||infos.deliveryType==4)?consignee:'',
				shPhone:(infos.deliveryType==1||infos.deliveryType==4)?shPhone:'',
				shAddress:(infos.deliveryType==1||infos.deliveryType==4)?shAddress:'',
				}}>
				<Form.Item name="status" label="审核结果" rules={[{ required: true, message: '请选择审核结果' }]}>
					<Radio.Group onChange={onChange}>
						<Radio value={20}>同意退款</Radio>
						<Radio value={99}>拒绝退款</Radio>
					</Radio.Group>
				</Form.Item>
				{status == 20 && (
					<React.Fragment>
						<Form.Item
							name="isInvented"
							label="退款类型"
							rules={[{ required: true, message: '请选择退款类型' }]}
						>
							<Radio.Group>
								<Radio value={true}>退货退款</Radio>
							</Radio.Group>
						</Form.Item>
						<Form.Item
							name="consignee"
							label="收货人"
							rules={[{ required: true, message: '请输入收货人' }]}
						>
							<Input placeholder="请输入收货人" autoComplete="off" />
						</Form.Item>
						<Form.Item
							name="shPhone"
							label="收货电话"
							rules={[{ required: true, message: '请输入收货电话' }]}
						>
							<Input placeholder="请输入收货电话" autoComplete="off" />
						</Form.Item>
						<Form.Item
							name="shAddress"
							label="收货地址"
							rules={[{ required: true, message: '请输入收货地址' }]}
						>
							<Input placeholder="请输入收货地址" autoComplete="off" />
						</Form.Item>
					</React.Fragment>
				)}
				{status == 99 && (
					<Form.Item
						name="refusalReasons"
						label="拒绝原因"
						rules={[{ required: true, message: '请输入拒绝原因' }]}
					>
						<TextArea placeholder="拒绝原因将展示给用户，请谨慎填写" />
					</Form.Item>
				)}
				<Form.Item>
					<Button type="primary" size="large" onClick={handleSubmit}>
						提交
					</Button>
				</Form.Item>
			</Form>
		</Card>
	</div>}/>
};
export default AuditReturnInfo;
