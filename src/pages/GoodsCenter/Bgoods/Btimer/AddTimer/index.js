import React, { useState, useEffect } from 'react';
import { getTimeInfoApi, AddTimeApi, editTimeApi } from 'api/home/GoodsCenter/Bgoods/Btimer';
import Columns from './column';
import { Form, Input, Button, message, Checkbox, Modal } from 'antd';
import moment from 'moment';
import ImportBtn from 'common/QuploadFileList';
import { DateTime } from 'common/QdisabledDateTime';
import { QbaseDetail } from 'common/index';
const formLayout = {
	labelCol: { span: 4 },
	wrapperCol: { span: 20 },
};

const AddTimer = (props) => {
	const [form] = Form.useForm();
	const [goodList, setGoodList] = useState([]);
	const [visible, setVisible] = useState(false);
	const [showLoading, setShowLoading] = useState(false);
	const [errMessage, setErrMessage] = useState('');
	const { id } = props.match.params;

	//初始化数据
	useEffect(() => {
		if (id) {
			setShowLoading(true);
			getTimeInfoApi({ pdTaskTimeId: id })
				.then((res) => {
					if (res.httpCode == 200) {
            let { taskDetails,salestatus,statusnew, statushot, ...infos } = res.result;
            infos.salestatus = salestatus&&Array.of(salestatus);
            infos.statusnew = statusnew&&Array.of(statusnew);
            infos.statushot = statushot&&Array.of(statushot);
						if (taskDetails.length) {
							taskDetails.map((item) => (item.key = item.pdTaskTimeId));
						}
						infos.taskTime = moment(infos.taskTime);
						setGoodList(taskDetails);
						form.setFieldsValue(infos);
					}
				})
				.finally(() => setShowLoading(false));
		}
	}, []);

	/**
	 * 保存
	 * @param {*} e
	 */
	const handleSubmit = async (e) => {
		const { salestatus, statusnew, statushot } = form.getFieldsValue(['salestatus', 'statusnew', 'statushot']);
		if (!(String(salestatus) || String(statusnew) || String(statushot))) {
			form.setFields([{ name: ['salestatus'], errors: ['请选择调整状态'] }]);
		}
		const values = await form.validateFields();
		if (!form.getFieldError('salestatus')[0]) {
			setShowLoading(true);
			let { taskTime, salestatus, statushot, statusnew, ..._values } = values;
			_values.salestatus = salestatus && salestatus.length ? salestatus[0] : '';
			_values.statushot = statushot && statushot.length ? statushot[0] : '';
			_values.statusnew = statusnew && statusnew.length ? statusnew[0] : '';
			_values.taskTime = moment(taskTime).format('YYYY-MM-DD HH:mm:ss');
			_values.codes = goodList;
			if (id) {
				_values.pdTaskTimeId = id;
				editTimeApi(_values)
					.then((res) => {
						if (res.httpCode == '200') {
							message.success('修改成功', 0.8);
							goback();
						}
					})
					.finally(() => setShowLoading(false));
				return;
			}
			AddTimeApi(_values)
				.then((res) => {
					if (res.httpCode == '200') {
						message.success('保存成功', 0.8);
						goback();
					}
				})
				.finally(() => setShowLoading(false));
		}
	};

	/**
	 *
	 * @param {*}
	 */
	const onChange = (type, value) => {
		if (value.length == 2) {
			form.setFieldsValue({ [type]: [value[1]] });
		}
		form.setFields([{ name: ['salestatus'], errors: [''] }]);
	};

	/**
	 * 修改上传数据
	 * @param {*} res
	 */
	const changeDataSource = (goodList) => {
		setGoodList(goodList);
	};

	/**
	 * 下载模板
	 */
	const downLoadTemp = () => {
		window.open('/static/timing.xlsx');
	};

	/**
	 * 返回
	 */
	const goback = () => {
		setShowLoading(false);
		props.history.push('/account/b_timing');
	};

	/**
	 * modal消失
	 */
	const onCancel = () => {
		setVisible(false);
	};
	return (
		<QbaseDetail
			showLoading={showLoading}
			childComponent={
				<div className="oms-common-addEdit-pages">
					<Form className="common-addEdit-form" form={form} {...formLayout}>
						<Form.Item
							label="定时名称"
							name="taskName"
							rules={[{ required: true, message: '请输入定时名称' }]}
						>
							<Input placeholder="请输入定时名称，最多60个字符" maxLength={60} autoComplete="off" />
						</Form.Item>
						<Form.Item
							name="taskTime"
							label="执行时间"
							rules={[{ required: true, message: '请选择定时时间' }]}
						>
							<DateTime />
						</Form.Item>
						<Form.Item label="状态调整" className="item_required">
							<Form.Item name="salestatus" noStyle>
								<Checkbox.Group onChange={(values) => onChange('salestatus', values)}>
									<Checkbox value={1}>上架</Checkbox>
									<Checkbox value={0}>下架</Checkbox>
								</Checkbox.Group>
							</Form.Item>
							<Form.Item name="statusnew" noStyle>
								<Checkbox.Group onChange={(values) => onChange('statusnew', values)}>
									<Checkbox value={1}>上新</Checkbox>
									<Checkbox value={0}>下新</Checkbox>
								</Checkbox.Group>
							</Form.Item>
							<Form.Item name="statushot" noStyle>
								<Checkbox.Group onChange={(values) => onChange('statushot', values)}>
									<Checkbox value={1}>上畅销</Checkbox>
									<Checkbox value={0}>下畅销</Checkbox>
								</Checkbox.Group>
							</Form.Item>
						</Form.Item>
						<Form.Item label="请选择要修改的sku">
							<ImportBtn
								changeDataSource={changeDataSource}
								downLoadTemp={downLoadTemp}
								Columns={Columns}
								dataSource={goodList}
								action="/qtoolsErp/inputcode/taskTime"
							>
								{visible && (
									<Modal title="导入商品结果" visible={visible} footer={null} onCancel={onCancel}>
										<div>
											<p style={{ color: '#35bab0' }}>共成功导入商品{goodList.length}</p>
											{errMessage && <p>{errMessage}</p>}
										</div>
									</Modal>
								)}
							</ImportBtn>
						</Form.Item>
						<Form.Item wrapperCol={{ push: 4, span: 20 }}>
							<Button className="edit_btn" size="large" onClick={goback}>
								取消
							</Button>
							<Button type="primary" size="large" onClick={handleSubmit}>
								保存
							</Button>
						</Form.Item>
					</Form>
				</div>
			}
		/>
	);
};

export default AddTimer;
