import React from 'react';
import { Qbtn, BaseFilter } from 'common';
import { Form, Row, Col, Select, DatePicker, Input } from 'antd';
import moment from 'moment';

class NormalForm extends BaseFilter {
	formRef = React.createRef();
	constructor(props) {
		super(props);
	}
	componentDidMount=()=>{
		this.btn.props.onClick()
	}
	//初始化
	render() {
		return (
			<div className="qtoolOms-condition data_center_condition" style={{ paddingTop: '20px' }}>
				<Form className="serach-common-form" ref={this.formRef} initialValues={{ time: moment() }}>
					<Row gutter={24}>
						<Col {...this.colspans}>
							<Form.Item name="time" label="订单时间" {...this.formItemLayout}>
								<DatePicker picker="month" />
							</Form.Item>
						</Col>
						<Col {...this.colspans}>
							<Form.Item name="name" label="商品名称" {...this.formItemLayout}>
								<Input placeholder="请输入商品名称" />
							</Form.Item>
						</Col>
						<Col span={24}>
							<Form.Item className="oms-condition-operate">
								<Qbtn type="primary" onClick={this.handleSubmit} ref={(refs)=>this.btn = refs}>
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
