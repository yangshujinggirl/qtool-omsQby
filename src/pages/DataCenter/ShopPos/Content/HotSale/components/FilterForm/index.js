import React from 'react';
import { Qbtn, BaseFilter } from 'common';
import { Form, Row, Col, Select, DatePicker } from 'antd';
import moment from 'moment';
const Option = Select.Option;
const { RangePicker } = DatePicker;
import { getCategoryListApi } from 'api/home/DataCenter/ShopPos/HotSale';

class NormalForm extends BaseFilter {
	formRef = React.createRef();
	constructor(props) {
		super(props);
		this.state = {
			categoryList: [],
		};
	}
	componentDidMount = () => {
		getCategoryListApi({ level: 1 }).then((res) => {
			if (res.httpCode == 200) {
				this.setState({
					categoryList: res.result,
				});
			}
		});
		this.btn.props.onClick()
	};
	//初始化
	render() {
		const {categoryList} = this.state;
		return (
			<div className="qtoolOms-condition data_center_condition" style={{ paddingTop: '20px' }}>
				<Form
					className="serach-common-form"
					ref={this.formRef}
					initialValues={{ time: [moment().subtract(30, 'days'), moment()], pdCategoryId1: 0, onSale: 1 }}
				>
					<Row gutter={24}>
						<Col {...this.colspans}>
							<Form.Item name="time" label="选择时间" {...this.formItemLayout}>
								<RangePicker />
							</Form.Item>
						</Col>
						<Col {...this.colspans}>
							<Form.Item name="pdCategoryId1" label="商品分类" {...this.formItemLayout}>
								<Select placeholder="请选择业务类型">
									<Option key={0} value={0}>全部</Option>
									{categoryList &&
										categoryList.length > 0 &&
										categoryList.map((item) => (
											<Option key={item.id} value={item.id}>{item.categoryName}</Option>
										))}
								</Select>
							</Form.Item>
						</Col>
						<Col {...this.colspans}>
							<Form.Item name="onSale" label="是否在售" {...this.formItemLayout}>
								<Select placeholder="请选择">
									<Option value={1} key="1">
										是
									</Option>
									<Option value={0} key="0">
										否
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
