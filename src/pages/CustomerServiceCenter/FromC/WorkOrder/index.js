import React from 'react'
import {QbaseList, Qbtn, Qpagination, Qtable} from "common/index";
import FilterForm from "./components/FilterForm";
import Columns from "./column";
import {CreateWorkOrder, GetWorkOrder} from "../../../../api/home/CustomerServiceCenter/FromC";
import {Link} from "react-router-dom";
import {ErpExportApi} from "../../../../api/Export";
import {Form, Input, Modal} from "antd";

const {TextArea} = Input;
const formRef = React.createRef();

/**
 * 显示创建订单
 */
function showCreateWorkOrder(_this) {
    _this.setState({
        showModal: true
    })
}

/**
 * 创建订单确认
 */
async function createWorkOrderConfirm(_this) {
    const values = await formRef.current.validateFields();
    for (let index in values) {
        // 替换搜索条件中字符串的前后空格
        if (typeof values[index] == "string") {
            values[index] = values[index].replace(/^\s+|\s+$/gm, "");
        }
    }
    _this.showLoading();
    new CreateWorkOrder(values).then(rep => {
        createWorkOrderCancel(_this);
        //刷新数据
        _this.refreshDataList();
        _this.hideLoading();
    }).catch(er => {
        _this.hideLoading();
    })
}

/**
 * 创建订单取消
 */
function createWorkOrderCancel(_this) {
    _this.setState({
        showModal: false
    })
}

/**
 * 功能作用：客服工单列表页面
 * 初始注释时间： 2020/3/16 11:27
 * 注释创建人：LorenWang（王亮）
 * 方法介绍：
 * 思路：
 * 修改人：
 * 修改时间：
 * 备注：
 */

const WorkOrder = QbaseList((_this) => {
    const {
        dataList, everyPage, currentPage, totalCount
    } = _this.state;
    return (
        <div className="oms-common-index-pages-wrap">
            <FilterForm onSubmit={_this.searchDataList} selectTimeChange={_this.selectTimeChange}/>
            <div className="handle-operate-btn-action">
                <Qbtn size="free" onClick={() => showCreateWorkOrder(_this)}>新增工单</Qbtn>
            </div>
            <Qtable
                columns={Columns}
                select={true}
                dataSource={dataList}/>
            <Qpagination
                data={{everyPage, currentPage, totalCount}}
                onChange={_this.changePage}/>
            {
                _this.state.showModal && <Modal
                    visible={_this.state.showModal}
                    title='新增工单'
                    okText="确定"
                    onCancel={() => createWorkOrderCancel(_this)}
                    onOk={(e) => createWorkOrderConfirm(_this, e)}
                >
                    <Form ref={formRef}>
                        <Form.Item
                            label="客服主题"
                            name="customServiceTheme"
                            labelCol={{span: 5}}
                            wrapperCol={{span: 12}}
                            rules={[{
                                required: true,
                                message: 'Please input your E-mail!',
                            }]}>
                            <Input placeholder=' 请输入15字以下' maxLength='15' autoComplete="off"/>
                        </Form.Item>
                        <Form.Item
                            label="详细内容"
                            name="remark"
                            labelCol={{span: 5}}
                            wrapperCol={{span: 12}}
                            rules={[{required: true, message: '请输入详细内容'}]}>
                            <TextArea rows={5} placeholder='最多支持200字' maxLength='200'
                                      autoComplete="off"/>
                        </Form.Item>
                        <Form.Item
                            label="部门/用户/门店"
                            name="source"
                            labelCol={{span: 5}}
                            wrapperCol={{span: 12}}>
                            <Input placeholder='请输入64字以下' maxLength='64' autoComplete="off"/>
                        </Form.Item>
                        <Form.Item
                            label="联系方式"
                            name="waiterTel"
                            labelCol={{span: 5}}
                            wrapperCol={{span: 12}}>
                            <Input placeholder='请输入32字以下' maxLength='32' autoComplete="off"/>
                        </Form.Item>
                    </Form>
                </Modal>
            }
        </div>
    )
}, GetWorkOrder, false);
export default WorkOrder;
