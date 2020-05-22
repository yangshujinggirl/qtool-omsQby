import React, { useState, useEffect } from 'react';
import { Qtable, Qpagination } from 'common';
import { DeleteTableListApi } from 'api/contentCenter/NewUserSetCtip';
import { message, Upload, Button, Modal } from 'antd';
import { connect } from 'react-redux';
import Columns from './column';

const GoodsTable = (props) => {
	const [repeat, setRepeat] = useState([]);
	const [redundant, setRedundant] = useState([]);
	const [notExist, setNotExist] = useState([]);
	const [visible, setVisible] = useState(false);
	const homepageModuleId = props.match.params.id;
	useEffect(() => {
		console.log(props)
		getTableList({});
	}, []);
	//删除
	const handleOperateClick = (record) => {
		const { pdSpuId } = record;
		DeleteTableListApi({ homepageModuleId, pdSpuId }).then((res) => {
			if (res.httpCode == '0') {
				getTableList({}); //刷新列表
			}
		});
	};
	//请求列表
	const getTableList = (values) => {
		props.dispatch({
			type: 'newUser/fetchList',
			payload: {
				homepageModuleId,
				currentPage: 1,
				...values,
			},
		});
	};
	//分页
	const changePage = (currentPage, limit) => {
		getTableList({currentPage, limit });
	};
	
	//商品导入
	const onChange = (info) => {
		if (info.file.response) {
			if (info.file.response.code == '0') {
				const { repeat, notExist, redundant } = info.file.response;
				if (repeat.length || notExist.length || redundant.length) {
					setVisible(true);
					setRepeat(repeat);
					setNotExist(notExist);
					setRedundant(redundant);
				}
				getTableList({});
			} else {
				message.error(info.file.response.message, 0.8);
			}
		}
	};
	//下载模板
	const download = () => {
		window.open('../../../../../static/new_user_gift.xlsx');
	};
	//取消
	const onCancel = () => {
		setVisible(false);
	};

	const { dataList, currentPage, everyPage, total } = props.NewUserGiftReducers;
	console.log(props)
	const params = JSON.stringify({ homepageModuleId });

	return (
		<div>
			<div style={{ marginBottom: '20px' }}>
				<Upload
					className="import_list"
					accept=".xlsx,.xls"
					name="mfile"
					action="/qtoolsApp/newUserGift/pdImport"
					onChange={onChange}
					data={{ data: params }}
					showUploadList={false}
				>
					<Button type="primary">导入商品</Button>
				</Upload>
				<a
					className="theme-color"
					style={{ marginLeft: '30px', 'textDecoration': 'underline' }}
					onClick={download}
				>
					下载导入模板
				</a>
			</div>
			<Qtable dataSource={dataList} onOperateClick={handleOperateClick} columns={Columns} />
			<Qpagination
				data={{ currentPage, total, everyPage }}
				onChange={changePage}
			/>
			{visible && (
				<Modal visible={visible} footer={null} onCancel={onCancel}>
					<p className="theme-color">共成功导入商品{dataList.length}条</p>
					{repeat.length > 0 && (
						<p>
							{repeat.map((item, index) => (
								<span key={index}>
									{item}
									{repeat.length - 1 == index ? '' : '/'}
								</span>
							))}
							商品重复
						</p>
					)}
					{notExist.length > 0 && (
						<p>
							{notExist.map((item, index) => (
								<span key={index}>
									{item}
									{notExist.length - 1 == index ? '' : '/'}
								</span>
							))}
							商品不存在
						</p>
					)}
					{redundant.length > 0 && (
						<p>
							{redundant.map((item, index) => (
								<span key={index}>
									{item}
									{redundant.length - 1 == index ? '' : '/'}
								</span>
							))}
							超出500条限制
						</p>
					)}
				</Modal>
			)}
		</div>
	);
};

const mapStateToProps = (state) => {
	const { newUser } = state;
	return newUser;
};
export default connect(mapStateToProps)(GoodsTable);
