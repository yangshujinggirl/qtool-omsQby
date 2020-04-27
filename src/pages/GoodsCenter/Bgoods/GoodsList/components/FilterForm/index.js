import React from 'react';
import { Form, Input, Select, DatePicker, Row, Col } from 'antd';
import { GetCategoryApi } from 'api/home/BaseGoods';
import { BaseFilter, Qbtn } from 'common';
const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;

class SearchForm extends BaseFilter {
	formRef = React.createRef();
	constructor(props) {
		super(props);
		this.state = {
			catagoryList: [],
			catagoryList2: [],
		};
	}
	componentDidMount() {
		GetCategoryApi({ level: 1, parentId: '' }).then((res) => {
			if (res.httpCode == 200) {
				this.setState({ catagoryList: res.result || [] });
			}
		});
	}
	//一级菜单更改
	onChange = (value) => {
		this.formRef.current.setFieldsValue({ pdCategory2Id: undefined });
		this.setState({
			catagoryList2: [],
		});
		if (value) {
			GetCategoryApi({ level: -1, parentId: value }).then((res) => {
				this.setState({
					catagoryList2: res.result || [],
				});
			});
		}
	};
	render() {
		const { catagoryList, catagoryList2 } = this.state;
		return (
			<div className="qtoolOms-condition">
				<Form className="serach-common-form" ref={this.formRef}>
					<Row gutter={24}>
						<Col {...this.colspans}>
							<FormItem name="spuCode" label="spu编码" {...this.formItemLayout}>
								<Input placeholder="请输入spu编码" autoComplete="off" />
							</FormItem>
						</Col>
						<Col {...this.colspans}>
							<FormItem name="skuCode" label="sku编码" {...this.formItemLayout}>
								<Input placeholder="请输入sku编码" autoComplete="off" />
							</FormItem>
						</Col>
						<Col {...this.colspans}>
							<FormItem name="productName" label="商品名称" {...this.formItemLayout}>
								<Input placeholder="请输入商品名称" autoComplete="off" />
							</FormItem>
						</Col>
						<Col {...this.colspans}>
							<FormItem name="brandName" label="商品品牌" {...this.formItemLayout}>
								<Input placeholder="请输入商品品牌" autoComplete="off" />
							</FormItem>
						</Col>
						<Col {...this.colspans}>
							<FormItem name="pdCategory1Id" label="一级类目" {...this.formItemLayout}>
								<Select onChange={this.onChange} placeholder="请选择" allowClear={true}>
									{catagoryList.length &&
										catagoryList.map((item) => (
											<Option value={item.id} key={item.id}>
												{item.categoryName}
											</Option>
										))}
								</Select>
							</FormItem>
						</Col>
						<Col {...this.colspans}>
							<FormItem name="pdCategory2Id" label="二级类目" {...this.formItemLayout}>
								<Select placeholder="请选择" disabled={!catagoryList2.length > 0} allowClear={true}>
									{catagoryList2.map((item) => (
										<Option value={item.id} key={item.id}>
											{item.categoryName}
										</Option>
									))}
								</Select>
							</FormItem>
						</Col>
						<Col {...this.colspans}>
							<FormItem name="productType" label="商品类型" {...this.formItemLayout}>
								<Select placeholder="请选择" allowClear={true}>
									<Option value={1}>正常销售品</Option>
									<Option value={2}>赠品</Option>
								</Select>
							</FormItem>
						</Col>
						<Col {...this.colspans}>
							<FormItem name="productTag" label="商品标签" {...this.formItemLayout}>
								<Select placeholder="请选择" allowClear={true}>
									<Option value={}>全部</Option>
									<Option value={1}>新品</Option>
									<Option value={2}>畅销</Option>
									<Option value={3}>预售</Option>
									<Option value={6}>直邮</Option>
									<Option value={4}>多规格</Option>
									<Option value={5}>缺图文</Option>
								</Select>
							</FormItem>
						</Col>
						<Col {...this.colspans}>
							<FormItem name="bStatus" label="商品状态" {...this.formItemLayout}>
								<Select placeholder="请选择" allowClear={true}>
									<Option value={0}>待引用</Option>
									<Option value={1}>上架中</Option>
									<Option value={2}>已下架</Option>
								</Select>
							</FormItem>
						</Col>
						<Col {...this.colspans}>
							<FormItem name="time" label="创建时间" {...this.formItemLayout}>
								<RangePicker format={this.formatType} showTime />
							</FormItem>
						</Col>
						<Col span={24}>
							<FormItem className="oms-condition-operate">
								<Qbtn type="primary" onClick={this.handleSubmit}>
									搜索
								</Qbtn>
							</FormItem>
						</Col>
					</Row>
				</Form>
			</div>
		);
	}
}
export default SearchForm;
