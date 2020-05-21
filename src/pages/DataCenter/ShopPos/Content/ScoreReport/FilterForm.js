import React from 'react';
import { Qbtn, BaseFilter } from 'common';
import { Form, Row, Col, Select, DatePicker } from 'antd';
import moment from 'moment';
const Option = Select.Option;
const { RangePicker } = DatePicker;

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
				<Form
					className="serach-common-form"
					ref={this.formRef}
					initialValues={{ time: [moment().subtract(30, 'days'), moment()], pointType:"0"}}
				>
					<Row gutter={24}>
						<Col {...this.colspans}>
							<Form.Item name="time" label="订单时间" {...this.formItemLayout}>
								<RangePicker />
							</Form.Item>
						</Col>
						<Col {...this.colspans}>
							<Form.Item name="pointType" label="订单分类" {...this.formItemLayout}>
								<Select>
									<Option value="0" key="0">
										全部
									</Option>
									<Option value="1" key="1">
										消费赠送
									</Option>
									<Option value="4" key="4">
										现金抵值
									</Option>
									<Option value="3" key="3">
										退货抵扣
									</Option>
								</Select>
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
