import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Modal } from 'antd';
import UploadList from 'common/QupLoadImgLimt';
import { QreturnBtn } from 'common';
import { saveApi, getInfoApi } from 'api/home/GoodsCenter/Cgoods/ActExchangeGoods';
import './index.less';
const formItemLayout = {
	labelCol: { span: 4 },
	wrapperCol: { span: 20 },
};
const AddExchangeGoods = (props) => {
	const [form] = Form.useForm();
	const [fileList, setFileList] = useState([]);
	const [infos, setInfos] = useState({});
	const { id } = props.match.params;

	//修改时初始化数据
	useEffect(() => {
		const { id } = props.match.params;
		if (id) {
			getInfoApi(id).then((res) => {
				if (res.httpCode == 200) {
					const { picUrl, ...infos } = res.result;
					let fileList = [];
					if (picUrl) {
						fileList = [
							{
								uid: '-1',
								name: 'image.png',
								status: 'done',
								url: sessionStorage.getItem('oms_fileDomain') + picUrl,
								img: picUrl,
							},
						];
					}
					setFileList(fileList);
					setInfos(infos);
					infos.picUrl = fileList;
					form.setFieldsValue(infos);
				}
			});
		}
	}, []);
	const goBack = () => {
		props.history.push('/account/event_exchange_products');
	};
	const handleSubmit = async () => {
		const values = await form.validateFields();
		values.pdSpuActiveId = id;
		values.picUrl =
			values.picUrl && values.picUrl.length
				? values.picUrl[0].response
					? values.picUrl[0].response.result
					: values.picUrl[0].img
				: '';
		saveApi(values).then((res) => {
			if (res.httpCode == 200) {
				goBack();
			}
		});
	};
	const upDateList = (fileList) => {
		setFileList(fileList);
	};
	const validatorNum = (rule, value) => {
		if (value) {
			if (!/^[0-9]*$/.test(value)) {
				return Promise.reject('只可输入正整数');
			} else {
				if (id) {
					if (value < infos.convertibleQty) {
						return Promise.reject('数量只能填写比原来大的数字');
					}
				}
			}
		}
		return Promise.resolve()
	};
	return (
		<div className="oms-common-addEdit-pages add_theme">
			<Form form={form} {...formItemLayout} className="common-addEdit-form">
				<Form.Item label="商品名称" name="name" rules={[{ required: true, message: '请输入商品名称' }]}>
					<Input placeholder="请输入商品名称" maxLength="30" autoComplete="off" />
				</Form.Item>
				<Form.Item label="商品图片" rules={[{ required: true, message: '请输入商品名称' }]}>
					<UploadList upDateList={upDateList} name="picUrl" fileList={fileList} limit={1} />
				</Form.Item>
				<Form.Item
					label="可领取数量"
					name="convertibleQty"
					rules={[{ required: true, message: '请输入可领取数量' }, { validator: validatorNum }]}
				>
					<Input placeholder="请输入可领取数量" autoComplete="off" disabled={Boolean(props.data)} />
				</Form.Item>
				<div className="handle-operate-save-action">
					<QreturnBtn {...props} />
					<Button
						style={{ width: '100px', padding: '0 30px' }}
						type="primary"
						size="large"
						onClick={handleSubmit}
					>
						保存
					</Button>
				</div>
			</Form>
		</div>
	);
};

export default AddExchangeGoods;
