import React from 'react';
import { Form, Row, Col, Input, Select, DatePicker } from 'antd';
import { BaseFilter, Qbtn } from 'common';
import moment from 'moment';
const { RangePicker } = DatePicker;
import '../../index.less';

class NormalForm extends BaseFilter {
	formRef = React.createRef();
	constructor(props) {
		super(props);
		this.colspans2 = {
			xs: 24,
			md: 14,
			xl: 9,
			xxl: 9,
		};
		this.formItemLayout = {
			labelCol: {
				span: 7,
			},
			wrapperCol: {
				span: 17,
			},
		};
	}
	//初始化
	render() {
		return (
			<div className="qtoolOms-condition c_user_manage">
				<Form ref={this.formRef} className="serach-common-form">
					<Row>
						<Col {...this.colspans}>
							<Form.Item name="userId" label="用户id" {...this.formItemLayout}>
								<Input placeholder="请输入用户id" autoComplete="off" />
							</Form.Item>
						</Col>
						<Col {...this.colspans}>
							<Form.Item name="name" label="Qtools昵称" {...this.formItemLayout}>
								<Input placeholder="请输入Qtools昵称" autoComplete="off" />
							</Form.Item>
						</Col>
						<Col {...this.colspans}>
							<Form.Item name="mobile" label="手机号" {...this.formItemLayout}>
								<Input placeholder="请输入手机号" autoComplete="off" />
							</Form.Item>
						</Col>
						<Col {...this.colspans}>
							<Form.Item name="registryPlatform" label="注册平台" {...this.formItemLayout}>
								<Select allowClear={true} placeholder="请选择注册平台">
									<Option value={1}>小程序</Option>
									<Option value={2}>ios</Option>
									<Option value={3}>android</Option>
									<Option value={4}>pos</Option>
								</Select>
							</Form.Item>
						</Col>
						<Col {...this.colspans}>
							<Form.Item name="memberLevel" label="会员等级" {...this.formItemLayout}>
								<Select allowClear={true} placeholder="请选择会员等级">
									<Option value={1}>Lv1</Option>
									<Option value={2}>Lv2</Option>
									<Option value={3}>Lv3</Option>
									<Option value={4}>Lv4</Option>
								</Select>
							</Form.Item>
						</Col>
						<Col {...this.colspans2}>
							<Form.Item label="成长值" className="special_input" {...this.formItemLayout}>
								<Form.Item name="growthValueSt" noStyle>
									<Input
										style={{ width: '120px' }}
										placeholder="请输入初始值"
										autoComplete="off"
									/>
								</Form.Item>
								　 -　
								<Form.Item name="growthValueEn" noStyle>
									<Input
										style={{ width: '120px' }}
										placeholder="请输入峰值"
										autoComplete="off"
									/>
								</Form.Item>
							</Form.Item>
						</Col>
						<Col {...this.colspans2}>
							<Form.Item label="累计消费金额" className="special_input" {...this.formItemLayout}>
								<Form.Item name="amountSumSt" noStyle>
									<Input
										style={{ width: '120px' }}
										placeholder="请输入初始值"
										autoComplete="off"
									/>
								</Form.Item>
								　 -　
								<Form.Item name="amountSumEn" noStyle>
									<Input
										style={{ width: '120px' }}
										placeholder="请输入峰值"
										autoComplete="off"
									/>
								</Form.Item>
							</Form.Item>
						</Col>
						<Col {...this.colspans2}>
							<Form.Item label="累计购买次数" className="special_input" {...this.formItemLayout}>
								<Form.Item name="purchaseTimesSt" noStyle>
									<Input
										style={{ width: '120px' }}
										placeholder="请输入初始值"
										autoComplete="off"
									/>
								</Form.Item>
								　 -　
								<Form.Item name="purchaseTimesEn" noStyle>
									<Input
										style={{ width: '120px' }}
										placeholder="请输入峰值"
										autoComplete="off"
									/>
								</Form.Item>
							</Form.Item>
						</Col>
						<Col {...this.colspans}>
							<Form.Item label="注册时间" name="time" {...this.formItemLayout}>
								<RangePicker
									defaultValue={[moment().subtract(30, 'days'), moment()]}
									showTime
									format="YYYY-MM-DD HH:mm:ss"
									allowClear={true}
								/>
							</Form.Item>
						</Col>
						<Col span={24}>
							<Form.Item className="oms-condition-operate">
								<Qbtn type="primary" onClick={this.handleSubmit}>
									搜索
								</Qbtn>
							</Form.Item>
						</Col>
					</Row>
				</Form>
			</div>
		);
	}
}
export default NormalForm;
