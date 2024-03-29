import { Form, Table, Input, Popover } from 'antd';
import { QuestionCircleFilled } from '@ant-design/icons';
import NP from 'number-precision';
const content = '可退数量=该商品的已收货总数量-该商品的已创建采退的总数量';
const EditTable = (props) => {
	const Columns = [
		{
			title: 'SKU编码',
			dataIndex: 'itemCode',
			width: 100,
		},
		{
			title: '商品名称',
			dataIndex: 'itemName',
			width: 100,
		},
		{
			title: '商品规格',
			dataIndex: 'salesAttributeName',
			width: 100,
		},
		{
			title: (
				<Popover content={content}>
					可退数量
					<QuestionCircleFilled style={{ color: '#efefef' }} />
				</Popover>
			),
			dataIndex: 'returnableNum',
			width: 100,
		},
		{
			title: '采退数量',
			dataIndex: 'amount',
			width: 100,
			render: (text, record, index) => (
				<Form.Item
					name={['goodList', index, 'amount']}
					rules={[
						// { pattern: /^([1-9][0-9]*){1,3}$/, message: "请输入＞0的整数" },
						{
							validator: (rule, value) => {
								if (value) {
									if (/^([1-9][0-9]*){1,3}$/.test(value)) {
										if (Number(value) <= record.returnableNum) {
											return Promise.resolve();
										} else {
											return Promise.reject('需小于可退数量');
                    }
									} else {
										return Promise.reject('请输入＞0的整数');
									}
                }
                return Promise.resolve()
							},
						},
					]}
				>
					<Input placeholder="采购数量" autoComplete="off" onBlur={(e) => onChange(e, record, 'amount')} />
				</Form.Item>
			),
		},
		{
			title: '采退单价',
			dataIndex: 'price',
			width: 100,
			render: (text, record, index) => (
				<Form.Item
					name={['goodList', index, 'price']}
					rules={[{ pattern: /^\d+(\.\d{0,4})?$/, message: '请输入≥0的数字' }]}
				>
					<Input placeholder="采购单价" autoComplete="off" onBlur={(e) => onChange(e, record, 'price')} />
				</Form.Item>
			),
		},
		{
			title: '金额小计',
			dataIndex: 'total',
			width: 100,
		},
	];

	/**数量或者单价变化时
	 *  @param {*} e
	 *  @param {object} record
	 *  @param {string} type
	 */
	const onChange = (e, record, type) => {
		const { value } = e.target;
		const newData = [...props.dataSource];
		// if (value.trim()) {
		const index = newData.findIndex((item) => item.key == record.key);
		let item = newData[index];
		if (type == 'price') {
      const caiTuiprice = value?value:item.prevPrice;
      let total = NP.times(Number(item.amount), Number(caiTuiprice)).toFixed(2);
      item = { ...item, total, price: caiTuiprice };
		}
		if (type == 'amount') {
			let total = NP.times(Number(value), Number(item.price)).toFixed(2);
			item = { ...item, total, amount: value };
		}
    newData.splice(index, 1, item);
		props.changeDataSource(newData);
		// }
	};
	return <Table dataSource={props.dataSource} columns={Columns} pagination={false} bordered={true} />;
};
export default EditTable;
