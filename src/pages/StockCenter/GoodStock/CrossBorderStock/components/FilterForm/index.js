import React from 'react';
import { Form, Input, Select, Row, Col } from 'antd';
import { GetCategoryApi } from 'api/home/BaseGoods';
import { getStoreListApi } from 'api/home/StockCenter/GoodStock';
import { BaseFilter, Qbtn } from 'common';
const FormItem = Form.Item;
const { Option } = Select;

class SearchForm extends BaseFilter {
	formRef = React.createRef();
	constructor(props) {
		super(props);
		this.state = {
			catagoryList: [],
			catagoryList2: [],
			storeList: [],
		};
	}
	componentDidMount() {
		GetCategoryApi({ level: 1, parentId: '' }).then((res) => {
			this.setState({ catagoryList: res.result || [] });
		});
		getStoreListApi({ warehouseType: 3 }).then((res) => {
			if (res.httpCode == 200) {
				this.setState({
					storeList: res.result,
				});
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
		const { catagoryList, catagoryList2,storeList } = this.state;
		return (
			<div className="qtoolOms-condition">
				<Form className="serach-common-form" ref={this.formRef}>
					<Row gutter={24}>
						<Col {...this.colspans}>
							<FormItem name="productName" label="商品名称" {...this.formItemLayout}>
								<Input placeholder="请输入商品名称" autoComplete="off" />
							</FormItem>
						</Col>
						<Col {...this.colspans}>
							<FormItem name="skuCode" label="sku编码" {...this.formItemLayout}>
								<Input placeholder="请输入sku编码" autoComplete="off" />
							</FormItem>
						</Col>
						<Col {...this.colspans}>
							<FormItem name="spuCode" label="SPU编码" {...this.formItemLayout}>
								<Input placeholder="请输入SPU编码" autoComplete="off" />
							</FormItem>
						</Col>
						<Col {...this.colspans}>
							<FormItem name="warehouseCode" label="保税仓" {...this.formItemLayout}>
								<Select placeholder="请选择" allowClear={true}>
									{storeList &&
										storeList.length > 0 &&
										storeList.map((item) => (
											<Option value={item.warehouseCode} key={item.warehouseCode}>{item.warehouseName}</Option>
										))}
								</Select>
							</FormItem>
						</Col>
						<Col {...this.colspans}>
							<FormItem name="categoryCode1" label="一级类目" {...this.formItemLayout}>
								<Select onChange={this.onChange} placeholder="请选择" allowClear={true}>
									{catagoryList.map((item) => (
										<Option value={item.id} key={item.id}>
											{item.categoryName}
										</Option>
									))}
								</Select>
							</FormItem>
						</Col>
						<Col {...this.colspans}>
							<FormItem name="categoryCode2" label="二级类目" {...this.formItemLayout}>
								<Select placeholder="请选择" disabled={!catagoryList2.length > 0} allowClear={true}>
									{catagoryList2.map((item) => (
										<Option value={item.id} key={item.id}>
											{item.categoryName}
										</Option>
									))}
								</Select>
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
